export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export const userLogin = authUser => ({
  type: USER_LOGIN,
  authUser: authUser
});

export const userLogout = () => ({
  type: USER_LOGOUT
});
