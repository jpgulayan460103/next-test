import ls from 'local-storage'

const initialState = () => {
  return {
    formData: {},
    formError: {},
    user: {},
    barangays: {},
    formType: "create",
    formStatus: "hide",
    selectedResident: {},
  }
}

export default function residentReducer(state = initialState(), action) {
  let newState = {};
  switch (action.type) {
    case 'RESIDENT_FORM_SUBMIT':
      newState = {
        ...state,
        formError: {}
      };
      break;
    case 'RESIDENT_FORM_ERROR':
      newState = {
        ...state,
        formError: action.data
      };
      break;
    case 'SET_BARANGAY':
      newState = {
        ...state,
        barangays: action.data
      };
      break;
    case 'SET_RESIDENT':
      newState = {
        ...state,
        selectedResident: action.data
      };
      break;
    case 'SET_RESIDENT_FORM_STATUS':
      newState = {
        ...state,
        formStatus: action.data
      };
      break;
    case 'SET_RESIDENT_FORM_TYPE':
      newState = {
        ...state,
        formType: action.data
      };
      break;
    case 'SET_INITIAL_STATE':
      newState = initialState();
      break;
    default:
      return state
      break;
  }
  return newState;
}
