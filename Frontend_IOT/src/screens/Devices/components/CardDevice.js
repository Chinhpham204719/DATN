import React from 'react'
import { Edit2, Eye, Trash } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'
import { useDevicesContext } from '../context'
import '../style.css'
import ModalDevices from './ModalDevices'

const ToggleContainer = tw.div`flex items-center justify-center w-full mb-12`
const LabelToggle = tw.label`flex items-center cursor-pointer ml-5`
const CardContainer = tw.div`shadow-xl rounded-xl min-w-1/4 m-6`

const CardDevice = ({ item }) => {
  const { deleteDevice, openModal, setOpenModal, getDeviceItemById, deviceItem } = useDevicesContext()
  const navigate = useNavigate()
  return (
    <CardContainer>
      <ToggleContainer>
        <div style={{ display: 'block', padding: '0.9rem' }}>
          <h2>Device's Id: {item?._id}</h2>
          <h2>Embedded's id: {item?.embedId}</h2>
          <h2>Device's name: {item?.deviceName}</h2>
          <h2>Device's userId: {item?.userId}</h2>
        </div>
        <LabelToggle
        >
          <div style={{ position: 'relative', display: 'flex', paddingRight: '1rem' }}>


            <div style={{ display: 'block' }}>
              <div className="containerDevice">
                <div className="interior">
                  <div className="btn" style={{ width: 'fit-content' }}
                    onClick={async () => {
                      getDeviceItemById(item?._id)
                      setOpenModal(true)
                    }
                    }><Edit2 /></div>
                </div>
              </div><br />
              <div className="containerDevice">
                <div className="interior">
                  <div className="btn" style={{ width: 'fit-content' }} onClick={() => deleteDevice(item?._id)}><Trash /></div>
                </div>
              </div>
              <br />
              <div className="containerDevice">
                <div className="interior">
                  <div className="btn" style={{ width: 'fit-content' }} onClick={() => window.location.replace(`/devices/${item?._id}`)}><Eye /></div>
                </div>
              </div>
            </div>
          </div>
          {openModal && <ModalDevices item={deviceItem} />}
        </LabelToggle>

      </ToggleContainer>

    </CardContainer>
  )
}
export default CardDevice
