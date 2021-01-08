import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../rootReducer';

import { ISelectOption } from "../../Interfaces/ISelectOption";
import { findArticle, serverOptionsToAntOptions } from './article-slice.utils';


interface IArticlesInitialState {
  articlesArr: any;
  filteredArticlesArr: any;
  article: any;
  loading: boolean;
  errorMessage: any;
  filterOptions: {
    language: ISelectOption[],
    region: ISelectOption[],
    topic: ISelectOption[]
  };
  sortOptions: ISelectOption[];
}

let initialState: IArticlesInitialState = {
  articlesArr: null,
  filteredArticlesArr: [],
  filterOptions: {
    language: [],
    region: [],
    topic: []
  },
  sortOptions: [],
  // claimsArr: [],
  loading: false,
  errorMessage: '',
  article: null,
  // claim: null,
}

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    toggleHotCount: (state, action) => {
      return state;
    },
    toggleBookmarkCount: (state, action) => {
      return state;
    },
    getArticlesStart: (state) => {
      state.loading = true;

      return state;
    },
    getArticlesSuccess: (state, action: any) => {
      state.loading = false;
      state.articlesArr = action.payload.Articles;
      const filterOptions = {
        language: serverOptionsToAntOptions(action.payload.Filter.Language),
        region: serverOptionsToAntOptions(action.payload.Filter.Region),
        topic: serverOptionsToAntOptions(action.payload.Filter.Topic),
      };
      state.filterOptions = filterOptions;
      state.sortOptions = serverOptionsToAntOptions(action.payload.Sort.Sort);
      return state;
    },
    getArticlesFailure: (state, action: any) => {
      state.loading = false;
      state.errorMessage = action.payload;

      return state;
    },
    getArticle: (state, action) => {
      const article: any = findArticle(state.articlesArr, action.payload);

      state.article = article;

      return state;
    },

    // getClaimReviewStart: state => {
    //   state.loading = true;
    // },
    // getClaimReviewSuccess: (state, action: any) => {
    //   state.loading = false;
    //   state.claim = action.payload;
    // },
    // getClaimReviewFailure: (state, action: any) => {
    //   state.loading = false;
    //   state.errorMessage = action.payload;
    // },
    // postClaimSummaryStart: (state) => {
    //   state.loading = true;
    // },
    // postClaimSummarySuccess: (state) => {
    //   state.loading = false;
    // },
    // postClaimSummaryFailure: (state, action) => {
    //   state.loading = false;
    //   state.errorMessage = action.payload;
    // },
    // postRelevantSourceStart: (state) => {
    //   state.loading = true;
    // },
    // postRelevantSourceSuccess: (state) => {
    //   state.loading = false;
    // },
    // postRelevantSourceFailure: (state, action) => {
    //   state.loading = false;
    //   state.errorMessage = action.payload;
    // }

  },
});

export const { toggleHotCount, toggleBookmarkCount, getArticlesStart, getArticlesSuccess, getArticlesFailure, getArticle, /*getClaimReviewStart, getClaimReviewSuccess, getClaimReviewFailure, postClaimSummaryStart, postClaimSummarySuccess, postClaimSummaryFailure, postRelevantSourceStart, postRelevantSourceSuccess, postRelevantSourceFailure*/ } = articleSlice.actions;


export const articlesArrSelector = (state: RootState) => state.articles.articlesArr;
export const articlesLoadingSelector = (state: RootState) => state.articles.loading;
export const articleSelector = (state: RootState) => state.articles.article;
// export const claimSelector = (state: RootState) => state.articles.claim;
// export const errorMessageSelector = (state: RootState) => state.articles.errorMessage;
// export const claimResourceSelector = (state: RootState) => state.articles.claim.Resources;
// export const claimSummarySelector = (state: RootState) => state.articles.claim.Summaries;
export const filterAndSortOptionsSelector = (state: RootState) => {

  return {
    sortOptions: state.articles.sortOptions,
    filterOptions: state.articles.filterOptions
  }
}


export default articleSlice.reducer;
