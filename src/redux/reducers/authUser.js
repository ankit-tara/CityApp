import { USER_LOGIN, USER_LOGOUT } from "../actions/authUser";
let initial_state = {
  token: "",
  user_id: ""
};
export default (state = initial_state, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return action.authUser;

    case USER_LOGOUT:
      return initial_state;

    default:
      return state;
  }
};
