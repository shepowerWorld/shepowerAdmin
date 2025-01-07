import React from "react";
import { io } from "socket.io-client";
export const CountContext = React.createContext();

export const APiURl = process.env.REACT_APP_API_URL;

export const socket = io(`${APiURl}`);

export const Profile_img =
  "https://shepowerbucket02.s3.ap-south-1.amazonaws.com/images/";
