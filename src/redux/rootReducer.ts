import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './Slices/UserSlice';
import settingsReducer from './Slices/SettingsSlice';
import articleReducer from './Slices/ArticleSlice';
import claimReviewReducer from './Slices/claim-review-slice';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  articles: articleReducer,
  claimReview: claimReviewReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
