export const getIsAuth = (state) => state.auth.isAuth;
export const getUserImageURL = (state) => state.auth.userProfile.photoURL;
export const getDisplayName = (state) => state.auth.userProfile.displayName;
export const getUserProfile = (state) => state.auth.userProfile;
export const getAuthIsPending = (state) => state.auth.isPending;

export const getAuth = (state) => state.auth;
