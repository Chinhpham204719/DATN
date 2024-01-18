const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Device = require('C:/Users/chinh/OneDrive/Desktop/DATN_final/DATN/Backend_IOT/app/model/device');

class MqttHandler {
    constructor() {
        // Import the MQTT library
        this.mqtt = require('mqtt');

        // Set MQTT options
        this.options = {
            host: 'dea95a186d8943c3b6671f65a210e697.s2.eu.hivemq.cloud',
            port: 8883,
            protocol: 'mqtts',
            username: 'esp8266',
            password: 'Aa123123'
        };
    }

    connect() {
        this.client = this.mqtt.connect(this.options);
        this.client.on('connect', () => {
            console.log('Connected');
        });

        this.client.on('error', (error) => {
            console.log(error);
        });

        this.client.subscribe('esp8266_data', (err) => {
            if (!err) {
                console.log('Subscribed to esp8266_data');
            }
        });

        this.client.on('message', async (topic, payload) => {
            try {
                if (topic === "esp8266_data") {
                    let jsonMessage = JSON.parse(payload.toString());
                    console.log("jsonMessage: ", jsonMessage);

                    // Find the device in the database based on deviceId
                    let device = await Device.findOne({ embedId: jsonMessage.embedId });
                    if (device) {
                        device.connectState = "ON";

                        device.log = (typeof device.log !== 'undefined' && device.log instanceof Array) ? device.log : [];

                        device.log.push({
                            at: Date.now(),
                            temperature: jsonMessage.temperature,
                            humidity: jsonMessage.humidity,
                            gasvalue: jsonMessage.gasvalue,
                        });
                        device.markModified('stateHistory');
                        // Update device information in the database
                        await Device.findByIdAndUpdate('659fa807f260139c576e19db', {
                            $set: device
                        });
                        await device.save();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        });
    }
}

// Create an instance of the MqttHandler class
const mqttHandler = new MqttHandler();

module.exports = MqttHandler;



