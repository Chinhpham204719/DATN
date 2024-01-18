import React, { useState } from 'react'
import { X } from 'react-feather'
import tw from 'twin.macro'
import { toastError } from '../../../constant/toast'
import { useDevicesContext } from '../context'
import '../style.css'

const LabelText = tw.label`float-left mb-3 text-black`
const ContainerModal = tw.div`w-full`
const PillButton = tw.input`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full border-none w-full mt-4`
const ModalDevices = ({ item }) => {
  const [deviceName, setDeviceName] = useState(item?.deviceName)
  const { updateDevice, setOpenModal } = useDevicesContext()
  const [stateDevice, setStateDevice] = useState(item?.connectState)


  return (
    <>
      <div className="modal-window">
        <ContainerModal>
          <form onSubmit={(e) => {
            e.preventDefault()
            updateDevice(item?._id, deviceName, stateDevice)

          }}>
            <div className="modal-close" onClick={() => setOpenModal(false)}><X /></div>
            <h1 style={{ color: 'black' }}>Device</h1><br />
            <LabelText>Device Name</LabelText>
            <input type="text" className='inputdevice' placeholder='Device Name' defaultValue={item?.deviceName} onChange={(e) => setDeviceName(e.target.value)} />
            <LabelText>Device State</LabelText>
            <div style={{ float: 'right' }}>
              <label className="switch">
                <input type="checkbox" defaultChecked={item?.connectState === "ON"} onChange={e => setStateDevice(e.target.checked ? "ON" : "OFF")} />
                <span className="slider round"></span>
              </label>
            </div>
            <PillButton type="submit" value="Save" />
          </form>
        </ContainerModal>
      </div>
    </>
  )
}
export default ModalDevices
