import { createSlice } from "@reduxjs/toolkit";

import { getArticlesAsync, /*getClaimsAsync*/ } from '../../services/APIServices/ArticlesApi';
import { AppThunk } from '../store';
import { RootState } from '../rootReducer';

import { useDispatch } from 'react-redux';

interface IArticlesInitialState {
  articlesArr: any;
  article: any;
  claimsArr: any;
  loading: boolean;
  errorMessage: string;
}

let initialState: IArticlesInitialState = {
  articlesArr: null,
  claimsArr: [],
  loading: false,
  errorMessage: '',
  article: null,
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
      console.log('GET ARTICLE FIRED')
      const article: any = findArticle(state.articlesArr, action.payload);

      state.article = article;

      return state;
    },
    /*
    getClaimsStart: state=>{
      state.loading = true;
    },
    getClaimsSuccess : (state, action:any)=>{
      state.loading = false;
      // state.claimsArr = action.payload;
    },
    getClaimsFailure : (state, action:any)=> {
      state.loading = false;
      // state.errorMessage = action.payload;
    }
    */
  },
});

export const { toggleHotCount, toggleBookmarkCount, getArticlesStart, getArticlesSuccess, getArticlesFailure, getArticle,  /*getClaimsStart, getClaimsSuccess, getClaimsFailure*/ } = articleSlice.actions;

function findArticle(articlesArr: any, { type, data }: any) {
  switch (type) {
    case 'url':
      return articlesArr.find((article: any) => article.InternalUrl == data)
  }
};

function setArticlesInLocalStorage(articles: any) {
  const articlesToStore = articles.data.Articles;
  return (
    window.localStorage.setItem('Articles', JSON.stringify(articlesToStore))
  )
};

function getArticlesFromLocalStorage(dispatch: any) {
  let articles: any = window.localStorage.getItem("Articles");
  articles = JSON.parse(articles);
  dispatch(getArticlesSuccess(articles));
};

function articlesInLocalStorage() {
  const articlesFromStorage = window.localStorage.getItem("Articles")
  return (
    articlesFromStorage ?
      true :
      false
  )
};



export const getArticles = (): AppThunk => async (dispatch) => {
  const articlesInStorage = articlesInLocalStorage();
  if (!articlesInStorage) {
    const url = `https://api.dubioo.com/api/Page/Dashboard`;
    const body = { "pagesize": 10 };

    try {
      dispatch(getArticlesStart());
      const result = await getArticlesAsync(url, body);
      dispatch(getArticlesSuccess(result.data.Articles));
      setArticlesInLocalStorage(result);
    } catch (error) {
      dispatch(getArticlesFailure(error))
    }

  } else {
    getArticlesFromLocalStorage(dispatch);
  }
};

/*export const getClaims = (): AppThunk => async (dispatch) => {
  try{
    dispatch(getClaimsStart());

    const claimsFromAPI: any = await Promise.resolve(getClaimsAsync());

  }catch (error){ dispatch(getClaimsFailure(error))}
}*/

export const articlesArrSelector = (state: RootState) => state.articles.articlesArr;
export const articlesLoadingSelector = (state: RootState) => state.articles.loading;
export const articleSelector = (state: RootState) => state.articles.article;

export default articleSlice.reducer;
