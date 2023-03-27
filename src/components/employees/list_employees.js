import {connect} from "react-redux";
import PropTypes from "prop-types";
import { get_employees } from "../../actions/employees/employeeActions";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { modalShow } from "../../actions/modalActions";
import { modalHide } from "../../actions/modalActions";
import CustomModal from '../subcomponents/CustomModal';
import CreateEmployee from './create_employee';
import UpdateEmployee from './update_employee';
import DeleteEmployee from './delete_employee';
import Accordion from 'react-bootstrap/Accordion';
import { useEffect } from 'react';
//Needed for pagination
import Pagination from 'react-bootstrap/Pagination';
import {setPageNumber} from "../../actions/custom_reports/customReportsActions";

function Employees(props){

    const { get_employees } = props;
    useEffect(() => {
            
        get_employees();
        //Mora array kao dodatni argument da se ne bi ponavljalo.
    }, [get_employees]);
    
    const firstPage = (pagination) => {
        props.setPageNumber(1, 0);//Poziva se sa props u nekoj funkciji, dok u useEffect bez props-a.
        props.get_employees({page: 1});      
    }


    const lastPage = (pagination) => {

        let last = pagination.last_page;
        props.get_employees({page: last});
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
        props.get_employees({page: index+1});
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
        
        props.get_employees({page: index+1});
        props.setPageNumber(index+1, index);

    }

    const setActive = (e, i) => {

        props.setPageNumber(e, i);
        props.get_employees({page: i+1});

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
    
    let employee_thead = <tr>
    <th>avatar</th>
    <th>firstName</th>
    <th>lastName</th>
    <th>created_at</th>
    <th>updated_at</th>
    <th>Num. of deliv.</th>
    <th>enteredBy</th>
    <th>workOrg</th>
    <th>actions</th>
    </tr>;

    let thead = <thead>{employee_thead}</thead>;
        
    let employee_tbody = props && props.employees && props.employees.list_employees && props.employees.list_employees.length>0 ? props.employees.list_employees.map((item, i) => {

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
        
        let avatarImage = <img src={"http://secrep.test/storage/"+item.lastName+"_"+item.firstName+"/"+item.avatar} alt={"avatar"+i} className="avatar" 
            onError={(e) => { 
                console.log("Error. Setting default image."); 
                e.currentTarget.src = "http://secrep.test/storage/employee.jpg";
            }}
        />;
        
        let firstName = item && item.firstName ? item.firstName : null;
        let lastName = item && item.lastName ? item.lastName : null;
        let deliveriesLength = item && item.deliveries && item.deliveries.length ? item.deliveries.length : null;
        let entered_byName = item && item.entered_by && item.entered_by.name ? item.entered_by.name : null;
        let work_organizationName = item && item.work_organization && item.work_organization.name ? item.work_organization.name : null;
    
        return <tr key={item.id}>
            <td className="avatarTd">{item.id+" "}<br/>{avatarImage}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{created_at}</td>
            <td>{updated_at}</td>
            <td>{deliveriesLength}</td>
            <td>{entered_byName}</td>
            <td>{work_organizationName}</td>
            <td className="grid-container actionsContainer">
                
                {props && props.auth && props.auth.access_token ? 
                    <Button variant="outline-warning m-1" itemID={item.id} onClick={() => props.modalShow([true, item.id, "update"])}>Update</Button>
                : null}
                
                {props && props.auth && props.auth.access_token ? 
                    <Button variant="outline-danger m-1" itemID ={item.id} onClick={() => props.modalShow([true, item.id, "delete"])}>Delete</Button>
                : null}

            </td>
        </tr>;
        

    }) : null;
    let tbody = <tbody>{employee_tbody}</tbody>;
      
    let employee_table = <Table striped bordered hover size="sm" responsive="lg">
        {thead}
        {tbody}
    </Table>

    let modalHeaderText = "";
    let modalBodyText = "";
    let form = null;
        
    let chosen_employee = props && props.employees && props.employees.list_employees && props.employees.list_employees.length>0 && props.itemId ? props.employees.list_employees.find((item, i) => { 
        return props.itemId===item.id;
    }) : null;
        
    if(props && props.modal_purpose){
        
        if(props.modal_purpose === "delete"){

            let modalHeaderTextDeleteEmployee = props && props.modal_purpose && props.modal_purpose === "delete" ? "You are trying to delete an item: " : "";
            let modalBodyTextDeleteEmployee = props && props.modal_purpose && props.modal_purpose === "delete" && chosen_employee ? <div><h6>An vehicle: </h6> 
            <div>
                <div><strong>Name:</strong> {chosen_employee.firstName}</div>
                <div><strong>Type:</strong> {chosen_employee.lastName}</div>
                <div><strong>Organization:</strong> {chosen_employee.work_organization.name}</div>
                <div><strong>Created_at:</strong> {chosen_employee.created_at}</div>
                <div><strong>Updated_at:</strong> {chosen_employee.updated_at}</div>
            </div>
            </div>
            : "";
            modalHeaderText = modalHeaderTextDeleteEmployee;
            
            modalBodyText = modalBodyTextDeleteEmployee;
            form = props && props.modal_purpose && props.modal_purpose==="delete" ? <DeleteEmployee authId={props.auth.user.id} chosen_employee={chosen_employee}/> : null;

        }
        
        if(props.modal_purpose === "update"){
            
            let modalHeaderTextUpdateEmployee = props && props.modal_purpose && props.modal_purpose === "update" ? "You are trying to update an employee with an id of: "+chosen_employee.id : "";
            let modalBodyTextUpdateEmployee = "";
            modalHeaderText = modalHeaderTextUpdateEmployee;
            
            modalBodyText = modalBodyTextUpdateEmployee;

            form = props && props.modal_purpose && props.modal_purpose==="update" ? <UpdateEmployee authId={props.auth.user.id} chosen_employee ={chosen_employee} employees={props.list_employees}/> : null;

        }

    }

    let myModal = props && props.auth && props.auth.access_token ? 
        <CustomModal modalheadertext={modalHeaderText} modalbodytext={modalBodyText} form={form} chosen_employee={chosen_employee} show={props.modalState} employeeid={props.itemId} purpose={props.modal_purpose} onHide={() => props.modalHide([false])}/> 
    : null;

    return (
        <div>
            
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Create new employee</Accordion.Header>
                    <Accordion.Body>

                        <CreateEmployee authId={props.auth.user.id} employees={props.list_employees}/>

                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>List employees</Accordion.Header>
                    <Accordion.Body>

                        {employee_table}

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

get_employees.propTypes = {
    get_employees: PropTypes.func.isRequired,
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
        employees: state.employees,
        modalState: state.modalState.modalState,
        itemId: state.modalState.itemId,
        modal_purpose: state.modalState.modal_purpose,
        alertState: state.alert.alertState,
        alert_purpose: state.alert.alert_purpose,
        pagination: state.employees.pagination
    });

};

export default connect(mapStateToProps, { 
    get_employees,
    modalShow,
    modalHide,
    setPageNumber
})(Employees);