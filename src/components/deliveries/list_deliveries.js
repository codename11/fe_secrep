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
//Needed for pagination
import Pagination from 'react-bootstrap/Pagination';
import {setPageNumber} from "../../actions/custom_reports/customReportsActions";
import { useEffect } from 'react';
import { get_deliveries } from "../../actions/delivery/deliveryActions";

function ListDeliveries(props){

  const { get_deliveries } = props;
    useEffect(() => {
            
      get_deliveries();
        //Mora array kao dodatni argument da se ne bi ponavljalo.
  }, [get_deliveries]);

  const firstPage = (pagination) => {
    props.setPageNumber(1, 0);//Poziva se sa props u nekoj funkciji, dok u useEffect bez props-a.
    props.get_deliveries({page: 1});      
  }

  const lastPage = (pagination) => {

      let last = pagination.last_page;
      props.get_deliveries({page: last});
      props.setPageNumber(last, last-1);

  }

  const prevPage = (pagination) => {

      let last = pagination.last_page;
      let index = pagination.index;

      if(index>0){
          index = index-1;
      }
      else if(index<=0){
          index = last-1;
      }
      props.get_deliveries({page: index+1});
      props.setPageNumber(index+1, index);
      
  }

  const nextPage = (pagination) => {

      let first = 0;
      let last = pagination.last_page;
      let index = pagination.index;

      if(index+1<last){
          index = index+1;
      }
      else{
          index = first;
      }
      
      props.get_deliveries({page: index+1});
      props.setPageNumber(index+1, index);

  }

  const setActive = (e, i) => {

      props.setPageNumber(e, i);
      props.get_deliveries({page: i+1});

  }

  let pagination = props && props.pagination ? props.pagination : null;

    const setVisiblePages = (paginacija) =>{
        
        let pageIndex = null;
        let last_page = null;
        let siblings = 1;
        
        pageIndex = pagination && pagination.index ? pagination.index : 0;
        last_page = paginacija && paginacija.last_page && paginacija.last_page ? paginacija.last_page : null;
        
        let myPages = [];

        if(pageIndex===0 && pageIndex<=last_page && pageIndex+siblings<=last_page && pageIndex+(siblings*2)<=last_page){
            
            myPages = [
                <Pagination.Item key={pageIndex} active={true} page={pageIndex+1} onClick={(e)=>{setActive(e, pageIndex)}}>
                    {pageIndex+1}
                </Pagination.Item>,
    
                <Pagination.Item key={pageIndex+siblings} page={pageIndex+1+siblings} onClick={(e)=>{setActive(e, pageIndex+siblings)}}>
                    {pageIndex+1+siblings}
                </Pagination.Item>,
    
                <Pagination.Item key={pageIndex+(2*siblings)} page={pageIndex+1+(2*siblings)} onClick={(e)=>{setActive(e, pageIndex+(siblings*2))}}>
                    {pageIndex+1+(2*siblings)}
                </Pagination.Item>,

                <Pagination.Ellipsis key={"elip"+(pageIndex+3)}/>].filter(Boolean);

        }
        
        if(pageIndex>=0 && pageIndex<=last_page && pageIndex-siblings>=0 && pageIndex+siblings<=last_page){
            
            let ellipsis1 = pageIndex-siblings> 0 ? <Pagination.Ellipsis key={"elip"+(pageIndex+3)}/> : null;
            let ellipsis2 = (pageIndex+siblings)<last_page-1 ? <Pagination.Ellipsis key={"elip"+(pageIndex+4)}/> : null;
            myPages = [

                ellipsis1,

                <Pagination.Item key={pageIndex-siblings} page={pageIndex+1-siblings} onClick={(e)=>{setActive(e, pageIndex-siblings)}}>
                    {pageIndex+1-siblings}
                </Pagination.Item>,
    
                <Pagination.Item key={pageIndex} active={true} page={pageIndex+1} onClick={(e)=>{setActive(e, pageIndex)}}>
                    {pageIndex+1}
                </Pagination.Item>,
    
                <Pagination.Item key={pageIndex+siblings} page={pageIndex+1+siblings} onClick={(e)=>{setActive(e, pageIndex+siblings)}}>
                    {pageIndex+1+siblings}
                </Pagination.Item>,

                ellipsis2].filter(Boolean);

        }
        
        if(pageIndex+1===last_page && pageIndex-(2*siblings)>=0){

            myPages = [
                <Pagination.Ellipsis key={"elip"+(pageIndex+3)}/>,

                <Pagination.Item key={pageIndex-(2*siblings)} page={pageIndex+1-(2*siblings)} onClick={(e)=>{setActive(e, pageIndex-(siblings*2))}}>
                    {pageIndex+1-(2*siblings)}
                </Pagination.Item>,
    
                <Pagination.Item key={pageIndex-siblings} page={pageIndex+1-siblings} onClick={(e)=>{setActive(e, pageIndex)}}>
                    {pageIndex+1-siblings}
                </Pagination.Item>,
    
                <Pagination.Item key={pageIndex} active={true} page={pageIndex+1} onClick={(e)=>{setActive(e, pageIndex-siblings)}}>
                    {pageIndex+1}
                </Pagination.Item>].filter(Boolean);

        }

        if(pageIndex>=0 && pageIndex<=last_page && last_page<=3){
            
            let pages = [];
            for(let i=0;i<last_page;i++){

                pages.push(
                    <Pagination.Item key={i} active={i===pageIndex} page={i+1} onClick={(e)=>{setActive(e, i)}}>
                        {i+1}
                    </Pagination.Item>
                );
                
            }
            myPages = [...pages].filter(Boolean)

        }
        
        return myPages;

    };
    
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
  console.log("list_deliveries: ", list_deliveries);
  let deliveries_tbody = list_deliveries ? list_deliveries.map((item, i) => {

  return <tr key={item.id}>
      <td>{item.load_place}</td>
      <td>{item.unload_place}</td>
      <td>{item.time_in}</td>
      <td>{item.time_out}</td>
      <td>{item && item.operator && item.operator.lastName ? item.operator.lastName+" "+item.operator.firstName : null}</td>
      <td>{item && item.entered_by && item.entered_by.name ? item.entered_by.name : null}</td>
      <td>{item && item.operator && item.operator.work_organization && item.operator.work_organization.name ? item.operator.work_organization.name : null}</td>
      <td>{item.comment}</td>
      <td className="grid-container">
        
        {props && props.access_token ? 
          <Button variant="outline-warning m-1" itemID={item.id} onClick={() => {props.modalShow([true, item.id, "update"]); props.setLabelIds(item.id)}}>Update</Button>
        : null}
        
        {props && props.access_token ? 
          <Button variant="outline-danger m-1" itemID ={item.id} onClick={() => {props.modalShow([true, item.id, "delete"]); props.setLabelIds()}}>Delete</Button>
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
      
      let modalHeaderTextUpdateDelivery = props && props.modal_purpose && props.modal_purpose === "update" ? "You are trying to update an item with an id of "+chosen_delivery.id : "";
      modalHeaderText = modalHeaderTextUpdateDelivery;

      let labelVehicleIds = [];
      
      let complements = chosen_delivery && chosen_delivery.complement && chosen_delivery.complement.length>0 ? chosen_delivery.complement : null;
      let len1 = complements.length;
      for(let i=0;i<len1;i++){
          
        labelVehicleIds.push(complements[i].vehicle_id);

      }

      form = props && props.modal_purpose && props.modal_purpose==="update" ? <UpdateDelivery sec_id={props.sec_id} chosen_delivery={chosen_delivery}/> : null;

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

      <Pagination className="pagination">
          <Pagination.First onClick={()=>firstPage(pagination)}/>
          <Pagination.Prev onClick={()=>prevPage(pagination)}/>
              {setVisiblePages(pagination)}
          <Pagination.Next  onClick={()=>nextPage(pagination)}/>
          <Pagination.Last  onClick={()=>lastPage(pagination)}/>
      </Pagination>
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

setPageNumber.propTypes = {
  setPageNumber: PropTypes.func.isRequired,
};

get_deliveries.propTypes = {
  get_deliveries: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
  return ({
    modalState: state.modalState.modalState,
    itemId: state.modalState.itemId,
    modal_purpose: state.modalState.modal_purpose,
    labelIds: state.deliveries.labelIds,
    pagination: state.deliveries.pagination
  });

};

export default connect(mapStateToProps, { 
  modalShow,
  modalHide,
  setLabelIds,
  setPageNumber,
  get_deliveries
})(ListDeliveries);
