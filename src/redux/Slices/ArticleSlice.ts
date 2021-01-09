import { createSlice } from "@reduxjs/toolkit";
import { filterItem, IArticleFilter } from "../../Interfaces/IArticleFilter";
import { ISelectOption } from "../../Interfaces/ISelectOption";
import { getArticlesAsync, postBookmarkClaim, postVoteClaim } from "../../services/APIServices/ArticlesApi";
import { RootState } from '../rootReducer';
import { AppThunk } from "../store";

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
    },
    toggleClaimVote: (state, action: any)=>{
      const { articleIndex, claimIndex} = action.payload
      const newArticlesArr = state.articlesArr;
      
      newArticlesArr[articleIndex].Claims[claimIndex].IsVoted = !newArticlesArr[articleIndex].Claims[claimIndex].IsVoted;
      state.articlesArr = newArticlesArr;
    },
    toggleBookmarkVote: (state, action: any)=>{
      const { articleIndex, claimIndex} = action.payload
      const newArticlesArr = state.articlesArr;
      
      newArticlesArr[articleIndex].Claims[claimIndex].IsBookmarked = !newArticlesArr[articleIndex].Claims[claimIndex].IsBookmarked;
      state.articlesArr = newArticlesArr;
    },
  

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
  addOneToPageNumber,
  toggleClaimVote,
  toggleBookmarkVote } = articleSlice.actions;


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


interface IGetArticlesBody {
  PageSize: number;
  PageNumber?: number;
  Tags?: {Name: string; Value: string}[];
  SearchText?: string;
  SortBy?: string;
}

export const getArticles = (): AppThunk => async (dispatch, getState) => {

      const url = `https://api.dubioo.com/api/Page/Dashboard`;
      const body: IGetArticlesBody = { 
          PageSize: 10
      }

      // Create the tags array for the server request 
      const state = getState();
      const {filterObject, sortBy, searchValue, pageNumber} = state.articles;
      if(filterObject){
          let TagsArray: {Name: string, Value: string}[] = []
         Object.keys(filterObject).forEach((propertyName): void => {
             if(filterObject[propertyName as filterItem]){
                 TagsArray.push({Name: propertyName.charAt(0).toUpperCase() + propertyName.slice(1), Value: filterObject[propertyName as filterItem]})
             }
          });

          body.Tags = TagsArray;
      }
      if(sortBy){
          body.SortBy = sortBy; 
      }
      if(searchValue){
          body.SearchText = searchValue;
      }
      // if(pageNumber){
      //     body.PageNumber = pageNumber;
      // }

      try {
          dispatch(getArticlesStart());
          const result = await getArticlesAsync(url, body);
          dispatch(getArticlesSuccess(result.data));
      } catch (error) {
          dispatch(getArticlesFailure(error))
      }

  // } else {
  //     getDataFromLocalStorage(dispatch, dataType);
  // }
};

export const voteClaimThunk = (claimId: number, articleIndex: number, claimIndex: number ): AppThunk => async (dispatch, getState) => {
  try {
    const result = await postVoteClaim(claimId);
    console.log("result:", result);
    
    if(result.status === 200){
      dispatch(toggleClaimVote({articleIndex, claimIndex }))
    }
  } catch (error) {
    
  }
  
}

export const bookmarkClaimThunk = (claimId: number, articleIndex: number, claimIndex: number ): AppThunk => async (dispatch, getState) => {
  try {
    const result = await postBookmarkClaim(claimId);
    console.log("result:", result);
    
    if(result.status === 200){
      dispatch(toggleBookmarkVote({articleIndex, claimIndex }))
    }
  } catch (error) {
    
  }
  
}