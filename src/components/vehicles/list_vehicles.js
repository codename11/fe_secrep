import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {connect} from "react-redux";
import { get_vehicles } from "../../actions/vehicles/vehicleActions";
import { get_vehicle_types } from "../../actions/vehicle_types/vehicleTypesActions";
import { list_work_organizations } from "../../actions/work_organizations/workOrganizationsActions";
import Table from 'react-bootstrap/Table';
import CustomModal from '../subcomponents/CustomModal';
import { modalShow } from "../../actions/modalActions";
import { modalHide } from "../../actions/modalActions";
import PropTypes from "prop-types";
import DeleteVehicle from '../vehicles/delete_vehicle';
import UpdateVehicle from '../vehicles/update_vehicle';
import CreateVehicle from '../vehicles/create_vehicle';
import Accordion from 'react-bootstrap/Accordion';
import { useEffect } from 'react';
//Needed for pagination
import Pagination from 'react-bootstrap/Pagination';
import {setPageNumber} from "../../actions/custom_reports/customReportsActions";

function Vehicles(props){

    const { get_vehicle_types, list_work_organizations, get_vehicles } = props;
    useEffect(() => {
            
      get_vehicle_types();
      list_work_organizations();
      get_vehicles();
        //Mora array kao dodatni argument da se ne bi ponavljalo.
    }, [get_vehicle_types, list_work_organizations, get_vehicles]);
    
    const firstPage = (pagination) => {
      props.setPageNumber(1, 0);//Poziva se sa props u nekoj funkciji, dok u useEffect bez props-a.
      props.get_vehicles({page: 1});      
  }


  const lastPage = (pagination) => {

      let last = pagination.last_page;
      props.get_vehicles({page: last});
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
      props.get_vehicles({page: index+1});
      props.setPageNumber(index+1, index);
      
  }

  const nextPage = (pagination) => {
      console.log("nextPage: ", pagination);
      let first = 0;
      let last = pagination.last_page;
      let index = pagination.index;

      if(index+1<last){
          index = index+1;
      }
      else{
          index = first;
      }
      
      props.get_vehicles({page: index+1});
      props.setPageNumber(index+1, index);

  }

  const setActive = (e, i) => {

      props.setPageNumber(e, i);
      props.get_vehicles({page: i+1});

  }

    const handleSubmit = (event) => {
      event.preventDefault();
      let forma = event.target; 
      let elements = forma.elements;
      let len1 = elements.length;

      const data = {};
      for(let i=0;i<len1;i++){

        if(elements[i].name){
          data[elements[i].name] = elements[i].value;
        }
        
      }
      
      props.get_vehicles(data);
      
    }

    let chosen_vehicle = props && props.vehicles && props.vehicles && props.vehicles.list_vehicles && props.vehicles.list_vehicles.length > 0 && props.itemId ? props.vehicles.list_vehicles.find((item, i) => {
      return props.itemId===item.id;
    }) : null;

    let option1 = [<option key={""} value={""}>None</option>];
    let types = props.vehicle_types && props.vehicle_types.list_vehicle_types ? props.vehicle_types.list_vehicle_types.map((item, i) => {
      return <option key={item.id} value={item.name}>{item.name}</option>
    }) : null;

    if(types && types.length > 0){

      option1.push(...types);

    }

    let option2 = [<option key={""} value={""}>None</option>];
    let workOrgs = props.work_organizations && props.work_organizations.list_work_organizations ? props.work_organizations.list_work_organizations.map((item, i) => {
      return <option key={item.id} value={item.name}>{item.name}</option>
    }) : null;
    
    if(workOrgs && workOrgs.length > 0){

      option2.push(...workOrgs);

    }

    let typesSelect = <Form.Select id="type" className="m-1" aria-label="Default select example" name="type">
      {option1}
    </Form.Select>;
    let workOrgSelect = <Form.Select id="workOrg" className="m-1" aria-label="Default select example" name="workOrg">
      {option2}
    </Form.Select>;

    let vehicles = props && props.vehicles && props.vehicles.list_vehicles ? props.vehicles.list_vehicles : null;
    let vehicle_thead = <tr>
      <th>registration</th>
      <th>type</th>
      <th>work_organization.name</th>
      <th>created_at</th>
      <th>updated_at</th>
      <th>actions</th>
      </tr>;

    let thead = <thead>{vehicle_thead}</thead>;

    let vehicle_tbody = vehicles ? vehicles.map((item, i) => {

      let x1 = new Date(item.created_at);
      let d1Day = x1.getDate();
      let d1Month = x1.getMonth();
      let d1Year = x1.getFullYear();
      let created_at = d1Day+"/"+d1Month+"/"+d1Year;

      let x2 = new Date(item.updated_at);
      let d2Day = x2.getDate();
      let d2Month = x2.getMonth();
      let d2Year = x2.getFullYear();
      let updated_at = d2Day+"/"+d2Month+"/"+d2Year;

      let vehicleId = item && item.id ? item.id : null;
      let registration = item && item.registration ? item.registration : null;
      let typeName = item && item.type && item.type.name ? item.type.name : null;
      let work_organizationName = item && item.work_organization && item.work_organization.name ? item.work_organization.name : null;

      return <tr key={vehicleId}>
          <td>{registration}</td>
          <td>{typeName}</td>
          <td>{work_organizationName}</td>
          <td>{created_at}</td>
          <td>{updated_at}</td>
          <td className="grid-container">
            
            {props && props.auth && props.auth.access_token ? 
              <Button variant="outline-warning m-1" itemID={vehicleId} onClick={() => props.modalShow([true, item.id, "update"])}>Update</Button>
            : null}
            
            {props && props.auth && props.auth.access_token ? 
              <Button variant="outline-danger m-1" itemID ={vehicleId} onClick={() => props.modalShow([true, item.id, "delete"])}>Delete</Button>
              : null}

          </td>
        </tr>

    }) : null;
    let tbody = <tbody>{vehicle_tbody}</tbody>;

    let vehicle_table = <Table striped bordered hover size="sm" responsive="md">
        {thead}
        {tbody}
    </Table>;

    let modalHeaderText = "";
    let modalBodyText = "";
    let form = null;

    if(props && props.modal_purpose){

      if(props.modal_purpose === "delete"){

        let modalHeaderTextDeleteVehicle = props && props.modal_purpose && props.modal_purpose === "delete" ? "You are trying to delete an item: " : "";
        let modalBodyTextDeleteVehicle = props && props.modal_purpose && props.modal_purpose === "delete" && chosen_vehicle ? <div><h6>An vehicle: </h6> 
          <div>
            <div><strong>Name:</strong> {chosen_vehicle.registration}</div>
            <div><strong>Type:</strong> {chosen_vehicle.type.name}</div>
            <div><strong>Organization:</strong> {chosen_vehicle.work_organization.name}</div>
            <div><strong>Created_at:</strong> {chosen_vehicle.created_at}</div>
            <div><strong>Updated_at:</strong> {chosen_vehicle.updated_at}</div>
          </div>
        </div>
        : "";
        modalHeaderText = modalHeaderTextDeleteVehicle;
        
        modalBodyText = modalBodyTextDeleteVehicle;
        form = props && props.modal_purpose && props.modal_purpose==="delete" ? <DeleteVehicle vehicleid={props.itemId}/> : null;

      }

      if(props.modal_purpose === "update"){

        form = props && props.modal_purpose && props.modal_purpose==="update" ? <UpdateVehicle vehicle={chosen_vehicle}/> : null;

      }

    }

    let myModal = props && props.auth && props.auth.access_token ? 
      <CustomModal modalheadertext={modalHeaderText} modalbodytext={modalBodyText} form={form} chosen_vehicle={chosen_vehicle} show={props.modalState} vehicleid={props.itemId} purpose={props.modal_purpose} onHide={() => props.modalHide([false])}/> 
    : null;

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
    
    return (
      <div>
        <Accordion defaultActiveKey="0">

          <Accordion.Item eventKey="0">
            <Accordion.Header>Create new vehicle</Accordion.Header>
            <Accordion.Body>
              
              <CreateVehicle/>
            
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>List vehicles</Accordion.Header>
            <Accordion.Body>
            
              <Form onSubmit={(e)=>handleSubmit(e)}>

                  {typesSelect}
                  {workOrgSelect}
                
                  <Button variant="outline-primary" type="submit" className="m-1">
                      Submit
                  </Button>
              </Form><br/>
              {vehicle_table}
              
              <Pagination className="pagination">
                <Pagination.First onClick={()=>firstPage(pagination)}/>
                <Pagination.Prev onClick={()=>prevPage(pagination)}/>
                    {setVisiblePages(pagination)}
                <Pagination.Next  onClick={()=>nextPage(pagination)}/>
                <Pagination.Last  onClick={()=>lastPage(pagination)}/>
              </Pagination>

            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
        {myModal}
      </div>
    )
}

get_vehicles.propTypes = {
  get_vehicles: PropTypes.func.isRequired,
};

get_vehicle_types.propTypes = {
  get_vehicle_types: PropTypes.func.isRequired,
};

list_work_organizations.propTypes = {
  list_work_organizations: PropTypes.func.isRequired,
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

const mapStateToProps = (state) =>{ 
    
    return ({
        auth: state.auth.auth,
        tabKey: state.key.tabKey,
        vehicles: state.vehicles,
        vehicle_types: state.list_vehicle_types,
        work_organizations: state.list_work_organizations,
        modalState: state.modalState.modalState,
        itemId: state.modalState.itemId,
        deleted_vehicle_id: state.deleted_vehicle_id,
        modal_purpose: state.modalState.modal_purpose,
        updated_vehicle_id: state.updated_vehicle_id,
        pagination: state.vehicles.pagination
    });

};

export default connect(mapStateToProps, { 
  get_vehicles, 
  get_vehicle_types, 
  list_work_organizations, 
  modalShow,
  modalHide,
  setPageNumber
})(Vehicles);