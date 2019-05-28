import axios from "axios"
const getMatchedRequest = ()=>{
    return {
        type: "GET_MATCHED_DATA_REQUEST"
    };
}
const getMatchedSuccess = (data)=> {
    return {
        type: "GET_MATCHED_DATA_SUCCESS",
        data: data
    }
}
const getMatchedFail = (err)=> {
    return {
        type: "GET_MATCHED_DATA_FAIL",
        error: err
    };
}

export const getMatchedData =(callback) =>{
    return (dispatch) => {
        dispatch(getMatchedRequest());
        axios.get("http://localhost:5000/api/getall")
    .then(res=> {
      dispatch(getMatchedSuccess(res.data.data));
      callback();
      console.log(res.data.data);
    })
    .catch(err => {
      dispatch(getMatchedFail(err));
    });
    }
}