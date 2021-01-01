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
        toggleHotCount: (state, action) => {
            return state;
        },
        toggleBookmarkCount: (state, action) => {
            return state;
        },
        getClaimReviewStart: state => {
            state.loading = true;
        },
        getClaimReviewSuccess: (state, action: any) => {
            state.loading = false;
            state.Claim = action.payload.Claim;
            state.Summaries = action.payload.Summaries;
            state.Resources = action.payload.Resources;
            state.Infos = action.payload.Infos;
        },
        getClaimReviewFailure: (state, action: any) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
        postClaimSummaryStart: (state) => {
            state.loading = true;
        },
        postClaimSummarySuccess: (state) => {
            state.loading = false;
        },
        postClaimSummaryFailure: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        },
        postRelevantSourceStart: (state) => {
            state.loading = true;
        },
        postRelevantSourceSuccess: (state) => {
            state.loading = false;
        },
        postRelevantSourceFailure: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        }

    },
});

export const { toggleHotCount, toggleBookmarkCount, getClaimReviewStart, getClaimReviewSuccess, getClaimReviewFailure, postClaimSummaryStart, postClaimSummarySuccess, postClaimSummaryFailure, postRelevantSourceStart, postRelevantSourceSuccess, postRelevantSourceFailure } = claimReviewSlice.actions;


export const claimSelector = (state: RootState) => state.claimReview.Claim;
export const claimLoadingSelector = (state: RootState) => state.claimReview.loading;
export const errorMessageSelector = (state: RootState) => state.claimReview.errorMessage;
export const claimResourceSelector = (state: RootState) => state.claimReview.Resources;
export const claimSummarySelector = (state: RootState) => state.claimReview.Summaries;

export default claimReviewSlice.reducer;
