import React from "react"
import { Link} from 'react-router-dom';
import {createUser} from "../redux/actions/createU"
import axios from "axios";
import {connect} from "react-redux";

class CreateUser extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            firstName: "",
            lastName: "",
            sex: "Male",
            age: "",
            password: "",
            repeat:"",
            flag: false
        }
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleCreateUser (){
       
         this.props.createOneUser(this.state);
       
    }
    handleChange (e){
        const {firstName,lastName,sex,age,password,repeat} = this.state;
        if (!firstName|| !lastName|| !sex || !age || repeat !== password) {
           this.setState({flag:false});
        }
        else{
            this.setState({flag:true});
        }
        const target = e.target;
        const name = target.name;
        this.setState({
            [name]:target.value
        });
    }
    render() {

        return (
            <div className ="create-panel">
                <form className= "submit-form" onSubmit={this.handleCreateUser}>
                    <div className ="create-title"> Create New User:</div>
                    <div className = "create-input"  >First Name: <input name ="firstName" value={this.state.firstName} onChange ={this.handleChange}></input></div>
                    <div className = "create-input"  >Last Name: <input name = "lastName" value = {this.state.lastName} onChange ={this.handleChange} ></input></div>
                    <div className = "create-input"  >Sex: 
                        <select value={this.state.sex} onChange={this.handleChange} name= "sex">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className = "create-input"  > Age: <input name = "age" value = {this.state.age}  onChange ={this.handleChange}></input></div>
                    <div className = "create-input"  >Password: <input name ="password" type= "password" value = {this.state.password}  onChange ={this.handleChange}></input></div>
                    <div className = "create-input"  >Repeat: <input name  = "repeat" type ="password" value = {this.state.repeat}  onChange={this.handleChange}></input></div>
                    <div className = "create-input"><button className="btn btn-success btn-back" type = "submit"value ="Submit" disabled ={!this.state.flag}>Submit</button></div>
                    
    
                </form>
                <div className = "create-input"><Link className="btn btn-warning btn-back" to ="/"> {"<"} Back</Link></div>
                
    
            </div>
        );
    }

}

function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}
const mapStateToProps = state =>{
    return {
      userList: state.user,
      create: state.create,
      edit:state.edit
    };
}
  const mapDispatchToProps = dispatch => {
    return {
      createOneUser: (user) => {
        dispatch(createUser(user));
      }
      
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(CreateUser) ;