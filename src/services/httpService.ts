import axios from 'axios';
import { httpMethod } from '../consts/types';

export const httpService = (
  method: httpMethod,
  url: string,
  Request: any,
  includeToken: boolean = true,
) => {
  
  const data  = Request;
  if(includeToken){
    const accessToken = localStorage.getItem("access-token"); 
    data.AccessToken = accessToken;
  }
  return axios({
    method: method,
    url: url,
    data,

  })
};

