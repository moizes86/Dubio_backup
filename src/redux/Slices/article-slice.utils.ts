import { getArticlesStart, getArticlesSuccess, getArticlesFailure, getClaimReviewStart, getClaimReviewSuccess, getClaimReviewFailure } from './ArticleSlice';

import { getArticlesAsync, getClaimReviewAsync } from '../../services/APIServices/ArticlesApi';
import { AppThunk } from '../store';

export function findArticle(articlesArr: any, { type, data }: any) {
    switch (type) {
        case 'url':
            return articlesArr.find((article: any) => article.InternalUrl == data)
    }
};

function setDataInLocalStorage(dataType: string, data: any) {
    const dataToStore = data.data.Articles;
    return (
        window.localStorage.setItem(dataType, JSON.stringify(dataToStore))
    )
};

function getDataFromLocalStorage(dispatch: any, dataType: string) {
    let data: any = window.localStorage.getItem(dataType);
    data = JSON.parse(data);
    dispatch(getArticlesSuccess(data));
};

function checkLocalStorage(data: string) {
    const dataInStorage = window.localStorage.getItem(data);
    return (
        dataInStorage ?
            true :
            false
    )
};

export const getArticles = (): AppThunk => async (dispatch) => {
    const dataType = "Articles";
    const articlesInStorage = checkLocalStorage(dataType);
    if (!articlesInStorage) {
        const url = `https://api.dubioo.com/api/Page/Dashboard`;
        const body = { "pagesize": 10 };

        try {
            dispatch(getArticlesStart());
            const result = await getArticlesAsync(url, body);
            dispatch(getArticlesSuccess(result.data.Articles));
            setDataInLocalStorage(dataType, result);
        } catch (error) {
            dispatch(getArticlesFailure(error))
        }

    } else {
        getDataFromLocalStorage(dispatch, dataType);
    }
};

export const getClaimReview = (claimId: any): AppThunk => async (dispatch) => {
    const dataType = "Claim-Review"
    // const claimInStorage = checkLocalStorage(dataType);
    const claimInStorage = false;
    if (!claimInStorage) {
        const url = `https://api.dubioo.com/api/ClaimReview/${claimId}`;

        try {
            dispatch(getClaimReviewStart());
            let result = await getClaimReviewAsync(url);
            JSON.stringify(result);
            dispatch(getClaimReviewSuccess(result.data));
            // setDataInLocalStorage(dataType, result);
        } catch (error) {
            dispatch(getClaimReviewFailure(error))
        }

    } else {
        // getDataFromLocalStorage(dispatch, dataType);
        console.log('CLAIM REVIEW SHOULD STORE IN LOCAL STORAGE')
    }
};