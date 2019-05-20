import {ADD_ITEM, LOADING, REMOVE_ITEM} from "../actions/actionTypes";

const initialState = {
    loading: true,
};

const reducer = (state = initialState, action) => {
  switch(action.type){
      case ADD_ITEM:
        return {
            ...state,
            count: state.count + 1
        };
      case REMOVE_ITEM:
          return {
              ...state,
              count: state.count - 1
          };
      case LOADING:
          return {
              ...state,
              count: state.count - 1
          };


      default:
          return state;
  }
};

export default reducer;
