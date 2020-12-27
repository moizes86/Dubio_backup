import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../rootReducer';
import { findArticle } from './article-slice.utils';


interface IArticlesInitialState {
  articlesArr: any;
  article: any;
  claimsArr: any;
  claim: any;
  loading: boolean;
  errorMessage: any;
}

let initialState: IArticlesInitialState = {
  articlesArr: null,
  claimsArr: [],
  loading: false,
  errorMessage: '',
  article: null,
  claim: null,
}

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    toggleHotCount: (state, action) => {
      if (!action.payload) return;

      // let article = findArticle(state, action);
      // if (article.isVoted) {
      //   article.isVoted = false;
      //   article.HotCount--;
      // } else {
      //   article.isVoted = true;
      //   article.HotCount++;
      // }

      return state;
    },
    toggleBookmarkCount: (state, action) => {
      if (!action.payload) return;
      // let article = findArticle(state, action);

      // if (article.isFavorite) {
      //   article.isFavorite = false;
      //   article.BookmarkCount--;
      // } else {
      //   article.isFavorite = true;
      //   article.BookmarkCount++;
      // }
    },
    getArticlesStart: (state) => {
      state.loading = true;

      return state;
    },
    getArticlesSuccess: (state, action: any) => {
      state.loading = false;
      state.articlesArr = action.payload;

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

    getClaimReviewStart: state => {
      state.loading = true;
    },
    getClaimReviewSuccess: (state, action: any) => {
      state.loading = false;
      state.claim = action.payload;
    },
    getClaimReviewFailure: (state, action: any) => {
      state.loading = false;
      state.errorMessage = action.payload;
    }
  },
});

export const { toggleHotCount, toggleBookmarkCount, getArticlesStart, getArticlesSuccess, getArticlesFailure, getArticle, getClaimReviewStart, getClaimReviewSuccess, getClaimReviewFailure } = articleSlice.actions;


export const articlesArrSelector = (state: RootState) => state.articles.articlesArr;
export const articlesLoadingSelector = (state: RootState) => state.articles.loading;
export const articleSelector = (state: RootState) => state.articles.article;
export const claimSelector = (state: RootState) => state.articles.claim;
export const errorMessageSelector = (state: RootState) => state.articles.errorMessage;

export default articleSlice.reducer;
