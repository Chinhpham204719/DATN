import React, { useState } from 'react'
import tw from 'twin.macro'
import NavTop from '../../layout/components/NavTop/NavTop'
import AddModal from './components/AddModal'
import CardDevice from './components/CardDevice'
import { DevicesContextProvider, useDevicesContext } from './context'


const DevicesImpl = () => {
  const { listDevices, setOpenAddModal, openAddModal } = useDevicesContext()

  const CardContainer = tw.div`flex flex-wrap w-full place-content-center`
  const AddButton = tw.button`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg border-none float-right mr-5 cursor-pointer`
  return (

    <>
      <NavTop />
      <h1 style={{ marginTop: '8rem' }}>Devices Management</h1>
      <AddButton onClick={() => setOpenAddModal(true)}>+ Add Device</AddButton>
      <CardContainer>
        {listDevices?.length > 0 && listDevices?.map((i) => (
          <CardDevice key={listDevices.indexOf(i)} item={i} />
        ))}

      </CardContainer>
      {/* <CardDevice/> */}
      {openAddModal && <AddModal />}
      {/*<div className="blob" style={{marginTop:'-450px'}}/>*/}
    </>
  )
}
const Devices = () => <DevicesContextProvider><DevicesImpl /></DevicesContextProvider>
export default Devices
