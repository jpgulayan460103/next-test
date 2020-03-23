import ls from 'local-storage'

const initialState = () => {
  return {
    formData: {},
    formError: {},
    user: {},
  }
}

export default function user(state = initialState(), action) {
  switch (action.type) {
    case 'RESIDENT_FORM_SUBMIT':
      return state
    case 'RESIDENT_FORM_ERROR':
      state.formError = action.data;
      return state

    default:
      return state
  }
}
