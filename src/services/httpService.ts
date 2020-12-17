import axios from 'axios';
import { httpMethod } from '../consts/types';

const baseURL =
  'http://dubio-env.eba-p2zxezup.us-east-1.elasticbeanstalk.com/api';

// export const httpService = (
//   method: httpMethod,
//   url: string,
//   Request: any,
//   includeToken: boolean = true
// ) => {
//   axios({
//     method: method,
//     url: baseURL + url,
//     data: {
//       LoginToken: includeToken
//         ? {
//             Token: '',
//           }
//         : undefined,
//       Request: Request || undefined,
//     },
//   }).then((res) => {
//     console.log(res)
//     const persons = res.data;
//     console.log('persons:', persons);
//   });
// };

export const httpService = (
  method: httpMethod,
  url: string,
  Request: any,
  includeToken: boolean = true,
) => {
  return axios({
    method: method,
    url: url,
   data: Request,
  })
};

