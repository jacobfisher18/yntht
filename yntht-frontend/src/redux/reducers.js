import { SET_ACTIVE_TAB } from './actionTypes';
import { PAGES } from '../utilities/constants';

const initialState = {
  activeTab: PAGES.MY3.name,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return { ...state, activeTab: action.tab };
    default:
      return state;
  }
};
