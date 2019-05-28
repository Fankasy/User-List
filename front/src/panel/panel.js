import React from "react"
import { Link} from 'react-router-dom';
import { tsImportEqualsDeclaration } from "@babel/types";
import {connect} from "react-redux";
import{getMatchedData} from "../redux/actions/user";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import EnhancedTable from  "./enhanceTable";



class Panel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            matchtext:null,
             userList: null,
             isLoading:true
        };
        
    
    }
    componentDidMount() {
        this.props.getUserList(()=> {
            this.setState({userList: this.props.userList});
            this.setState({isLoading: this.props.isLoading});
        });
    }

    handleInput =e => {
        
        this.setState({
           userList: this.props.userList.filter(user => {
               return (user.firstName.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1) ||
                (user.lastName.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1) ||
                (user.sex.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1) ||
                (String(user.age).toUpperCase().indexOf(e.target.value.toUpperCase()) > -1);
           })
        })
    }

   
    render(){
        const {matchtext,userList,isLoading} = this.state;
        console.log(userList);
        return (
        
         
            <div className = "panel">
                <div className = "panel-title"> Users</div>
                <div id="input"><input value={matchtext} onChange = {this.handleInput}></input> <button type="button" className = "btn btn-primary" id ="clear">Clear</button></div>
                    
                    {isLoading ? <div>nothing</div> :
                    <div className = "tb"> 
                    <EnhancedTable rows = {userList} handleDelete = {this.props.handleDelete}/>
                        {/* <table className="table table-striped " data= {userList}>
                            <thead>
                                <tr>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Sex</th>
                                    <th>Age</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                
                                {userList.map((user,index)=> {
                                    return (
                                        <tr key = {index} className="table-row">
                                            <td><Link className ="btn btn-info" id ="edit" to= {`/editUser/${user._id}`}><i className="fas fa-pencil-alt"></i>Edit</Link></td>
                                            <td><button className ="btn btn-danger" id ="delete" onClick ={()=> this.props.handleDelete(user._id)}>Delete</button></td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.sex}</td>
                                            <td>{user.age}</td>
                                        </tr>
                                    );
                                }) }
                                
                            </tbody>
                        </table> */}



                        
                    </div>}
                    <Link to ="/createUser" className="btn btn-success" id ="create-button">Create New User</Link>
                    
            </div>
        );
    }
}



const mapStateToProps = state=> {
    return {
        userList: state.user.data,
        isLoading: state.user.isLoading
    }
}
const mapDispatchToProps = dispatch=> {
    return {
        getUserList: (callback) => {
            dispatch(getMatchedData(callback));
          }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Panel);