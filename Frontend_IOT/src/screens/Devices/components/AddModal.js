import React, { useState } from 'react'
import { X } from 'react-feather'
import tw from 'twin.macro'
import { toastError } from '../../../constant/toast'
import { useDevicesContext } from '../context'
import '../style.css'

const LabelText = tw.label`float-left mb-3 text-black`
const ContainerModal = tw.div`w-full`
const PillButton = tw.input`cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full border-none w-full mt-4`
const AddModal = () => {
  const [deviceName, setDeviceName] = useState('')
  const [deviceId, setDeviceId] = useState('')
  const { addDevice, setOpenAddModal } = useDevicesContext()
  const [stateDevice, setStateDevice] = useState(false)


  return (
    <>
      <div className="modal-window">
        <ContainerModal>
          <form onSubmit={(e) => {
            e.preventDefault()
            if (deviceName !== '' && deviceId !== '')
              addDevice(deviceId, deviceName, stateDevice)
            else toastError('Nothing was changed!')
          }}>
            <div className="modal-close" onClick={() => setOpenAddModal(false)}><X /></div>
            <h1 style={{ color: 'black' }}>Device</h1><br />
            <LabelText>Device Id</LabelText>
            <input type="text" className='inputdevice' placeholder='Embedded ID' onChange={(e) => setDeviceId(e.target.value)} />
            <LabelText>Device Name</LabelText>
            <input type="text" className='inputdevice' placeholder='Device Name' onChange={(e) => setDeviceName(e.target.value)} />
            <LabelText>Device State</LabelText>
            <div style={{ float: 'right' }}>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={false}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <PillButton type="submit" value="Add" />
          </form>
        </ContainerModal>
      </div>
    </>
  )
}
export default AddModal
