import React, { useRef, useState } from 'react';
import { Briefcase, Facebook, GitHub, Instagram, Twitch, Twitter, Youtube } from 'react-feather';
import ReactMapGL, { GeolocateControl, Marker } from 'react-map-gl';
import tw, { styled } from 'twin.macro';
import NavTop from '../../layout/components/NavTop/NavTop';
import { ProfileContextProvider, useProfileContext } from './context';
import './style.css';
const ContainerPage = styled.div`
  ${tw`font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover`}
  `
const CircleIcon = styled.div(({ props }) => [
  tw`rounded-full text-white w-10 h-10 text-xs text-center`,
  props <= 50 && tw`bg-green-500`,
  props <= 100 && props >= 51 && tw`bg-yellow-500`,
  props <= 150 && props >= 101 && tw`bg-red-300`,
  props <= 200 && props >= 151 && tw`bg-red-500`,
  props <= 300 && props >= 201 && tw`bg-purple-500`,
  props > 300 && tw`bg-red-900`
])

const ImageContainer = tw.div`p-4 md:p-12 text-center lg:text-left`
const MainCol = tw.div`w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0`
const MobileView = styled.div`
${`background-image: url('https://source.unsplash.com/MP0IUfwrn0A')`},
  ${tw`block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center`}
`
const MainContainer = tw.div`max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0`
const H1Title = tw.h1`text-3xl font-bold pt-8 lg:pt-0`
const TitleContainer = tw.div`mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25`
const Title1 = tw.p`pt-4 text-base font-bold flex items-center justify-center lg:justify-start`
const Title2 = tw.p`pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start`
const Title3 = tw.p`pt-8 text-sm`
const ButtonContainer = tw.div`pt-12 pb-8`
const ButtonTouch = tw.button`bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full`
const MediaContainer = tw.div`mt-6 px-4 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between`
const ImgCol = tw.div`w-full lg:w-2/5`
const Avatar = tw.img`rounded-none lg:rounded-lg shadow-2xl hidden lg:block`

const ProfileImpl = () => {
  const { user, listDevices, listPublicDevice } = useProfileContext()
  const mapRef = useRef();
  const geolocateControlStyle = {
    right: 10,
    top: 10
  };

  const [viewport, setViewport] = useState({
    width: "200%",
    height: '605px',
    latitude: 21.018,
    longitude: 105.800,
    zoom: 4
  });
  const listHistory = listDevices[listDevices?.length - 1]?.stateHistory
  const listPublicHistory = listPublicDevice[listPublicDevice?.length - 1]?.stateHistory
  return (
    <>
      <NavTop />
      <ContainerPage>
        <MainContainer>
          <MainCol>
            <ImageContainer>
              <MobileView />
              <H1Title> Hello {user?.username}</H1Title>
              <TitleContainer></TitleContainer>
              <Title1><Briefcase />&nbsp; &nbsp;What do you do?</Title1>
              <Title3>A brief description about yourself, including information about your profession, hobbies, experience, career goals, and other relevant details.</Title3>
            </ImageContainer>
            <MediaContainer>
              <Facebook />
              <Twitter />
              <GitHub />
              <Instagram />
              <Youtube />
              <Twitch />
            </MediaContainer>
            <ButtonContainer>
              {/*<ButtonTouch>*/}
              {/*  Manage your device*/}
              {/*</ButtonTouch>*/}
            </ButtonContainer>
          </MainCol>
  
          <ImgCol>
            {/* <Avatar className='avatar' src="https://source.unsplash.com/MP0IUfwrn0A" alt="avt" /> */}
            <ReactMapGL
              ref={mapRef}
              {...viewport}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              onViewportChange={nextViewport => setViewport(nextViewport)}
              mapboxApiAccessToken={process.env.REACT_APP_MAP_API_TOKEN}
            >
              {
                listDevices.length > 0 && listDevices?.map((item) => (
                  <div key={item?._id}>
                    <Marker
                      key={item?._id || 1122}
                      longitude={parseFloat(item?.location[1]) || 105.123}
                      latitude={parseFloat(item?.location[0]) || 21.437}
                    >
                      <CircleIcon style={{ paddingTop: 1 }} props={listHistory[listHistory.length - 1]?.dust || 0}>
                        <p>{listHistory[listHistory.length - 1]?.dust || 0}</p>
                      </CircleIcon>

                    </Marker>
                  </div>
                ))
              }
              {
                listPublicDevice.length > 0 && listPublicDevice?.map((item) => (
                  <div key={item?._id}>
                    <Marker
                      key={item?._id || 1122}
                      longitude={parseFloat(item?.location[1]) || 105.123}
                      latitude={parseFloat(item?.location[0]) || 21.437}
                    >
                      <CircleIcon style={{ background: '#FFA35C', paddingTop: 1 }} props={listPublicHistory[listPublicHistory.length - 1]?.dust || 200}>
                        <p>{listPublicHistory[listPublicHistory.length - 1]?.dust || 200}</p>
                      </CircleIcon>

                    </Marker>
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
            </ReactMapGL>
          </ImgCol>
        </MainContainer>

      </ContainerPage>
    </>
  )
}
const Profile = () => <ProfileContextProvider><ProfileImpl /></ProfileContextProvider>

export default Profile
