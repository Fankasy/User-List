const initState = {
    data:null,
    isLoading:false,
    error: null
};
const create = (state=initState, action) => {
    switch(action.type) {
      case "CREATE_USER_DATA":
        return {
          ...state,
          isLoading: true
        }
  
      case "CREATE_USER_DATA_SUCCESS":
        return {
            ...state,
          isLoading: false,
          data: action.data,
            
        };
  
      case "CREATE_USER_DATA_FAIL":
        return {
          ...state,
          isLoading: false,
          error: action.error
        };
  
      default:
        return state;
    }
  };
export default create;