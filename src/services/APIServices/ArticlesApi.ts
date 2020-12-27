import { httpGet, httpPost } from '../CRUDService';

export const getArticlesAsync = async(url:string, body:any) => {
    return await httpPost(url, body, false)
};

export const getClaimReviewAsync = async(url:string) => {
    return await httpGet(url, false);
}

// export const getClaimsAsync = async () => {
//     return await httpGet('/api/')
// }