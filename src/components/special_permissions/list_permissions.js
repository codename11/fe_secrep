import {connect} from "react-redux";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import { modalShow } from "../../actions/modalActions";
import { modalHide } from "../../actions/modalActions";
import Table from 'react-bootstrap/Table';
import CustomModal from '../subcomponents/CustomModal';
import UpdatePermission from './update_permission';
import DeletePermission from './delete_permission';
import { useEffect } from 'react';
//Needed for pagination
import Pagination from 'react-bootstrap/Pagination';
import {setPageNumber} from "../../actions/custom_reports/customReportsActions";
import { list_permissions } from "../../actions/special_permission/special_permissionActions";

function ListPermissions(props){
      
    const { list_permissions } = props;
    useEffect(() => {
            
      list_permissions();
        //Mora array kao dodatni argument da se ne bi ponavljalo.
    }, [list_permissions]);

    const firstPage = (pagination) => {
      props.setPageNumber(1, 0);//Poziva se sa props u nekoj funkciji, dok u useEffect bez props-a.
      props.list_permissions({page: 1});      
  }


  const lastPage = (pagination) => {

      let last = pagination.last_page;
      props.list_permissions({page: last});
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
      props.list_permissions({page: index+1});
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
      
      props.list_permissions({page: index+1});
      props.setPageNumber(index+1, index);

  }

  const setActive = (e, i) => {

      props.setPageNumber(e, i);
      props.list_permissions({page: i+1});

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

    let listPermissions = props && props.permissions ? props.permissions : null;
      
    let chosen_permission = props && props.permissions && props.permissions.length > 0 && props.itemId ? props.permissions.find((item, i) => {
      return props.itemId===item.id;
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
            
            {props && props.access_token ? 
              <Button variant="outline-warning m-1" itemID={item && item.id ? item.id : null} onClick={() => props.modalShow([true, item.id, "update"])}>Update</Button>
            : null}
            
            {props && props.access_token ? 
              <Button variant="outline-danger m-1" itemID ={item && item.id ? item.id : null} onClick={() => props.modalShow([true, item.id, "delete"])}>Delete</Button>
            : null}
  
          </td>
        </tr>
  
      }) : null;
    let tbody = <tbody>{permissions_tbody}</tbody>;

    let modalHeaderText = "";
    let modalBodyText = "";
    let form = null;

    if(props && props.modal_purpose){

      if(props.modal_purpose === "delete"){

        let modalHeaderTextDeletePermission = props && props.modal_purpose && props.modal_purpose === "delete" ? "You are trying to delete an item: " : "";
        let modalBodyTextDeletePermission = props && props.modal_purpose && props.modal_purpose === "delete" && chosen_permission ? <div><h6>An permission: </h6> 
          <div>
            <div><strong>Description:</strong> {chosen_permission && chosen_permission.permission_description ? chosen_permission.permission_description : null}</div>
            <div><strong>Name:</strong> {chosen_permission && chosen_permission.permission_name ? chosen_permission.permission_name : null}</div>
            <div><strong>SecOficials:</strong> {chosen_permission && chosen_permission.user && chosen_permission.user.length>0 ? chosen_permission.user.map((item, i) => {
              return item.name;
            }).toString() : null}</div>
            <div><strong>Employees:</strong> {chosen_permission && chosen_permission.employees && chosen_permission.employees.length>0 ? chosen_permission.employees.map((item2, i2) => {
              return item2.lastName+" "+item2.firstName;
            }).toString() : null}</div>
            <div><strong>Vehicles:</strong> {chosen_permission && chosen_permission.vehicles && chosen_permission.vehicles.length>0 ? chosen_permission.vehicles.map((item2, i2) => {
              return item2.registration;
            }).toString() : null}</div>
            
          </div>
        </div>
        : "";
        modalHeaderText = modalHeaderTextDeletePermission;
        
        modalBodyText = modalBodyTextDeletePermission;
        form = props && props.modal_purpose && props.modal_purpose==="delete" ? <DeletePermission/> : null;

      }

      if(props.modal_purpose === "update"){
        let modalHeaderTextUpdatePermission = props && props.modal_purpose && props.modal_purpose === "update" ? "You are trying to update an item with an id of "+chosen_permission.id : "";
        modalHeaderText = modalHeaderTextUpdatePermission;
        form = props && props.modal_purpose && props.modal_purpose==="update" ? <UpdatePermission sec_id={props.sec_id} chosen_permission={chosen_permission}/> : null;

      }

    }

    let myModal = props && props.access_token ? 
      <CustomModal modalheadertext={modalHeaderText} modalbodytext={modalBodyText} form={form} chosen_permission={chosen_permission} show={props.modalState} permissionid={props.itemId} purpose={props.modal_purpose} onHide={() => props.modalHide([false])}/> 
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

modalShow.propTypes = {
  modalShow: PropTypes.func.isRequired,
};

modalHide.propTypes = {
  modalHide: PropTypes.func.isRequired,
};

list_permissions.propTypes = {
  list_permissions: PropTypes.func.isRequired,
};

setPageNumber.propTypes = {
  setPageNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
      modalState: state.modalState.modalState,
      itemId: state.modalState.itemId,
      modal_purpose: state.modalState.modal_purpose,
      pagination: state.special_permissions.pagination,
      permissions: state.special_permissions.list_permissions
    });

};

export default connect(mapStateToProps, { 
  modalShow,
  modalHide,
  list_permissions,
  setPageNumber
})(ListPermissions);