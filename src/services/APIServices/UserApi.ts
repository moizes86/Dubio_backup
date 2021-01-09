import { httpPost, httpPut } from '../CRUDService';
const baseUrl = `https://api.dubioo.com/api/User`;
export const login = async (userName: string, password: string) => {
  return await httpPost(`${baseUrl}/Login`, { userName, password }, false);
};
export const refreshLogin = async (refreshToken: string) => {
  return await httpPut(`${baseUrl}/Refresh`,{
    RefreshToken: refreshToken
  });
};

export const register = async (UserName: string, Password: string, Email: string) => {
  return await httpPost(`${baseUrl}/Register`, { UserName, Password , Email}, false);
};

