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
  switch (action.type) {
    case 'RESIDENT_FORM_SUBMIT':
      state.formError = {};
      return state
    case 'RESIDENT_FORM_ERROR':
      state.formError = action.data;
      return state
    case 'SET_BARANGAY':
      state.barangays = action.data;
      return state
    case 'SET_RESIDENT':
      state.selectedResident = action.data;
      return state
    case 'SET_RESIDENT_FORM_STATUS':
      state.formStatus = action.data;
      return state
    case 'SET_RESIDENT_FORM_TYPE':
      state.formType = action.data;
      return state
    case 'SET_INITIAL_STATE':
      state = initialState();
      return state
    default:
      return state
  }
}
