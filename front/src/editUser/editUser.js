import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import isNumeric from "../createUser/createUser"
import {editUser} from "../redux/actions/editU"
class EditUser extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            id:"",
            firstName:"",
            lastName:"",
            sex:"",
            age:"",
            password:"",
            user:null,
            flag:false
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleEditUser =this.handleEditUser.bind(this);
    }
    componentDidMount() {
        const users = this.props.users;
        const id = this.props.match.params.id;
        
        const user = users.find(u => {return u._id === id});
        this.setState({user:user});
        this.setState({id:id});
    }
    handleChange (e){
        const {firstName,lastName,sex,age} = this.state;
        if (!firstName|| !lastName|| !sex || !age) {
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
    handleEditUser() {
        const {id,firstName,lastName,sex,age,password,user} = this.state;
        let tmpUser = {id,firstName,lastName,sex,age};
        this.props.editU(tmpUser);
       
        
 
    }
    render(){
        const {firstName,lastName,sex,age,password,user} = this.state;
        return (
            
            <div className ="create-panel">
                {!user ?<div>nothing</div>:
                <form className= "submit-form" onSubmit={this.handleEditUser}>
                    <div className ="create-title"> Edit  User:</div>
                    <div className = "create-input"  >First Name: <input name ="firstName" value={this.state.firstName} onChange ={this.handleChange} placeholder={user.firstName} /></div>
                    <div className = "create-input"  >Last Name: <input name = "lastName" value = {this.state.lastName} onChange ={this.handleChange} placeholder={user.lastName}/></div>
                    <div className = "create-input"  >Sex: 
                        <select value={this.state.sex} onChange={this.handleChange} name="sex">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className = "create-input"  > Age: <input name = "age" value = {this.state.age}  onChange ={this.handleChange}placeholder={user.age}/></div>
                    <div className = "create-input"  >Password: <input name ="password" type= "password" value = {this.state.password}  onChange ={this.handleChange}/></div>
                    <div className = "create-input"><button className="btn btn-success btn-back" type = "submit"value ="Submit" disabled ={!this.state.flag}>Submit</button></div>
                    
    
                </form>}
                <div className = "create-input"><Link className="btn btn-warning btn-back" to ="/"> {"<"} Back</Link></div>
                
    
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
      userList: state.user,
      create: state.create,
      edit: state.edit
    };
  }
  const mapDispatchToProps = dispatch => {
    return {
      editU: (user) => {
        dispatch(editUser(user));
      }
      
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(EditUser);