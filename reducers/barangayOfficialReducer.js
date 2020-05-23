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
  switch (action.type) {
    case 'BARANGAY_OFFICIAL_FORM_SUBMIT':
      state.formError = {};
      return state
    case 'BARANGAY_OFFICIAL_FORM_ERROR':
      state.formError = action.data;
      return state
    case 'SET_BARANGAY_OFFICIAL':
      state.selectedBarangayOfficial = action.data;
      return state
    case 'SET_BARANGAY_OFFICIAL_FORM_STATUS':
      state.formStatus = action.data;
      return state
    case 'SET_BARANGAY_OFFICIAL_FORM_TYPE':
      state.formType = action.data;
      return state
    case 'SET_INITIAL_STATE':
      state = initialState();
      return state
    default:
      return state
  }
}
