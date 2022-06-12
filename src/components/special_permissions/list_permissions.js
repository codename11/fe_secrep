import { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import { modalShow } from "../../actions/modalActions";
import { modalHide } from "../../actions/modalActions";
import Table from 'react-bootstrap/Table';
import CustomModal from '../subcomponents/CustomModal';
import UpdatePermission from './update_permission';
import DeletePermission from './delete_permission';

class ListPermissions extends Component {

    constructor(props) {

        super(props);
        this.state = {
          
        };

    }

    componentDidMount(){
      
      

    }

    render() {
      
      let listPermissions = this.props && this.props.list_permissions ? this.props.list_permissions : null;
      
      let chosen_permission = this.props && this.props.list_permissions && this.props.list_permissions.length > 0 && this.props.itemId ? this.props.list_permissions.find((item, i) => {
        return this.props.itemId===item.id;
      }) : null;

      let permissions_thead = <tr>
        <th>Name</th>
        <th>Description</th>
        <th>SecOficials</th>
        <th>Employees</th>
        <th>Vehicles</th>
        <th>actions</th>
        </tr>;

      let thead = <thead>{permissions_thead}</thead>;
      
      let permissions_tbody = listPermissions && listPermissions.length>0 ? listPermissions.map((item, i) => {

        return <tr key={item && item.id ? item.id : null}>
            <td>{item && item.permission_name}</td>
            <td>{item && item.permission_description ? item.permission_description : null}</td>
            <td>{item && item.user && item.user.length>0 ? item.user.map((item, i) => {
              return item.name;
            }).toString(): null}</td>
            <td>{item && item.employees && item.employees.length>0 ?item.employees.map((item2, i2) => {
              return item2.lastName+" "+item2.firstName;
            }).toString() : null}</td>
            <td>{item && item.vehicles && item.vehicles.length>0 ? item.vehicles.map((item2, i2) => {
              return item2.registration;
            }).toString() : null}</td>
            <td className="grid-container">
              
              {this.props && this.props.access_token ? 
                <Button variant="outline-warning m-1" itemID={item && item.id ? item.id : null} onClick={() => this.props.modalShow([true, item.id, "update"])}>Update</Button>
              : null}
              
              {this.props && this.props.access_token ? 
                <Button variant="outline-danger m-1" itemID ={item && item.id ? item.id : null} onClick={() => this.props.modalShow([true, item.id, "delete"])}>Delete</Button>
              : null}
    
            </td>
          </tr>
    
        }) : null;
        let tbody = <tbody>{permissions_tbody}</tbody>;

        let modalHeaderText = "";
        let modalBodyText = "";
        let form = null;

        if(this.props && this.props.modal_purpose){

          if(this.props.modal_purpose === "delete"){
    
            let modalHeaderTextDeletePermission = this.props && this.props.modal_purpose && this.props.modal_purpose === "delete" ? "You are trying to delete an item: " : "";
            let modalBodyTextDeletePermission = this.props && this.props.modal_purpose && this.props.modal_purpose === "delete" && chosen_permission ? <div><h6>An permission: </h6> 
              <div>
                <div><strong>Description:</strong> {chosen_permission.permission_description}</div>
                <div><strong>Name:</strong> {chosen_permission.permission_name}</div>
                <div><strong>SecOficials:</strong> {chosen_permission.user.map((item, i) => {
                  return item.name;
                }).toString()}</div>
                <div><strong>Employees:</strong> {chosen_permission.employees.map((item2, i2) => {
                  return item2.lastName+" "+item2.firstName;
                }).toString()}</div>
                <div><strong>Vehicles:</strong> {chosen_permission.vehicles.map((item2, i2) => {
                  return item2.registration;
                }).toString()}</div>
                
              </div>
            </div>
            : "";
            modalHeaderText = modalHeaderTextDeletePermission;
            
            modalBodyText = modalBodyTextDeletePermission;
            form = this.props && this.props.modal_purpose && this.props.modal_purpose==="delete" ? <DeletePermission/> : null;
    
          }
    
          if(this.props.modal_purpose === "update"){
            let modalHeaderTextUpdatePermission = this.props && this.props.modal_purpose && this.props.modal_purpose === "update" ? "You are trying to update an item with an id of "+chosen_permission.id : "";
            modalHeaderText = modalHeaderTextUpdatePermission;
            form = this.props && this.props.modal_purpose && this.props.modal_purpose==="update" ? <UpdatePermission sec_id={this.props.sec_id} chosen_permission={chosen_permission}/> : null;
    
          }
    
        }

        let myModal = this.props && this.props.access_token ? 
          <CustomModal modalheadertext={modalHeaderText} modalbodytext={modalBodyText} form={form} chosen_permission={chosen_permission} show={this.props.modalState} permissionid={this.props.itemId} purpose={this.props.modal_purpose} onHide={() => this.props.modalHide([false])}/> 
        : null;

      return (
        <div className="accord">
          <Table striped bordered hover size="sm" responsive="sm">
            {thead}
            {tbody}
          </Table>
          {myModal}
        </div>
      )
  }
}

modalShow.propTypes = {
  modalShow: PropTypes.func.isRequired,
};

modalHide.propTypes = {
  modalHide: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
      modalState: state.modalState.modalState,
      itemId: state.modalState.itemId,
      modal_purpose: state.modalState.modal_purpose,
    });

};

export default connect(mapStateToProps, { 
  modalShow,
  modalHide
})(ListPermissions);