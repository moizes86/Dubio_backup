import { getClaimReviewStart, getClaimReviewSuccess, getClaimReviewFailure, postClaimSummaryStart, postClaimSummarySuccess, postClaimSummaryFailure, postRelevantSourceStart, postRelevantSourceSuccess, postRelevantSourceFailure } from './claim-review-slice';

import { getClaimReviewAsync, postClaimSummaryAsync, postRelevantSourceAsync } from '../../services/APIServices/ArticlesApi';
import { AppThunk } from '../store';





export const getClaimReview = (claimId: any): AppThunk => async (dispatch) => {

    const url = `https://api.dubioo.com/api/ClaimReview/${claimId}`;

    try {
        dispatch(getClaimReviewStart());
        let result = await getClaimReviewAsync(url);
        dispatch(getClaimReviewSuccess(result.data));
    } catch (error) {
        dispatch(getClaimReviewFailure(error))
    }

}

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
