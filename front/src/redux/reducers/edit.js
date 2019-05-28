const initState = {
    data:null,
    isLoading:false,
    error: null
};
const edit = (state=initState, action) => {
    switch(action.type) {
        case "EDIT_USER_DATA":
          return {
            ...state,
            isLoading: true
          }
    
        case "EDIT_USER_DATA_SUCCESS":
          return {
              ...state,
            isLoading: false,
            data: action.data,
              
          };
    
        case "EDIT_USER_DATA_FAIL":
          return {
            ...state,
            isLoading: false,
            error: action.error
          };
       
        default:
          return state;
      }
}
export default edit;