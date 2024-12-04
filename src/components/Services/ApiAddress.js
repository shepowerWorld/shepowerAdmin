import React from 'react';
import { io } from 'socket.io-client'
export const CountContext = React.createContext();

export const APiURl= "http://13.126.45.34:6002/"

export  const socket = io("http://13.126.45.34:6002")

export const Profile_img= "https://shepowerbucket02.s3.ap-south-1.amazonaws.com/images/"