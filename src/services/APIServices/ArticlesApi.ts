import { httpPost } from '../CRUDService';

export const getArticlesAsync = async(url:string, body:any) => {
    return await httpPost(url, body, false)
};

// export const getClaimsAsync = async () => {
//     return await httpGet('/api/')
// }