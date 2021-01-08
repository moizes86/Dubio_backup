import axios from 'axios';
import { httpMethod } from '../consts/types';

export const httpService = (
  method: httpMethod,
  url: string,
  Request: any,
  includeToken: boolean = true,
) => {
  
  const data  = Request;
  const accessToken = localStorage.getItem("access-token"); 
  return axios({
    method: method,
    url: url,
    data,
    headers: {
      'Authorization': `Bearer ${accessToken}`
   },
  })
};

