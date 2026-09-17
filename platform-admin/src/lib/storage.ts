export const LOCAL_STORAGE_FIELDS = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
} as const;

export const storage = {
  /* fetching user account tokens */
  getAccessToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_FIELDS.ACCESS_TOKEN);
  },
  getRefreshToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_FIELDS.REFRESH_TOKEN);
  },

  /* setting user account tokens */
  setToken(accessToken: string, refreshToken: string) {
    localStorage.setItem(LOCAL_STORAGE_FIELDS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(LOCAL_STORAGE_FIELDS.REFRESH_TOKEN, refreshToken);
  },

  /* clear user account tokens */
  clearField(field: string) {
    localStorage.removeItem(field);
  },
  clear(): void {
    localStorage.clear();
  },
};
