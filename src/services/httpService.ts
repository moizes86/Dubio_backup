import axios from 'axios';
import { httpMethod } from '../consts/types';

export const httpService = (
  method: httpMethod,
  url: string,
  Request: any,
  includeToken: boolean = true,
) => {
  const accessToken = localStorage.getItem("access-token"); 
  // const lastLogin = localStorage.getItem("last-login"); 
  // if(lastLogin && Date.now() - +lastLogin > 5*60*1000 )
  return axios({
    method: method,
    url: url,
   data: {
     ...Request,
     LoginToken: accessToken
    },

  })
};

