import axios from "axios";
const editRequest  =() => {
    return {
        type: "EDIT_USER_DATA"
    };
}
const editUserSuccess = (data)=> {
    return {
        type:"EDIT_USER_DATA_SUCCESS",
        data: data
    };
}
const editUserFail = (err) => {
    return {
        type:"EDIT_USER_DATA_FAIL",
        error : err
    };
}

export  const editUser = (user) => {
    return (dispatch)=> {
        dispatch (editRequest());
        axios.post("http://localhost:5000/api/editUser",{user:user})
        .then (res=> {
            dispatch( editUserSuccess(res.data.user));
            console.log(res.data);
        })
        .catch (err => {
            dispatch(editUserFail(err));
            console.log(err);
            
        });
    }
}
