import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  userId: null,
  allUserData: '',
  userRole: '',
};

export const authDataSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    saveAuthData: (state, action) => {
      state.accessToken = action.payload.accessToken || '';
      state.userId = action.payload.userData._id || null;
      state.allUserData = action.payload.userData || null;
      state.userRole = action.payload.userRole || '';
    },
    deleteAuthData: (state) => {
      state.accessToken = undefined;
      state.userId = undefined;
      state.allUserData = undefined;
      state.userRole = undefined;
    },
  },
});

export const { saveAuthData, deleteAuthData } = authDataSlice.actions;

export default authDataSlice.reducer;