import { getArticlesStart, getArticlesSuccess, getArticlesFailure, getClaimReviewStart, getClaimReviewSuccess, getClaimReviewFailure } from './ArticleSlice';

import { getArticlesAsync, getClaimReviewAsync } from '../../services/APIServices/ArticlesApi';
import { AppThunk } from '../store';

import {filterItem, IArticleFilter} from '../../Interfaces/IArticleFilter'

import {IServerSelectOption, ISelectOption} from '../../Interfaces/ISelectOption'

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
    Tags?: {Name: string; Value: string}[];
    SearchText?: string;
    SortBy?: string;
}

export const getArticles = (): AppThunk => async (dispatch, getState) => {

        const url = `https://api.dubioo.com/api/Page/Dashboard`;
        const body: IGetArticlesBody = { 
            PageSize: 10
        }

        // Create the tags array for the server request 
        const state = getState();
        const {filterObject, sortBy, searchValue, pageNumber} = state.articles;
        if(filterObject){
            let TagsArray: {Name: string, Value: string}[] = []
           Object.keys(filterObject).forEach((propertyName): void => {
               if(filterObject[propertyName as filterItem]){
                   TagsArray.push({Name: propertyName.charAt(0).toUpperCase() + propertyName.slice(1), Value: filterObject[propertyName as filterItem]})
               }
            });

            body.Tags = TagsArray;
        }
        if(sortBy){
            body.SortBy = sortBy; 
        }
        if(searchValue){
            body.SearchText = searchValue;
        }
        // if(pageNumber){
        //     body.PageNumber = pageNumber;
        // }

        try {
            dispatch(getArticlesStart());
            const result = await getArticlesAsync(url, body);
            dispatch(getArticlesSuccess(result.data));
        } catch (error) {
            dispatch(getArticlesFailure(error))
        }

    // } else {
    //     getDataFromLocalStorage(dispatch, dataType);
    // }
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

export const serverOptionsToAntOptions = (serverOptions: IServerSelectOption[], selectAllOptionName?: string  ): ISelectOption[]=>{
    console.log("serverOptions:", serverOptions);
    let options: ISelectOption[] = []; 
    if(selectAllOptionName){
        options.push({
            label: selectAllOptionName,
            value: ""
        });
    };
    serverOptions.forEach((option: IServerSelectOption)=>{
        options.push({
            label: option.Value,
            value: option.Value
        });
    });

    return options;
}