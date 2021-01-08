import { createSlice } from "@reduxjs/toolkit";
import { IArticleFilter } from "../../Interfaces/IArticleFilter";
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
    languages:ISelectOption[],
    regions: ISelectOption[],
    topics: ISelectOption[]
  };
  filterObject: IArticleFilter;
  sortOptions: ISelectOption[];
  sortBy: string;
  searchValue: string;
  pageNumber: number;
}

let initialState: IArticlesInitialState = {
  articlesArr: null,
  filteredArticlesArr: [],
  filterOptions:{
    languages:[],
    regions: [],
    topics: []
  },
  filterObject: {
    region: "",
    topic: "",
    language: "",
  },
  sortOptions: [],
  sortBy: "Magic",
  claimsArr: [],
  loading: false,
  errorMessage: '',
  article: null,
  claim: null,
  searchValue: '',
  pageNumber: 0
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
        languages: serverOptionsToAntOptions(action.payload.Filter.Language, "All Languages"),
        regions: serverOptionsToAntOptions(action.payload.Filter.Region, "Worldwide" ),
        topics: serverOptionsToAntOptions(action.payload.Filter.Topic, "All Topics"),
      };
      state.filterOptions = filterOptions;
      state.sortOptions = serverOptionsToAntOptions(action.payload.Sort.Sort, "Magic");
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
    setFiltersInStore: (state, action: any) => {
      state.filterObject = action.payload.filterObject;
      state.sortBy = action.payload.sortBy;
      state.searchValue = action.payload.searchValue; 
    },
    addOneToPageNumber: (state) =>{
      console.log(' state.pageNumber:',  state.pageNumber);
      
      state.pageNumber = state.pageNumber + 1
    },
    resetPageNumber: (state) => {
      state.pageNumber = 0;
    }
  

  },
});

export const {  
  toggleHotCount,
  toggleBookmarkCount,
  getArticlesStart, 
  getArticlesSuccess, 
  getArticlesFailure, 
  getArticle, 
  getClaimReviewStart, 
  getClaimReviewSuccess, 
  getClaimReviewFailure, 
  setFiltersInStore, 
  addOneToPageNumber } = articleSlice.actions;


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
