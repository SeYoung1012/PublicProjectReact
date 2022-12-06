import axios from 'axios';
import React from 'react';
import { SERVER_URL } from 'src/context/config';



const CustomAxios2 = axios.create({
    
    baseURL: SERVER_URL,
    withCredentials:true,



})

export default CustomAxios2;

