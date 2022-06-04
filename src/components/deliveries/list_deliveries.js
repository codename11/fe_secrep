import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import CustomModal from '../subcomponents/CustomModal';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import { modalShow } from "../../actions/modalActions";
import { modalHide } from "../../actions/modalActions";
import DeleteDelivery from '../deliveries/delete_delivery';

class ListDeliveries extends Component {
  
  render() {
    console.log("list_deliveries: ", this.props);

    let list_deliveries = this.props && this.props.list_deliveries ? this.props.list_deliveries : null;

    let chosen_delivery = this.props && this.props.list_deliveries && this.props.list_deliveries.length > 0 && this.props.itemId ? this.props.list_deliveries.find((item, i) => {
      return this.props.itemId===item.id;
    }) : null;

    let deliveries_thead = <tr>
        <th>Load place</th>
        <th>Unload place</th>
        <th>Time In</th>
        <th>Time Out</th>
        <th>Operator</th>
        <th>Entered By</th>
        <th>Operator WorkOrg</th>
        <th>Comment</th>
        <th>actions</th>
        </tr>;

    let thead = <thead>{deliveries_thead}</thead>;

    let deliveries_tbody = list_deliveries ? list_deliveries.map((item, i) => {

    return <tr key={item.id}>
        <td>{item.load_place}</td>
        <td>{item.unload_place}</td>
        <td>{item.time_in}</td>
        <td>{item.time_out}</td>
        <td>{item.operator.lastName+" "+item.operator.firstName}</td>
        <td>{item.entered_by.name}</td>
        <td>{item.operator.work_organization.name}</td>
        <td>{item.comment}</td>
        <td className="grid-container">
          
          {this.props && this.props.access_token ? 
            <Button variant="outline-warning m-1" itemID={item.id} onClick={() => this.props.modalShow([true, item.id, "update"])}>Update</Button>
          : null}
          
          {this.props && this.props.access_token ? 
            <Button variant="outline-danger m-1" itemID ={item.id} onClick={() => this.props.modalShow([true, item.id, "delete"])}>Delete</Button>
          : null}

        </td>
      </tr>

    }) : null;
    let tbody = <tbody>{deliveries_tbody}</tbody>;

    let modalHeaderText = "";
    let modalBodyText = "";
    let form = null;

    if(this.props && this.props.modal_purpose){

      if(this.props.modal_purpose === "delete"){

        let modalHeaderTextDeleteDelivery = this.props && this.props.modal_purpose && this.props.modal_purpose === "delete" ? "You are trying to delete an item: " : "";
        let modalBodyTextDeleteDelivery = this.props && this.props.modal_purpose && this.props.modal_purpose === "delete" && chosen_delivery ? <div><h6>An vehicle: </h6> 
          <div>
            <div><strong>Load place:</strong> {chosen_delivery.load_place}</div>
            <div><strong>Unload place:</strong> {chosen_delivery.unload_place}</div>
            <div><strong>Time In:</strong> {chosen_delivery.time_in}</div>
            <div><strong>Time Out:</strong> {chosen_delivery.time_out}</div>
            <div><strong>Operator:</strong> {chosen_delivery.operator.lastName+" "+chosen_delivery.operator.firstName}</div>
            <div><strong>Entered By:</strong> {chosen_delivery.entered_by.name}</div>
            <div><strong>Operator WorkOrg:</strong> {chosen_delivery.operator.work_organization.name}</div>
            <div><strong>Comment:</strong> {chosen_delivery.comment}</div>
          </div>
        </div>
        : "";
        modalHeaderText = modalHeaderTextDeleteDelivery;
        
        modalBodyText = modalBodyTextDeleteDelivery;
        form = this.props && this.props.modal_purpose && this.props.modal_purpose==="delete" ? <DeleteDelivery deliveryid={this.props.itemId}/> : null;

      }

      if(this.props.modal_purpose === "update"){

        //form = this.props && this.props.modal_purpose && this.props.modal_purpose==="update" ? <UpdateDelivery vehicle={chosen_delivery}/> : null;

      }

    }

    let myModal = this.props && this.props.access_token ? 
      <CustomModal modalheadertext={modalHeaderText} modalbodytext={modalBodyText} form={form} chosen_delivery={chosen_delivery} show={this.props.modalState} deliveryid={this.props.itemId} purpose={this.props.modal_purpose} onHide={() => this.props.modalHide([false])}/> 
    : null;

    return (
      <div>
        <Table striped bordered hover size="sm" responsive="md">
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
})(ListDeliveries);
