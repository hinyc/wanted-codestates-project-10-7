const ADD_SUBMIT_DATA = 'submit/ADD_SUBMIT_DATA';
const INIT_SUBMIT_DATA = 'submit/INIT_SUBMIT_DATA';

export const addSubmitData = (key, value) => ({
  type: ADD_SUBMIT_DATA,
  key,
  value,
});
export const initSubmitData = (key, value) => ({ type: INIT_SUBMIT_DATA });

const initialState = {
  name: null,
  phone: null,
  address: null,
  agreement_0: null,
};

export default function submit(state = initialState, action) {
  switch (action.type) {
    case ADD_SUBMIT_DATA:
      return {
        ...state,
        [action.key]: action.value,
      };
    case INIT_SUBMIT_DATA:
      return {
        ...state,
        name: null,
        phone: null,
        address: null,

        agreement_0: null,
      };
    default:
      return state;
  }
}
