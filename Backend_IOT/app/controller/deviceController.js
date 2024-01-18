const Device = require('../model/device');
const User = require('../model/user')
var mqttClient = require('../mqttWrapper/mqttClient');
var mongoose = require('mongoose');

// Function to validate if the provided ID is in the correct format
// Throws an error response if the ID format is incorrect
function validatorForValidId(req, res) {
    try {
        mongoose.Types.ObjectId(req);
    } catch (e) {
        res.status(404).send({
            error: "The ID must be either a unique string of 12 bytes or a string of 24 hexadecimal characters."
        })
    }
}

// Function to check if a device with a given 'embedId' already exists
// Sends an error response if the device is found, indicating that it already exists
async function validatorForDeviceExists(req, res) {
    let device = await Device.findOne({embedId:req.body.embedId})
    if (device) {
        res.status(404).send({error: "The device already exists."})
    }
}

module.exports = {
// Function to get all devices
// Sends a response with a list of devices or an error message if an issue occurs
    getAllDevice: async (req, res) => {
        try {
            let devices = await Device.find();
            res.send({devices});
        } catch (error) {
            res.status(500).send({
                success: false,
                error: "Internal Server Error!"
            })
        }
    },
    
// Function to get a device by its 'embedId'
// Sends a response with the device or an error message if not found
    getDeviceByEmbedId: async (req, res) => {
        try {
            let device = await Device.findOne({embedId:req.params.embedId})
            if (!device) {
                res.status(404).send({error: "Can't found this device."})
            } else {
                res.status(200).send({device})
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                error: "Internal Server Error!"
            })
        }
    },

// Function to get a device by its 'deviceId'
// Sends a response with the device or an error message if not found
    getDeviceByDeviceId: async (req, res) => {
        try {
            validatorForValidId(req.params.deviceId, res);
            const deviceId = req.params.deviceId;
            let device = await Device.findById(deviceId);
            if (!device) {
                res.status(404).send({error: "Can't found this device."})
            } else {
                res.status(200).send({device})
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                error: "Internal Server Error!"
            })
        }
    },

// Function to update a device by its 'deviceId'
// Validates the 'deviceId', updates the device, and sends a response
    updateDeviceByDeviceId: async (req, res) => {
        validatorForValidId(req.params.deviceId, res);
        try {
            const deviceId = req.params.deviceId;
            await Device.findByIdAndUpdate(deviceId, req.body);
            let device = await Device.findById(deviceId);
            if (device) {
                res.status(200).send({device});
                const pubTopic = 'iot/' + device.embedId + '/command';
                mqttClient.sendMessage(pubTopic, JSON.stringify({
                    connectState: device.connectState
                }));
            }else {
                res.status(404).send({error: "Can't found this device."})
            }
        } catch (e) {
            res.status(500).send({
                error: "Internal Server Error"
            })
        }
    },

// Function to get a device by its 'deviceId' associated with a user
// Validates the 'userId' and 'deviceId', retrieves the device, and sends a response
    createDeviceByUserId: async (req, res) => {       
        validatorForValidId(req.params.userId, res);
        await validatorForDeviceExists(req,res);
        try {
            let user = await User.findById(req.params.userId);
            if (!user) {
                res.send({
                    error: "User does not exist."
                })
            } else {
                let device = await Device.createDevice(req.body);
                if(req.user.role == "admin") {
                    device.isPublic = true
                }
                if (!device) {
                    res.status(404).send({error: "Can't found this device."})
                }
                device.userId = req.params.userId;
                await device.save();
                res.send({device})
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                error: "Internal Server Error!"
            })
        }
    },

// Function to update the log of a device by its 'deviceId'
// Validates the 'deviceId' and updates the state history
    updateLogByDeviceId: async (req, res) => {
        validatorForValidId(req.params.deviceId, res);
        const device = await Device.findById(req.params.deviceId);
        if (device) {
            device.log.push({
                at: req.body.at,
                temperature: req.body.temperature,
                humidity: req.body.humidity,
                gasvalue: req.body.gasvalue,
            })
            await device.save();
            res.status(200).send({device})
        }else {
            res.status(404).send({error: "Device not found"})
        }

    },

// Function to get public devices
// Retrieves and sends a response with public devices
    getPublicDevice: async (req, res) => {
        console.log(123)
        try {
            const devices = await Device.find({isPublic: true})
            res.status(200).send(devices)
        } catch (e) {
            res.status(500).send(e)
        }
    },

// Function to delete a device by its 'deviceId'
// Validates the 'deviceId' and deletes the device
    deleteDeviceByDeviceId: async (req, res) => {
        try {
            validatorForValidId(req.params.deviceId, res)
            await Device.findByIdAndDelete(req.params.deviceId);
            res.status(204).send({})
        } catch (e) {
            res.status(500).send({
                error: "Internal Server Error"
            })
        }
    }

}
