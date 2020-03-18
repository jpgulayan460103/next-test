import ls from 'local-storage'

const initialState = {
  isLogged: false,
  accessToken: "",
  user: {},
}

const userLoginDetail = (state) => {
  state.isLogged = true;
  state.user = ls('user').user;
  state.accessToken = ls('user').access_token;
  return state;
}

export default function user(state = initialState, action) {
  if(ls('user') != null){
    state = userLoginDetail(state);
  }
  switch (action.type) {
    case 'USER_LOGIN_SUCCESSFUL':
      ls.set('user',action.data);
      state = userLoginDetail(state);
      return state
    case 'USER_LOGIN_FAILED':
      ls.remove('user')
      state = initialState;
      return state

    default:
      return state
  }
}
