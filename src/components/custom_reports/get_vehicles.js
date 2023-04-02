import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { get_vehicles_custom } from "../../actions/custom_reports/customReportsActions";
import { toCSV } from "../../actions/custom_reports/customReportsActions";
import {setTimeIn} from "../../actions/custom_reports/customReportsActions";
import {setTimeOut} from "../../actions/custom_reports/customReportsActions";
import Pagination from 'react-bootstrap/Pagination';
import {setPageNumber} from "../../actions/custom_reports/customReportsActions";
import {set_per_page} from "../../actions/custom_reports/customReportsActions";
import Table from 'react-bootstrap/Table';
import CustomModal from '../subcomponents/CustomModal';
import { modalShow } from "../../actions/modalActions";
import { modalHide } from "../../actions/modalActions";
import DeleteVehicle from '../vehicles/delete_vehicle';
import UpdateVehicle from '../vehicles/update_vehicle';
import { get_vehicle_types } from "../../actions/vehicle_types/vehicleTypesActions";
import { list_work_organizations } from "../../actions/work_organizations/workOrganizationsActions";

function GetVehicles(props){

    const { get_vehicle_types, list_work_organizations, get_vehicles_custom } = props;
    useEffect(() => {
        
        get_vehicles_custom({page: 1});
        get_vehicle_types();
        list_work_organizations();
        //Mora array kao dodatni argument da se ne bi ponavljalo.
    }, [get_vehicle_types, list_work_organizations, get_vehicles_custom]);

    const firstPage = (pagination) => {
        props.setPageNumber(1, 0);//Poziva se sa props u nekoj funkciji, dok u useEffect bez props-a.
        props.get_vehicles_custom({page: 1});      
    }


    const lastPage = (pagination) => {

        let last = pagination.last_page;
        props.get_vehicles_custom({page: last});
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
        props.get_vehicles_custom({page: index+1});
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
        
        props.get_vehicles_custom({page: index+1});
        props.setPageNumber(index+1, index);

    }

    const handleSubmitPerPage = (event) => {

        event.preventDefault();
        let forma = event.target; 
        let elements = forma.elements;
        let per_page = elements[0].value;
        let metoda = elements[1].checked ? elements[1].value : (elements[2].checked ? elements[2].value.toUpperCase() : null);
        let per_page_id = 1;
        if(per_page && metoda && per_page_id){
            let data = {
                user_id: props.auth.user.id,
                per_page: per_page,
                metoda: metoda,
                "per_page_id": per_page_id
            }
            console.log("data: ", data);
            props.set_per_page(data);
            props.get_vehicles_custom({page: 1});
            props.setPageNumber(1, 0);

        }
        let pagination = props && props.pagination ? props.pagination :null;
        firstPage(pagination);

    }

    const setActive = (e, i) => {

        props.setPageNumber(e, i);
        props.get_vehicles_custom({page: i+1});

    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        let forma = event.target; 
        let elements = forma.elements;
        let len1 = elements.length;

        let data = {};

        for(let key in elements){
            if(elements[key].type==="checkbox" && elements[key].checked){  
                data.vehicle = [];
            }
        }

        for(let i=0;i<len1;i++){

            if(elements[i].type==="checkbox" && elements[i].checked && elements[i].value){  
                data.vehicle.push(elements[i].value);
            }

            if(elements[i].type!=="checkbox" && elements[i].value){  
                data[elements[i].name] = elements[i].value;
            }

        }
        console.log("handleSubmit: ", data);
        props.get_vehicles_custom(data);
        /*
        Dodati jos jedno dugme koje ce praviti izvestaj po onim parametrima.
        Parametri trebaju pozivati nezavisnu funkciju koja ce vrsiti upit 
        samo za izvestaj. Posto ovde ima i paginacija.
        */
    }

    let pagination = props && props.pagination ? props.pagination : null;

    let vehicleList = props && props.list_vehicles && props.list_vehicles.length>0 ? props.list_vehicles : null;
        
    let list_vehicles = vehicleList && vehicleList.length>0 ? vehicleList.map((item, i) => {
        return <option key={item.id} value={item.id}>{item.registration}</option>
    }) : null;

    if(list_vehicles){
        list_vehicles.unshift(<option key="tmp" value="">All vehicles</option>);
    }
        
    let tmp1 = vehicleList && vehicleList.length>0 ? vehicleList.map((item, i) => {

        return <div key={"q"+item.id}>
            <code className="vehicleCustom" key={"x"+item.id}><pre key={"y"+item.id}>{JSON.stringify(item, null, 4)}</pre></code>
        </div>;

    }) : null;

    let href = props && props.href ? props.href : null;

    let accordionVehicleList = null;
    /*let accordionVehicleList = <div className="grid-container2"><div className="itemGV6 grid-container1 gc2-item1">{tmp1}</div>
        <a className="btn btn-outline-info ReportPageDownload" href={href} download="wholeReport" onClick={(e)=> props.toCSV(e, vehicleList)}>
            ReportPageDownload
        </a>
    </div>;*/
        
    let per_page = pagination && pagination.per_page ? pagination.per_page : null;
    let checkIfUtility = props && props.auth && props.auth.user && props.auth.user.utility && props.auth.user.utility.id && Number.isInteger(props.auth.user.utility.id) ? true : false;

    /*Necessary for limiting visible buttons for pagination, since it can have many page, hence many buttons introduce new problem.
        Siblings variable represents left and right visible button around currently active page.
        1 means that here is one on each side of active page.
    */
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

    let altPagination = null;//Default Laravel pagination implementation in React. Slower then my take on it. Preredered buttons and styling from Laravel.

    let vehicle_types = props && props.vehicle_types && props.vehicle_types.list_vehicle_types && props.vehicle_types.list_vehicle_types.length>0 ? props.vehicle_types.list_vehicle_types : null;
    let work_organization = props && props.work_organizations && props.work_organizations.list_work_organizations && props.work_organizations.list_work_organizations.length>0 ? props.work_organizations.list_work_organizations : null;
    //Odavde pocinje tabela

    let vehicle_thead = <tr>
    <th>registration</th>
    <th>type</th>
    <th>work_organization.name</th>
    <th>created_at</th>
    <th>updated_at</th>
    <th>actions</th>
    </tr>;

    let thead = <thead>{vehicle_thead}</thead>;

    let vehicle_tbody = vehicleList ? vehicleList.map((item, i) => {

        item.type = vehicle_types ? vehicle_types.filter((item1, i) => {

            if(item.vehicle_type_id===item1.id){
                return item;
            }
        })[0] : null;
    
        item.work_organization = work_organization ? work_organization.filter((item1, i) => {
    
            if(item.workOrganization_id===item1.id){
                return item;
            }
        })[0] : null;

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

    let chosen_vehicle = props && props.list_vehicles && props.list_vehicles.length > 0 && props.itemId ? props.list_vehicles.find((item, i) => {
        return props.itemId==item.id;
    }) : null;

    if(chosen_vehicle){

        chosen_vehicle.type = chosen_vehicle && vehicle_types ? vehicle_types.filter((item, i) => {

            if(chosen_vehicle.vehicle_type_id==item.id){
                return item;
            }
        })[0] : null;
    
        chosen_vehicle.work_organization = chosen_vehicle && work_organization ? work_organization.filter((item, i) => {
    
            if(chosen_vehicle.workOrganization_id==item.id){
                return item;
            }
        })[0] : null;

    }


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
    console.log("cusRep: ", props);
    return (
        <div>
            <div>
                <h5 className="labelSetPerPage">Set or update per page</h5>
                <Form onSubmit={(e)=>handleSubmitPerPage(e)} name="myPerPageForm" className="grid-container f1">
                    
                    <Form.Group className="mb-3 per_page" controlId="per_page">
                        <Form.Control name="per_page" type="number" min={0} max={20} defaultValue={per_page} placeholder="Per page" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="post">
                        <Form.Check name="metoda" type="radio" value="post" label="Create" disabled={checkIfUtility ? true : false} defaultChecked={checkIfUtility ? false : true}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="patch">
                        <Form.Check name="metoda" type="radio" value="patch" label="Update" disabled={checkIfUtility ? false : true} defaultChecked={checkIfUtility ? true : false}/>
                    </Form.Group>

                    <Button className="itemGV5" name="per_page_button" variant="outline-success" type="submit">
                        Set per page
                    </Button>

                </Form>
            </div>

            <Form onSubmit={(e)=>handleSubmit(e)} name="myForm" className="grid-container f1">
                
                <DatePicker
                    selected={props.time_in}
                    onChange={(date) => props.setTimeIn(date)}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeIntervals={15}
                    name="start_date"
                    shouldCloseOnSelect={false}
                    className="itemGV1"
                    placeholderText={"Please select a date"}
                />

                <DatePicker
                    selected={props.time_out}
                    onChange={(date) => props.setTimeOut(date)}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeIntervals={15}
                    name="end_date"
                    shouldCloseOnSelect={false}
                    className="itemGV2"
                    placeholderText={"Please select a date"}
                />

                <Form.Select className="itemGV3" aria-label="Default select example" name="vehicle_id" id="vehicle_id">
                    {list_vehicles ? list_vehicles : <option value="">No available vehicles for this date range</option>}
                </Form.Select>

                <div className="itemGV4 grid-container">

                    <Form.Check 
                        type="switch"
                        id="User"
                        label="User"
                        name="user"
                        value="user"
                    />

                    <Form.Check 
                        type="switch"
                        id="Type"
                        label="Type"
                        name="type"
                        value="type"
                    />

                    <Form.Check 
                        type="switch"
                        id="WorkOrg"
                        label="WorkOrg"
                        name="workOrganization"
                        value="workOrganization"
                    />

                    <Form.Check 
                        type="switch"
                        id="Complements"
                        label="Complements"
                        name="complements"
                        value="complements"
                    />

                    <Form.Check 
                        type="switch"
                        id="Deliveries"
                        label="Deliveries"
                        name="deliveries"
                        value="deliveries"
                    />

                </div>

                <Button className="itemGV5" name="button" variant="outline-success" type="submit">
                    Submit
                </Button>

            </Form>
            {accordionVehicleList}
            {vehicle_table}

            <Pagination className="pagination">
                <Pagination.First onClick={()=>firstPage(pagination)}/>
                <Pagination.Prev onClick={()=>prevPage(pagination)}/>
                    {setVisiblePages(pagination)}
                <Pagination.Next  onClick={()=>nextPage(pagination)}/>
                <Pagination.Last  onClick={()=>lastPage(pagination)}/>
            </Pagination>
            
            {altPagination}
            {myModal}
        </div>
    )
  
}

setPageNumber.propTypes = {
    setPageNumber: PropTypes.func.isRequired,
};

setTimeIn.propTypes = {
    setTimeIn: PropTypes.func.isRequired,
};

setTimeOut.propTypes = {
    setTimeOut: PropTypes.func.isRequired,
};

get_vehicles_custom.propTypes = {
    get_vehicles_custom: PropTypes.func.isRequired,
};

toCSV.propTypes = {
    toCSV: PropTypes.func.isRequired,
};

set_per_page.propTypes = {
    set_per_page: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
        list_vehicles: state.vehicles.list_vehicles,
        pagination: state.customReports.pagination,
        href: state.customReports.href,
        time_in: state.customReports.time_in,
        time_out: state.customReports.time_out,
        auth: state.auth.auth,
        linkovi: state.customReports.linkovi,
        vehicle_types: state.list_vehicle_types,
        work_organizations: state.list_work_organizations,
        modalState: state.modalState.modalState,
        itemId: state.modalState.itemId,
        deleted_vehicle_id: state.deleted_vehicle_id,
        modal_purpose: state.modalState.modal_purpose,
        updated_vehicle_id: state.updated_vehicle_id
    });

};

export default connect(mapStateToProps, { 
    toCSV,
    get_vehicles_custom,
    setTimeIn,
    setPageNumber,
    setTimeOut,
    set_per_page, 
    modalShow,
    modalHide,
    get_vehicle_types, 
    list_work_organizations,
})(GetVehicles);