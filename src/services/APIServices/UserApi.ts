import { httpPost } from '../CRUDService';
const url = `https://api.dubioo.com/api/User/Login`;
export const login = async (userName: string, password: string) => {
  return await httpPost(url, { userName, password }, false);
};
