import { createSlice } from "@reduxjs/toolkit";
import { ISelectOption } from "../../Interfaces/ISelectOption";
import { RootState } from '../rootReducer';
import { findArticle, serverOptionsToAntOptions } from './article-slice.utils';


interface IArticlesInitialState {
  articlesArr: any;
  filteredArticlesArr: any;
  article: any;
  claimsArr: any;
  claim: any;
  loading: boolean;
  errorMessage: any;
  filterOptions: {
    language:ISelectOption[],
    region: ISelectOption[],
    topic: ISelectOption[]
  };
  sortOptions: ISelectOption[];
}

let initialState: IArticlesInitialState = {
  articlesArr: null,
  filteredArticlesArr: [],
  filterOptions:{
    language:[],
    region: [],
    topic: []
  },
  sortOptions: [],
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
    },
    // filterArticles: (state, action: any) => {
    //   const { searchValue, region, topic, language, OrederBy } = action.payload;
    //   state.filteredArticlesArr = state.articlesArr.filter((article: any) => {
    //     for (let key in article) {
    //       if (
    //         (article.Tags[0].Value == language || language == 'All Languages')
    //         &&
    //         (article.Tags[1].Value == region || region == 'Worldwide')
    //         &&
    //         (article.Tags[2].Value == topic || topic == 'All Topics')
    //         &&
    //         article.Title.toLowerCase().includes(searchValue.toLowerCase())
    //       ) {
    //         return article
    //       }
    //     }
    //   }
    //   );
    // }
  },
});

export const { toggleHotCount, toggleBookmarkCount, getArticlesStart, getArticlesSuccess, getArticlesFailure, getArticle, getClaimReviewStart, getClaimReviewSuccess, getClaimReviewFailure } = articleSlice.actions;


export const articlesArrSelector = (state: RootState) => state.articles.articlesArr;
export const articlesLoadingSelector = (state: RootState) => state.articles.loading;
export const articleSelector = (state: RootState) => state.articles.article;
export const claimSelector = (state: RootState) => state.articles.claim;
export const errorMessageSelector = (state: RootState) => state.articles.errorMessage;
export const claimReviewJobTitlesSelector = (state: RootState) => state.articles.claim.Infos[0].JobTitles;
export const filterAndSortOptionsSelector = (state: RootState) => {

  return {
    sortOptions: state.articles.sortOptions,
    filterOptions:  state.articles.filterOptions
  }
}


export default articleSlice.reducer;
