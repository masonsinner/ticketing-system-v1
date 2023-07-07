import axios from 'axios';

const base:string = "http://127.0.0.1:5000"

const apiClientNoAuth =()=> axios.create({
    baseURL: base,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow requests from all origins 
    },
})

const apiClientBasicAuth =(username:string, password:string)=> axios.create({
    baseURL: base,
    headers:{
        Authorization:"Basic "+ btoa(username+":"+password)
    }
})

const apiClientTokenAuth =(token:string)=> axios.create({
    baseURL: base,
    headers:{
        Authorization:"Bearer "+ token
    }
})

export{
    apiClientBasicAuth,
    apiClientNoAuth,
    apiClientTokenAuth
}