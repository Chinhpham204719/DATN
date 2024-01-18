import React, { memo } from 'react'
import { StatisticsContextProvider, useStatisticsContext } from './context'
import NavTop from '../../layout/components/NavTop/NavTop';
import BarChart from './components/BarChart';
import DeviceLocation from './components/DeviceLocation';
import DeviceDetail from './components/DeviceDetail';
const StatisticsImpl = () => {
  const { device, nearestCity } = useStatisticsContext()

  return (
    <>
      <NavTop />
      <div style={{ marginTop: '100px' }}>
        <div style={{display:'flex', gap:'50px'}}>
          <DeviceLocation data={device} />
          <DeviceDetail item={device} info={nearestCity} />
        </div>
        <BarChart deviceItem={device?.stateHistory} />
      </div>

    </>
  )
}
const Statistics = () => <StatisticsContextProvider><StatisticsImpl /></StatisticsContextProvider>
export default Statistics
