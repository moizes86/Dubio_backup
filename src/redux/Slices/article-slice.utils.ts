import { getArticlesStart, getArticlesSuccess, getArticlesFailure, getClaimReviewStart, getClaimReviewSuccess, getClaimReviewFailure, postClaimSummaryStart, postClaimSummarySuccess, postClaimSummaryFailure, postRelevantSourceStart, postRelevantSourceSuccess, postRelevantSourceFailure } from './ArticleSlice';

import { getArticlesAsync, getClaimReviewAsync, postClaimSummaryAsync, postRelevantSourceAsync } from '../../services/APIServices/ArticlesApi';
import { AppThunk } from '../store';

import { IArticleFilter } from '../../Interfaces/IArticleFilter'

import { IServerSelectOption, ISelectOption } from '../../Interfaces/ISelectOption'

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

interface IGetArticlesBody {
    PageSize: number;
    PageNumber?: number;
    Tags?: { Name: string; Value: string }[];
    SearchText?: string
}

export const getArticles = (filter?: any, searchText?: string): AppThunk => async (dispatch) => {
    const dataType = "Articles";
    // const articlesInStorage = checkLocalStorage(dataType);
    // if (!articlesInStorage) {
    const url = `https://api.dubioo.com/api/Page/Dashboard`;
    const body: IGetArticlesBody = {
        PageSize: 10
    }
    if (filter) {
        let TagsArray: { Name: string, Value: string }[] = []
        Object.keys(filter).forEach((propertyName: string, index: number, filterArray: any): void => {
            if (filter[propertyName]) {
                TagsArray.push({ Name: propertyName.charAt(0).toUpperCase() + propertyName.slice(1), Value: filter[propertyName] })
            }
        });
        body.Tags = TagsArray;
    }
    if (searchText) {
        body.SearchText = searchText
    }

    try {
        dispatch(getArticlesStart());
        const result = await getArticlesAsync(url, body);
        dispatch(getArticlesSuccess(result.data));
        setDataInLocalStorage(dataType, result);
    } catch (error) {
        dispatch(getArticlesFailure(error))
    }

    // } else {
    //     getDataFromLocalStorage(dispatch, dataType);
    // }
};

export const getClaimReview = (claimId: any): AppThunk => async (dispatch) => {
    const dataType = "Claim-Review"
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

export const postClaimSummary = (claimId: number, summary: string): AppThunk => async (dispatch) => {
    dispatch(postClaimSummaryStart());
    try {
        let result = await postClaimSummaryAsync(`https://api.dubioo.com/api/ClaimReview/${claimId}/Summary`, summary);
        dispatch(postClaimSummarySuccess())

    } catch (error) {
        dispatch(postClaimSummaryFailure(error.message))
    }
}

export const postRelevantSource = (claimId: number, source: string, comment: string): AppThunk => async (dispatch) => {
    dispatch(postRelevantSourceStart());
    try {
        let result = await postRelevantSourceAsync(`https://api.dubioo.com/api/ClaimReview/${claimId}/Resource`, source, comment);
        dispatch(postRelevantSourceSuccess())

    } catch (error) {
        dispatch(postRelevantSourceFailure(error.message))
    }
}

export const serverOptionsToAntOptions = (serverOptions: IServerSelectOption[]): ISelectOption[] => {
    console.log("serverOptions:", serverOptions);

    return serverOptions.map((option: IServerSelectOption) => {
        return {
            label: option.Value,
            value: option.Value
        }

    })
};
