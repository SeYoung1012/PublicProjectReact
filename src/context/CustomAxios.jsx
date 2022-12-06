import axios from 'axios';
import React from 'react';
import { SERVER_URL } from 'src/context/config';

const asd = "asd";

export function get(url,data){
    return axios.get(SERVER_URL + url,{
        ...data,
        withCredentials:true
    });
}

export function post(url,data){
    return axios.post(SERVER_URL + url,data,{
        withCredentials:true
    })
}

export function put(url,data){
    return axios.put(SERVER_URL + url,data,{
        withCredentials:true
    })
}

