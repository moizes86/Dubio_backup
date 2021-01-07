import { asyncActionStart, asyncActionFailure, getClaimReviewSuccess, postClaimSummarySuccess, postRelevantSourceSuccess, postJobTitleSuccess } from './claim-review-slice';

import { getClaimReviewAsync, postClaimSummaryAsync, postJobTitleAsync, postRelevantSourceAsync, postSourceAsync, postOccurrenceAsync, postResourceAsync, postClaimInfoAsync, postSummaryVoteUpAsync } from '../../services/APIServices/ArticlesApi';
import { AppThunk } from '../store';


export const getClaimReview = (claimId: any): AppThunk => async (dispatch) => {

    const url = `https://api.dubioo.com/api/ClaimReview/${claimId}`;

    try {
        dispatch(asyncActionStart());
        let result = await getClaimReviewAsync(url);
        dispatch(getClaimReviewSuccess(result.data));
    } catch (error) {
        dispatch(asyncActionFailure(error))
    }

}

export const postClaimSummary = (ClaimId: number, summary: string): AppThunk => async (dispatch) => {
    dispatch(asyncActionStart());
    try {
        let result = await postClaimSummaryAsync(`https://api.dubioo.com/api/ClaimReview/${ClaimId}/Summary`, summary);
        dispatch(postClaimSummarySuccess())

    } catch (error) {
        dispatch(asyncActionFailure(error.message))
    }
};

export const postRelevantSource = (claimId: number, source: string, comment: string): AppThunk => async (dispatch) => {
    dispatch(asyncActionStart());
    try {
        let result = await postRelevantSourceAsync(`https://api.dubioo.com/api/ClaimReview/${claimId}/Resource`, source, comment);
        dispatch(postRelevantSourceSuccess())

    } catch (error) {
        dispatch(asyncActionFailure(error.message))
    }
};

export const postJobTitle = (infoId: number, data: string): AppThunk => async (dispatch) => {
    dispatch(asyncActionStart());
    try {
        let result = await postJobTitleAsync(`https://api.dubioo.com/api/ClaimReview/ClaimInfo/${infoId}/JobTitle`, data);
        dispatch(postJobTitleSuccess())

    } catch (error) {
        dispatch(asyncActionFailure(error.message))
    }
};

export const postSource = (infoId: number, data: any): AppThunk => async (dispatch) => {
    dispatch(asyncActionStart());
    try {
        let result = await postSourceAsync(`https://api.dubioo.com/api/ClaimReview/ClaimInfo/${infoId}/Source`, data);
        dispatch(postJobTitleSuccess())

    } catch (error) {
        dispatch(asyncActionFailure(error.message))
    }
};

export const postOccurrence = (infoId: number, data: any): AppThunk => async (dispatch) => {
    dispatch(asyncActionStart());
    try {
        let result = await postOccurrenceAsync(`https://api.dubioo.com/api/ClaimReview/ClaimInfo/${infoId}/Occurrence`, data);
        dispatch(postJobTitleSuccess())

    } catch (error) {
        dispatch(asyncActionFailure(error.message))
    }
};

export const postResource = (ClaimId: number, data: any): AppThunk => async (dispatch) => {
    dispatch(asyncActionStart());
    try {
        let result = await postResourceAsync(`https://api.dubioo.com/api/ClaimReview/${ClaimId}/Resource`, data);
        dispatch(postJobTitleSuccess())

    } catch (error) {
        dispatch(asyncActionFailure(error.message))
    }
};

export const postClaimInfo = (ClaimId: number, title: string): AppThunk => async (dispatch) => {
    dispatch(asyncActionStart());
    try {
        let result = await postClaimInfoAsync(`https://api.dubioo.com/api/ClaimReview/${ClaimId}/ClaimInfo`, title);
        dispatch(postJobTitleSuccess())

    } catch (error) {
        dispatch(asyncActionFailure(error.message))
    }
};

export const postSummaryVoteUp = (data: any): AppThunk => async (dispatch) => {
    dispatch(asyncActionStart());
    if (!data.isVotedUp) {
        try {
            let result = await postSummaryVoteUpAsync(`https://api.dubioo.com/api/ClaimReview/Summary/${data.summaryId}/VoteUp`);
            dispatch(postJobTitleSuccess())

        } catch (error) {
            dispatch(asyncActionFailure(error.message))
        }
    }

};





