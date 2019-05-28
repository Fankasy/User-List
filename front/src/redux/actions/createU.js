import axios from "axios";
const createRequest  =() => {
    return {
        type: "CREATE_USER_DATA"
    };
}
const createUserSuccess = (data)=> {
    return {
        type:"CREATE_USER_DATA_SUCCESS",
        data: data
    };
}
const createUserFail = (err) => {
    return {
        type:"CREATE_USER_DATA_FAIL",
        error : err
    };
}
export const createUser = (user) => {
    return (dispatch)=> {
        dispatch (createRequest());
        axios.post("http://localhost:5000/api/createUser",{"user": user})
        .then (res=> {
            dispatch( createUserSuccess(res.data));
            console.log(res.data);
        })
        .catch (err => {
            dispatch(createUserFail(err));
            console.log(err);
            
        });
    }
}