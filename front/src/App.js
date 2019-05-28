import React from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from "react-redux";
import axios from "axios"
import Panel from "./panel/panel";
import CreateUser from "./createUser/createUser"
import{getMatchedData} from "./redux/actions/user"
import {createUser}  from "./redux/actions/createU"
import {BrowserRouter,Route,withRouter,br}from "react-router-dom"
import EditUser from "./editUser/editUser"

class App extends React.Component {
  
  
  handleDelete =(id)=> {
    console.log(id);
    axios.delete(`http://localhost:5000/api/deleteUser/${id}`)
    .then(res=> {
      console.log(res.data.message);
    })
    .catch(err => {
      console.log(err);
    });
    this.props.getUserList();
    alert("deleted Successfuly");
    window.location.reload();
  }

  render() {
    
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact={true} path="/" render={(props) => <Panel {...props} handleDelete={this.handleDelete} />}/>
          <Route path="/createUser" render ={(props)=><CreateUser {...props}  />}/>
          <Route path ="/editUser/:id" render = {(props)=> <EditUser {...props} users={this.props.userList} />}/>
        </div>
      </BrowserRouter>
      
    );
  }

  
  
}
const mapStateToProps = state =>{
  return {
    userList: state.user.data,
    isLoading: state.user.isLoading,
    create: state.create,
    edit: state.edit
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getUserList: (callback) => {
      dispatch(getMatchedData(callback));
    }

  };
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
