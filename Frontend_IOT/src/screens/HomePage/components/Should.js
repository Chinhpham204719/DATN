import React, { memo, useRef, useState, useEffect } from 'react';
import ReactMapGL, { FullscreenControl, GeolocateControl, Marker, Popup } from 'react-map-gl';
import tw, { styled } from 'twin.macro';
import { MapContextProvider, useMapContext } from '../context';
import "../style.css";
import NearestCityInfo from './NearestCityInfo';
 
 
 
const Should = () => {
const { nearestCity } = useMapContext()
const [message, setMessage] =useState('')
const loadMessage = () =>{
    if(nearestCity?.current?.weather?.hu>80&&nearestCity?.current?.weather?.tp>30){
        setMessage("Use air conditioning or a fan to cool the environment.")
    }
    else
    if(nearestCity?.current?.weather?.hu<30&&nearestCity?.current?.weather?.tp>30){
        setMessage("Consider increasing water supply for indoor plants and ensure adequate hydration to prevent dehydration.")
    }else
    if(nearestCity?.current?.weather?.hu<30&&nearestCity?.current?.weather?.tp<15){
        setMessage("Use a humidifier to alleviate dry skin and dry eyes.")
    }else
    if(nearestCity?.current?.weather?.hu>=30&&nearestCity?.current?.weather?.hu<=80&&nearestCity?.current?.weather?.tp>=20&&nearestCity?.current?.weather?.tp<=25){
        setMessage("Open windows for ventilation to make the space more comfortable.")
    }
  else
    if(nearestCity?.current?.weather?.hu>90&&nearestCity?.current?.weather?.tp<20){
        setMessage("Wear warm clothing and use a dehumidifier to prevent mold due to excessive moisture.")
    }else{
        setMessage("Choose activities appropriate to the weather.")
    }
}
useEffect(() => {
    loadMessage(); // Gọi hàm khi component được mount
  }, []);
   return (
   <div className="box">
    <h2>Health & Activities</h2>
    <h3>{message}</h3>
   </div>
  )
}
 
 
export default memo(Should)