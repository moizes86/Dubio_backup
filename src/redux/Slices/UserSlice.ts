import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, refreshLogin, register } from '../../services/APIServices/UserApi';
import { RootState } from '../rootReducer';
import { AppThunk } from '../store';

interface IUserInitialState {
  isLoggedIn: boolean;
  loading: boolean;
  errorMassage: string;
  isRegistrationSuccesses: boolean;
}

let initialState: IUserInitialState = {
  isLoggedIn: false,
  loading: false,
  errorMassage: '',
  isRegistrationSuccesses: false
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
      state.errorMassage = '';

    },
    loginFailure(state) {
      state.loading = false;
      state.errorMassage = 'User name or Password are incorrect';
    },
    logOut(state){
      state.isLoggedIn = false;
    },
    startRegister(state){
      state.loading = true;
      state.errorMassage = '';
    },
    registerSuccesses(state, action: PayloadAction<any>) {
      state.loading = false;
      state.isRegistrationSuccesses = true;
      state.errorMassage = 'Sign up was successful.\n You can now sign in with you credentials!';

    },
    registerFailure(state) {
      state.loading = false;
      state.isRegistrationSuccesses = false;
      state.errorMassage = 'Registration failed';
    },
  },
});

export const { 
  startLogin, 
  loginSuccesses, 
  loginFailure, 
  logOut, 
  startRegister,
  registerSuccesses,
  registerFailure
 } = userSlice.actions;
export default userSlice.reducer;

export const loginThunk = (name: string, password: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(startLogin());
    const response = await login(name, password);
    const {AccessToken, RefreshToken} =  response.data;
    saveLoginToLocalStorage(AccessToken, RefreshToken);
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


export const refreshLoginThunk = (): AppThunk => async (
  dispatch
) =>{  
  const refreshToken = localStorage.getItem('refresh-token')?.toString();
  console.log("refreshToken:", refreshToken);

  if(refreshToken){
    try{
      dispatch(startLogin());
      const response = await refreshLogin(refreshToken);
      const {AccessToken, RefreshToken} =  response.data;
      saveLoginToLocalStorage(AccessToken, RefreshToken)
      dispatch(loginSuccesses(response));   
    }catch(err){
      dispatch(loginFailure())
    }
  }
}

export const registerUserThunk = (name: string, password: string, email: string): AppThunk => async (
  dispatch
) =>{
  try {
    dispatch(startRegister());
    const response = await register(name, password, email);
 
    dispatch(registerSuccesses(response));    
  } catch (err) {
    dispatch(registerFailure())
  }
  }


const saveLoginToLocalStorage = (accessToken: string ,refreshToken: string) => {
  localStorage.setItem('access-token', accessToken);
  localStorage.setItem('refresh-token', refreshToken);
  localStorage.setItem('last-login', Date.now().toString());
}


export const isLoggedSelector = (state: RootState) => state.user.isLoggedIn; 
export const errorMassage = (state: RootState) => state.user.errorMassage; 
export const registrationSuccesses = (state: RootState) => state.user.isRegistrationSuccesses; 
