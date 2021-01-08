import { asyncActionStart, asyncActionFailure, asyncActionSuccess, getClaimReviewSuccess, postClaimSummarySuccess, postRelevantSourceSuccess, postJobTitleSuccess } from './claim-review-slice';

import { getClaimReviewAsync, postClaimSummaryAsync, postJobTitleAsync, postRelevantSourceAsync, postSourceAsync, postOccurrenceAsync, postResourceAsync, postClaimInfoAsync, postSummaryVoteUpAsync } from '../../services/APIServices/ArticlesApi';
import { AppThunk } from '../store';


// GET CLAIM REVIEW
export const getClaimReview = (claimId: any): AppThunk => async (dispatch) => {
    const url = `https://api.dubioo.com/api/ClaimReview/${claimId}`;
    try {
        dispatch(asyncActionStart());
        let result = await getClaimReviewAsync(url);
        dispatch(getClaimReviewSuccess(result.data));
    } catch (error) {
        dispatch(asyncActionFailure(error))
    }
};

// POST CLAIM SUMMARY
export const postClaimSummary = (ClaimId: number, summary: string): AppThunk => async (dispatch) => {
    dispatch(asyncActionStart());
    try {
        await postClaimSummaryAsync(`https://api.dubioo.com/api/ClaimReview/${ClaimId}/Summary`, summary);
        dispatch(getClaimReview(ClaimId));
    } catch (error) {
        dispatch(asyncActionFailure(error.message))
    }
};

//POST CLAIM INFO
export const postClaimInfo = (ClaimId: number, title: string): AppThunk => async (dispatch) => {
    dispatch(asyncActionStart());
    try {
        await postClaimInfoAsync(`https://api.dubioo.com/api/ClaimReview/${ClaimId}/ClaimInfo`, title);
        dispatch(getClaimReview(ClaimId));
    } catch (error) {
        dispatch(asyncActionFailure(error.message))
    }
};

export const postJobTitle = (ClaimId:number, infoId: number, data: string): AppThunk => async (dispatch) => {
    dispatch(asyncActionStart());
    try {
        await postJobTitleAsync(`https://api.dubioo.com/api/ClaimReview/ClaimInfo/${infoId}/JobTitle`, data);
        dispatch(getClaimReview(ClaimId));
    } catch (error) {
        dispatch(asyncActionFailure(error.message))
    }
};

export const postSource = (ClaimId:number, infoId: number, data: any): AppThunk => async (dispatch) => {
    dispatch(asyncActionStart());
    try {
        await postSourceAsync(`https://api.dubioo.com/api/ClaimReview/ClaimInfo/${infoId}/Source`, data);
        dispatch(getClaimReview(ClaimId));

    } catch (error) {
        dispatch(asyncActionFailure(error.message))
    }
};

export const postOccurrence = (ClaimId:number, infoId: number, data: any): AppThunk => async (dispatch) => {
    dispatch(asyncActionStart());
    try {
        await postOccurrenceAsync(`https://api.dubioo.com/api/ClaimReview/ClaimInfo/${infoId}/Occurrence`, data);
        dispatch(getClaimReview(ClaimId));

    } catch (error) {
        dispatch(asyncActionFailure(error.message))
    }
};

export const postResource = (ClaimId: number, data: any): AppThunk => async (dispatch) => {
    dispatch(asyncActionStart());
    try {
        await postResourceAsync(`https://api.dubioo.com/api/ClaimReview/${ClaimId}/Resource`, data);
        dispatch(getClaimReview(ClaimId));

    } catch (error) {
        dispatch(asyncActionFailure(error.message))
    }
};



export const postSummaryVoteUp = (data: any): AppThunk => async (dispatch) => {
    dispatch(asyncActionStart());
    if (!data.isVotedUp) {
        try {
            await postSummaryVoteUpAsync(`https://api.dubioo.com/api/ClaimReview/Summary/${data.summaryId}/VoteUp`);
            dispatch(postJobTitleSuccess())

        } catch (error) {
            dispatch(asyncActionFailure(error.message))
        }
    }
};

export const postRelevantSource = (claimId: number, source: string, comment: string): AppThunk => async (dispatch) => {
    dispatch(asyncActionStart());
    try {
        await postRelevantSourceAsync(`https://api.dubioo.com/api/ClaimReview/${claimId}/Resource`, source, comment);
        dispatch(getClaimReview(claimId))
    } catch (error) {
        dispatch(asyncActionFailure(error.message))
    }
};




