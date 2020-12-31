import { httpGet, httpPost } from '../CRUDService';

export const getArticlesAsync = async(url:string, body:any) => {
    return await httpPost(url, body, false)
};

export const getClaimReviewAsync = async(url:string) => {
    return await httpGet(url, false);
}

export const postClaimSummaryAsync = async(url:string, summary:string) => {
    return await httpPost(url, {'Title' :`${summary}`}, false);
}

export const postRelevantSourceAsync = async(url:string, source:string, comment:string) => {
    return await httpPost(url, {'Title' :`${source}`, 'Comment': comment, 'Url': url}, false);
}
