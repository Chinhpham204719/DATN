import React, { useRef, useState } from 'react';
import ReactMapGL, { FullscreenControl, Marker } from 'react-map-gl';
import {useStatisticsContext} from "../context";


const DeviceLocation = ({ data }) => {
  const mapRef = useRef();
  const [viewport, setViewport] = useState({
    width: "50%",
    height: '805px',
    latitude:   21.018,
    longitude:   105.800 ,
    zoom: 8
  });
  const fullscreenControlStyle = {
    right: 10,
    bottom: 10
  };


  return <>
    <ReactMapGL
      ref={mapRef}
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_API_TOKEN}>

      <Marker
        key={data?._id || "Hanoi"}
        latitude={ parseFloat(data?.location[0]) || 21.437 }
        longitude={ parseFloat(data?.location[1]) || 105.123 }

      >
        <div
        style={{ background: '#FFA35C', borderRadius: '50%', width: '50px', height: '50px', paddingTop: '10px', color:'white' }}>
        {data?.deviceName}</div>
      </Marker>

      <FullscreenControl style={fullscreenControlStyle} />
    </ReactMapGL>
  </>;
}
export default DeviceLocation
