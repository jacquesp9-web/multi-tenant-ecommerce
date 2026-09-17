import { authApi, type loginPayload, type loginResponse } from "@/api/auth";
import { getAxiosErrorMessage } from "@/lib/api.error";
import { storage } from "@/lib/storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  status?: string;
  profile_picture: string;
  avatarName: string;
  twoFactorEnabled?: boolean;
  twoFactorSecret?: boolean;
  userType?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AsyncStatus =
  | "idle"
  | "pending"
  | "succeeded"
  | "failed"
  | "loading";

export type USER_TYPE =
  | "CUSTOMER"
  | "SELLER"
  | "PLATFORM_ADMIN"
  | "DELIVERY_AGENT";

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  userType: USER_TYPE;
  status: AsyncStatus;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: storage.getAccessToken(),
  refreshToken: storage.getRefreshToken(),
  userType: "PLATFORM_ADMIN",
  status: "idle",
  error: null,
};
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

/* login */
export const fetchLogin = createAsyncThunk(
  "auth/login",
  async (payload: loginPayload, { rejectWithValue }) => {
    try {
      const tokens = await authApi.login(payload);
      storage.setToken(tokens.accessToken, tokens.refreshToken);

      return tokens;
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, "User Could Not Sign In"),
      );
    }
  },
);
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

/* user account information me */
export const fetchMe = createAsyncThunk(
  "auth/me",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authApi.me();
      return data;
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, "Failed to getch User Information"),
      );
    }
  },
);
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

/* user account logout */
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.logout();
      return data;
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, "Failed to Logout User Account"),
      );
    }
  },
);
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

/* user account update information */
export const updateCurrentUser = createAsyncThunk(
  "auth/updateCurrentUser",
  async (payload: Partial<IUser>, { rejectWithValue }) => {
    try {
      const data = await authApi.updateCurrentUser(payload);

      return data;
    } catch (error) {
      return rejectWithValue(
        getAxiosErrorMessage(error, "Failed to Update User Information"),
      );
    }
  },
);
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.userType = action.payload.userType;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.accessToken = null;
        state.refreshToken = null;
        state.userType = "PLATFORM_ADMIN";
      })
      /* ------------------------------------------------------------------------------------------------------------------------------ */
      /* ------------------------------------------------------------------------------------------------------------------------------ */

      /* Fetching the Current User Information */
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
        state.user = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = {
          ...action.payload,
          avatarName: `${action.payload?.fullName?.split(" ")?.[0]?.[0] ?? ""}${action.payload?.fullName?.split(" ")?.[1]?.[0]}`,
        };
      })
      .addCase(fetchMe.rejected, (state) => {
        state.status = "failed";
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        storage.clear();
      })
      /* ------------------------------------------------------------------------------------------------------------------------------ */
      /* ------------------------------------------------------------------------------------------------------------------------------ */

      /* user account logout */
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = null;

        storage.clear();
      })
      .addCase(logoutUser.rejected, (state, actionPayload) => {
        state.status = "idle";
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = actionPayload.payload as string;
        storage.clear();
      })
      /* ------------------------------------------------------------------------------------------------------------------------------ */
      /* ------------------------------------------------------------------------------------------------------------------------------ */

      /* user account update information */
      .addCase(updateCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = {
          ...state.user!,
          fullName: action?.payload?.fullName,
          email: action?.payload?.email,
          phone: action?.payload?.phone,
          avatarName: `${action.payload?.fullName?.split(" ")?.[0]?.[0] ?? ""}${action.payload?.fullName?.split(" ")?.[1]?.[0]}`,
        };
      })
      .addCase(updateCurrentUser.rejected, (state) => {
        state.status = "failed";
      });
    /* ------------------------------------------------------------------------------------------------------------------------------ */
    /* ------------------------------------------------------------------------------------------------------------------------------ */
  },
});

export default authSlice.reducer;
