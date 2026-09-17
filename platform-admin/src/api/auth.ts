import Axios from "@/lib/axios";
import type { IUser, USER_TYPE } from "@/store/auth/authSlice";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

export interface loginPayload {
  email: string;
  password: string;
}

export interface loginResponse {
  accessToken: string;
  refreshToken: string;
  userType: USER_TYPE;
}

interface SuccessResponse {
  success: string;
}
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

/* user account information */
export const authApi = {
  /* user account login */
  login: (payload: loginPayload) =>
    Axios.post<loginResponse>("/auth/login", payload).then((res) => res?.data),

  /* fetcgin user account information */
  me: () => Axios.get<IUser>("/auth/me").then((res) => res?.data),

  /* user account logout */
  logout: () =>
    Axios.post<SuccessResponse>("/auth/logout").then((res) => res?.data),

  /* user account information update */
  updateCurrentUser: (payload: Partial<IUser>) =>
    Axios.put<IUser>("/users/me", payload).then((res) => res?.data),
};
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */
