import { Component } from 'react'
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

class Employees extends Component {

    constructor(props) {

        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
        this.props.get_employees();
    }
    
    async handleSubmit(event) {
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
      
    }

    render() {

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
        
        let employee_tbody = this.props && this.props.employees && this.props.employees.list_employees && this.props.employees.list_employees.length>0 ? this.props.employees.list_employees.map((item, i) => {

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
            
            return <tr key={item.id}>
                <td className="avatarTd">{item.id+" "}<img src={"http://secrep.test/storage/"+item.lastName+"_"+item.firstName+"/"+item.avatar} alt={"avatar"+i} className="avatar"/></td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{created_at}</td>
                <td>{updated_at}</td>
                <td>{item.deliveries ? item.deliveries.length : null}</td>
                <td>{item.entered_by ? item.entered_by.name : null}</td>
                <td>{item.work_organization.name}</td>
                <td className="grid-container actionsContainer">
                    
                    {this.props && this.props.auth && this.props.auth.access_token ? 
                        <Button variant="outline-warning m-1" itemID={item.id} onClick={() => this.props.modalShow([true, item.id, "update"])}>Update</Button>
                    : null}
                    
                    {this.props && this.props.auth && this.props.auth.access_token ? 
                        <Button variant="outline-danger m-1" itemID ={item.id} onClick={() => this.props.modalShow([true, item.id, "delete"])}>Delete</Button>
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
        
        let chosen_employee = this.props && this.props.employees && this.props.employees.list_employees && this.props.employees.list_employees.length>0 && this.props.itemId ? this.props.employees.list_employees.find((item, i) => {
            
            return this.props.itemId===item.id;
        }) : null;
        
        if(this.props && this.props.modal_purpose){
            
            if(this.props.modal_purpose === "delete"){

                let modalHeaderTextDeleteEmployee = this.props && this.props.modal_purpose && this.props.modal_purpose === "delete" ? "You are trying to delete an item: " : "";
                let modalBodyTextDeleteEmployee = this.props && this.props.modal_purpose && this.props.modal_purpose === "delete" && chosen_employee ? <div><h6>An vehicle: </h6> 
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
                form = this.props && this.props.modal_purpose && this.props.modal_purpose==="delete" ? <DeleteEmployee authId={this.props.auth.user.id} chosen_employee={chosen_employee}/> : null;

            }
            
            if(this.props.modal_purpose === "update"){
                
                let modalHeaderTextUpdateEmployee = this.props && this.props.modal_purpose && this.props.modal_purpose === "update" ? "You are trying to update an employee with an id of: "+chosen_employee.id : "";
                let modalBodyTextUpdateEmployee = "";
                modalHeaderText = modalHeaderTextUpdateEmployee;
                
                modalBodyText = modalBodyTextUpdateEmployee;

                form = this.props && this.props.modal_purpose && this.props.modal_purpose==="update" ? <UpdateEmployee authId={this.props.auth.user.id} chosen_employee ={chosen_employee} employees={this.props.list_employees}/> : null;

            }

        }

        let myModal = this.props && this.props.auth && this.props.auth.access_token ? 
            <CustomModal modalheadertext={modalHeaderText} modalbodytext={modalBodyText} form={form} chosen_employee={chosen_employee} show={this.props.modalState} employeeid={this.props.itemId} purpose={this.props.modal_purpose} onHide={() => this.props.modalHide([false])}/> 
        : null;

        return (
        <div>
            
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Create new employee</Accordion.Header>
                    <Accordion.Body>

                        <CreateEmployee authId={this.props.auth.user.id} employees={this.props.list_employees}/>

                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>List employees</Accordion.Header>
                    <Accordion.Body>

                        {employee_table}

                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
            {myModal}
        </div>
        )
    }
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

const mapStateToProps = (state) =>{ 
    
    return ({
        auth: state.auth.auth,
        tabKey: state.key.tabKey,
        employees: state.employees,
        modalState: state.modalState.modalState,
        itemId: state.modalState.itemId,
        modal_purpose: state.modalState.modal_purpose,
        alertState: state.alert.alertState,
        alert_purpose: state.alert.alert_purpose
    });

};

export default connect(mapStateToProps, { 
    get_employees,
    modalShow,
    modalHide
})(Employees);