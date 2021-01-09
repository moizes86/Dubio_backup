import { httpGet, httpPost } from '../CRUDService';
export const getArticlesAsync = async (url: string, body: any) => {
    return await httpPost(url, body)
};

export const getClaimReviewAsync = async (url: string) => {
    return await httpGet(url, false);
};

export const postClaimSummaryAsync = async (url: string, summary: string) => {
    return await httpPost(url, { 'Title': `${summary}` }, false);
};

export const postRelevantSourceAsync = async (url: string, source: string, comment: string) => {
    return await httpPost(url, { 'Title': `${source}`, 'Comment': comment, 'Url': url }, false);
};
export const postJobTitleAsync = async (url: string, data: string) => {
    return await httpPost(url, { 'JobTitle': `${data}` }, false);
};

export const postSourceAsync = async (url: string, data: any) => {
    return await httpPost(url, { 'Title': data.text, 'Url': data.url }, false);
};

export const postOccurrenceAsync = async (url: string, data: any) => {
    return await httpPost(url, { 'Title': data.text, 'Date': data.date, 'Url': data.url }, false);
};

export const postResourceAsync = async (url: string, data: any) => {
    return await httpPost(url, { 'Title': data.text,'Comment': data.comment, 'Date': data.date, 'Url': data.url }, false);
};

export const postClaimInfoAsync = async (url: string, title: string) => {
    return await httpPost(url, { 'Title': title}, false);
};

export const postSummaryVoteUpAsync = async (url: string) => {
    return await httpPost(url, false);
};

export const postVoteClaim = async (id: number) => {
    return await httpPost(`https://api.dubioo.com/api/Claim/${id}/Vote`, false);
};

export const postBookmarkClaim = async (id: number) => {
    return await httpPost(`https://api.dubioo.com/api/Claim/${id}/Bookmark`, false);
};