import { getArticlesStart, getArticlesSuccess, getArticlesFailure } from './ArticleSlice';

import { getArticlesAsync } from '../../services/APIServices/ArticlesApi';
import { AppThunk } from '../store';

import {filterItem, IArticleFilter} from '../../Interfaces/IArticleFilter'

import { IServerSelectOption, ISelectOption } from '../../Interfaces/ISelectOption'

export function findArticle(articlesArr: any, { type, data }: any) {
    switch (type) {
        case 'url':
            return articlesArr.find((article: any) => article.InternalUrl === data)
    }
};

function setDataInLocalStorage(dataType: string, data: any) {
    const dataToStore = data.data.Articles;
    return (
        window.localStorage.setItem(dataType, JSON.stringify(dataToStore))
    )
};

// function getDataFromLocalStorage(dispatch: any, dataType: string) {
//     let data: any = window.localStorage.getItem(dataType);
//     data = JSON.parse(data);
//     dispatch(getArticlesSuccess(data));
// };

// function checkLocalStorage(data: string) {
//     const dataInStorage = window.localStorage.getItem(data);
//     return (
//         dataInStorage ?
//             true :
//             false
//     )
// };



// export const getClaimReview = (claimId: any): AppThunk => async (dispatch) => {
//     const dataType = "Claim-Review"
//     const claimInStorage = false;
//     if (!claimInStorage) {
//         const url = `https://api.dubioo.com/api/ClaimReview/${claimId}`;

//         try {
//             dispatch(getClaimReviewStart());
//             let result = await getClaimReviewAsync(url);
//             JSON.stringify(result);
//             dispatch(getClaimReviewSuccess(result.data));
//             // setDataInLocalStorage(dataType, result);
//         } catch (error) {
//             dispatch(getClaimReviewFailure(error))
//         }

//     } else {
//         // getDataFromLocalStorage(dispatch, dataType);
//         console.log('CLAIM REVIEW SHOULD STORE IN LOCAL STORAGE')
//     }
// };

// export const postClaimSummary = (claimId: number, summary: string): AppThunk => async (dispatch) => {
//     dispatch(postClaimSummaryStart());
//     try {
//         let result = await postClaimSummaryAsync(`https://api.dubioo.com/api/ClaimReview/${claimId}/Summary`, summary);
//         dispatch(postClaimSummarySuccess())

//     } catch (error) {
//         dispatch(postClaimSummaryFailure(error.message))
//     }
// }

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
