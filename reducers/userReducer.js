import ls from 'local-storage'

const initialState = {
  isLogged: "asdasdasd",
  hasLogged: ls.get('key')
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'CLEAR_COMPLETED':
      return state

    default:
      return state
  }
}
