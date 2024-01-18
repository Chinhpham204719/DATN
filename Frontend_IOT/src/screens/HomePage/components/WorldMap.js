import React, { memo, useRef, useState } from 'react';
import ReactMapGL, { FullscreenControl, GeolocateControl, Marker, Popup } from 'react-map-gl';
import tw, { styled } from 'twin.macro';
import { MapContextProvider, useMapContext } from '../context';
import "../style.css";
import NearestCityInfo from './NearestCityInfo';

const HeaderContainer = tw.div`flex pt-8 justify-around items-center`
const Header = tw.h1``
const SearchBar = tw.input`w-1/2 outline-none h-12 rounded-xl border-none items-end shadow-xl p-2 font-semibold`
const PageContainer = tw.div`p-5 z-10`

const geolocateControlStyle = {
  right: 10,
  top: 10
};

const CircleIcon = styled.div(({ props }) => [
  tw`rounded-full text-white w-8 h-8 text-sm`,
  props <= 50 && tw`bg-green-500`,
  props <= 100 && props >= 51 && tw`bg-yellow-500`,
  props <= 150 && props >= 101 && tw`bg-red-300`,
  props <= 200 && props >= 151 && tw`bg-red-500`,
  props <= 300 && props >= 201 && tw`bg-purple-500`,
  props > 300 && tw`bg-red-900`
])

const WorldMapImpl = () => {
  const mapRef = useRef();
  const { geocodingCity } = useMapContext();
   // console.log(geocodingCity.length)
  const [viewport, setViewport] = useState({
    width: "50%",
    height: '805px',
    latitude: 21.437,
    longitude: 105.123,
    zoom: 4
  });
  const [popupIndex, setPopUpIndex] = useState(false)

  const renderPopup = ({ item }) => {
    return (
      <>
        {popupIndex && (
          <Popup
            tipSize={5}
            anchor="bottom-left"
            longitude={item?.data?.location?.coordinates[0] || 105.123}
            latitude={item?.data?.location?.coordinates[1] || 21.437}
            onMouseLeave={(e) => {
              e.preventDefault();
              setPopUpIndex(false);
            }}
            closeOnClick={true}
          >

          </Popup>
        )}
      </>

    )
  }

  const fullscreenControlStyle = {
    right: 10,
    bottom: 10
  };


  setInterval(() => {
    const h1 = document.getElementsByClassName("headerPage");
    h1.onanimationend = function () {
      h1.classList.add("anim-end");
      h1.classList.remove("anim-restart");
    }
  }, 10000);


  return (
    <PageContainer>
      <HeaderContainer>
        <Header className='headerPage' id='headerPage'>The information about environmental quality at your location.</Header>
        {}
      </HeaderContainer>
      <div style={{ display: 'flex', gap: '50px' }}>
        <ReactMapGL
          ref={mapRef}
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={nextViewport => setViewport(nextViewport)}
          mapboxApiAccessToken={process.env.REACT_APP_MAP_API_TOKEN}>
          {
            geocodingCity.length > 0 && geocodingCity?.map((item) => (
              <div key={geocodingCity.indexOf(item)}>
                <Marker
                  key={item?.data?.city || "Hanoi"}
                  longitude={item?.data?.location?.coordinates[0] || 105.123}
                  latitude={item?.data?.location?.coordinates[1] || 21.437}
                  onMouseEnter={(e) => {
                    e.preventDefault();
                    setPopUpIndex(true);
                  }}
                  onMouseLeave={(e) => {
                    e.preventDefault();
                    setPopUpIndex(false);
                  }}
                >
                  <CircleIcon props={item?.data?.current?.pollution?.aqius || 100}>
                    <p>{item?.data?.current?.pollution?.aqius || 100}</p>
                  </CircleIcon>

                </Marker>
                {renderPopup(item)}
              </div>
            ))
          }

          <GeolocateControl
            style={geolocateControlStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            showUserLocation={true}
            showUserHeading={true}
            auto
          />
          <FullscreenControl style={fullscreenControlStyle} />
        </ReactMapGL>
        <br />
        <NearestCityInfo />
      </div>
    </PageContainer>
  )
}
const WorldMap = () => (
  <MapContextProvider>
    <WorldMapImpl />
  </MapContextProvider>
);

export default memo(WorldMap)
