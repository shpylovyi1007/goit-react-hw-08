export const selectLoggedIn = (state) => state.auth.isLoggedIn;
export const selectRefreshing = (state) => state.auth.isRefreshing;
export const selectUserName = (state) => state.auth.user.name;