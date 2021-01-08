import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../rootReducer';

interface IArticlesInitialState {
    Claim: any;
    loading: boolean;
    errorMessage: any;
    Resources: any;
    Summaries: any;
    Infos: any;
}

let initialState: IArticlesInitialState = {
    loading: false,
    errorMessage: '',
    Claim: null,
    Resources: [],
    Summaries: [],
    Infos: []
}

const claimReviewSlice = createSlice({
    name: "claimReview",
    initialState,
    reducers: {
        asyncActionStart: state => {
            state.loading = true;
        },
        asyncActionSuccess: (state) => {
            state.loading = false;
        },
        asyncActionFailure: (state, action: any) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
        toggleHotCount: (state, action) => {
            return state;
        },
        toggleBookmarkCount: (state, action) => {
            return state;
        },
        getClaimReviewSuccess: (state, action: any) => {
            state.loading = false;
            state.Claim = action.payload.Claim;
            state.Summaries = action.payload.Summaries;
            state.Resources = action.payload.Resources;
            state.Infos = action.payload.Infos;
        },
        postClaimSummarySuccess: (state) => {
            state.loading = false;
        },
        postRelevantSourceSuccess: (state) => {
            state.loading = false;
        },
        postJobTitleSuccess: (state) => {
            state.loading = false;
        },
    },
});

export const { asyncActionStart, asyncActionSuccess, asyncActionFailure, toggleHotCount, toggleBookmarkCount, getClaimReviewSuccess, postClaimSummarySuccess, postRelevantSourceSuccess, postJobTitleSuccess } = claimReviewSlice.actions;


export const claimSelector = (state: RootState) => state.claimReview.Claim;
export const claimLoadingSelector = (state: RootState) => state.claimReview.loading;
export const errorMessageSelector = (state: RootState) => state.claimReview.errorMessage;
export const claimResourceSelector = (state: RootState) => state.claimReview.Resources;
export const claimReviewInfosSelector = (state: RootState) => state.claimReview.Infos;
export const claimSummarySelector = (state: RootState) => state.claimReview.Summaries;


export default claimReviewSlice.reducer;
