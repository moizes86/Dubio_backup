import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from '../../services/APIServices/UserApi';
import { RootState } from '../rootReducer';
import { AppThunk } from '../store';

interface IUserInitialState {
  isLoggedIn: boolean;
  loading: boolean;
  errorMassage: string;
}

let initialState: IUserInitialState = {
  isLoggedIn: false,
  loading: false,
  errorMassage: '',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    startLogin(state) {
      state.loading = true;
      state.errorMassage = '';
    },
    loginSuccesses(state, action: PayloadAction<any>) {
      state.loading = false;
      state.isLoggedIn = !!action.payload.data;
    },
    loginFailure(state) {
      state.loading = false;
      state.errorMassage = 'User name or Password are incorrect';
    },
    logOut(state){
      state.isLoggedIn = false;
    }
  },
});

export const { startLogin, loginSuccesses, loginFailure, logOut } = userSlice.actions;
export default userSlice.reducer;

export const loginThunk = (name: string, password: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(startLogin());
    const response = await login(name, password);
    localStorage.setItem('access-token', response.data.AccessToken);
    localStorage.setItem('refresh-token', response.data.RefreshToken);
    localStorage.setItem('last-login', Date.now().toString());
    dispatch(loginSuccesses(response));    
  } catch (err) {
    dispatch(loginFailure())
  }
};

export const logoutThunk = (): AppThunk => async (
  dispatch
) =>{
  dispatch(logOut());
  localStorage.removeItem('access-token');
  localStorage.removeItem('refresh-token');
}


export const isLoggedSelector = (state: RootState) => state.user.isLoggedIn; 
export const errorMassage = (state: RootState) => state.user.errorMassage; 
