import ls from 'local-storage'

const initialState = () => {
  return {
    formData: {},
    formError: {},
    formType: "create",
    formStatus: "hide",
    selectedBarangayOfficial: {},
  }
}

export default function residentReducer(state = initialState(), action) {
  let newState = {};
  switch (action.type) {
    case 'BARANGAY_OFFICIAL_FORM_SUBMIT':
      newState = {
        ...state,
        formError: {}
      };
      state.formError = {};
      break;
    case 'BARANGAY_OFFICIAL_FORM_ERROR':
      newState = {
        ...state,
        formError: action.data
      };
      break;
    case 'SET_BARANGAY_OFFICIAL':
      newState = {
        ...state,
        selectedBarangayOfficial: action.data
      };
      break;
    case 'SET_BARANGAY_OFFICIAL_FORM_STATUS':
      newState = {
        ...state,
        formStatus: action.data
      };
      break;
    case 'SET_BARANGAY_OFFICIAL_FORM_TYPE':
      newState = {
        ...state,
        formType: action.data
      };
      break;
    case 'SET_INITIAL_STATE':
      state = initialState();
      break;
    default:
      return state;
      break;
  }
  return newState;
}
