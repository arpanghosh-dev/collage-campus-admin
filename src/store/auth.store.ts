import { createSlice } from "@reduxjs/toolkit";

interface IAuthType {
  isLoggedIn: boolean;
}
const initialState: IAuthType = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    testLogin: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
  extraReducers: () => {},
});

export const { testLogin } = authSlice.actions;
export { authSlice };
export default authSlice.reducer;
