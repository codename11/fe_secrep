import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import CustomModal from '../subcomponents/CustomModal';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import { modalShow } from "../../actions/modalActions";
import { modalHide } from "../../actions/modalActions";
import DeleteDelivery from '../deliveries/delete_delivery';
import UpdateDelivery from '../deliveries/update_delivery';
import { setLabelIds } from "../../actions/delivery/deliveryActions";

function ListDeliveries(props){

  let list_deliveries = props && props.list_deliveries ? props.list_deliveries : null;

  let chosen_delivery = props && props.list_deliveries && props.list_deliveries.length > 0 && props.itemId ? props.list_deliveries.find((item, i) => {
    return props.itemId===item.id;
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
        
        {props && props.access_token ? 
          <Button variant="outline-warning m-1" itemID={item.id} onClick={() => props.modalShow([true, item.id, "update"])}>Update</Button>
        : null}
        
        {props && props.access_token ? 
          <Button variant="outline-danger m-1" itemID ={item.id} onClick={() => props.modalShow([true, item.id, "delete"])}>Delete</Button>
        : null}

      </td>
    </tr>

  }) : null;
  let tbody = <tbody>{deliveries_tbody}</tbody>;

  let modalHeaderText = "";
  let modalBodyText = "";
  let form = null;

  if(props && props.modal_purpose){

    if(props.modal_purpose === "delete"){
      
      let modalHeaderTextDeleteDelivery = props && props.modal_purpose && props.modal_purpose === "delete" ? "You are trying to delete an item: " : "";
      let modalBodyTextDeleteDelivery = props && props.modal_purpose && props.modal_purpose === "delete" && chosen_delivery ? <div><h6>An vehicle: </h6> 
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
      form = props && props.modal_purpose && props.modal_purpose==="delete" ? <DeleteDelivery deliveryid={props.itemId}/> : null;

    }

    if(props.modal_purpose === "update"){
      //console.log("update: ", chosen_delivery);
      let modalHeaderTextUpdateDelivery = props && props.modal_purpose && props.modal_purpose === "update" ? "You are trying to update an item with an id of "+chosen_delivery.id : "";
      modalHeaderText = modalHeaderTextUpdateDelivery;

      let labelVehicleIds = [];
      
      let complements = chosen_delivery && chosen_delivery.complement && chosen_delivery.complement.length>0 ? chosen_delivery.complement : null;
      let len1 = complements.length;
      for(let i=0;i<len1;i++){
          
        labelVehicleIds.push(complements[i].vehicle_id);

      }

      form = props && props.modal_purpose && props.modal_purpose==="update" ? <UpdateDelivery sec_id={props.sec_id} chosen_delivery={chosen_delivery} labelVehicleIds={labelVehicleIds}/> : null;

    }

  }

  let myModal = props && props.access_token ? 
    <CustomModal modalheadertext={modalHeaderText} modalbodytext={modalBodyText} form={form} chosen_delivery={chosen_delivery} show={props.modalState} deliveryid={props.itemId} purpose={props.modal_purpose} onHide={() => props.modalHide([false])}/> 
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

setLabelIds.propTypes = {
  setLabelIds: PropTypes.func.isRequired,
};

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
    labelIds: state.deliveries.labelIds
  });

};

export default connect(mapStateToProps, { 
  modalShow,
  modalHide,
  setLabelIds
})(ListDeliveries);
