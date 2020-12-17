import { httpService } from './httpService';

export const httpGet = async (
  url: string,
  Request: any,
  includeToken: boolean = true
) => {
  return await httpService('post', url, Request, includeToken);
};

export const httpPut = (url: string, Request: any) => {
  httpService('put', url, Request);
};

export const httpPost =  (
  url: string,
  Request: any,
  includeToken: boolean = true
) => {
 return httpService('post', url, Request, includeToken);
};

export const httpDelete = (url: string, Request: any) => {
  httpService('delete', url, Request);
};
