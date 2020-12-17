import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getPageSettings,
  getTagsSettings,
} from '../../services/APIServices/SettingsApi';
import { AppThunk } from '../store';

interface IUserInitialState {
  pageSettings: any;
  tagsSettings: any;
  loading: boolean;
  errorMassage: string;
}

let initialState: IUserInitialState = {
  pageSettings: null,
  tagsSettings: null,
  loading: false,
  errorMassage: '',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    startLoadingSettings(state) {
      state.loading = true;
      state.errorMassage = '';
    },
    loadingSettingsSuccesses(state, action: PayloadAction<any>) {
      state.loading = false;
      state.pageSettings = action.payload.pageSettings;
      state.tagsSettings = action.payload.tagsSettings;
    },
    loadingSettingsFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.errorMassage = action.payload;
    },
  },
});

export const {
  startLoadingSettings,
  loadingSettingsSuccesses,
  loadingSettingsFailure,
} = settingsSlice.actions;
export default settingsSlice.reducer;

export const getSettings = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoadingSettings());
    const [pageSettings, tagsSettings] = await Promise.all([
      getTagsSettings(),
      getPageSettings(),
    ]);

    // dispatch(loadingSettingsSuccesses({ name: 'bhb' }));
    // dispatch(loginFailure('1233'));
  } catch (err) {}
};

// export const isLoggedSelector = (state: RootState) => state.user.userData;
