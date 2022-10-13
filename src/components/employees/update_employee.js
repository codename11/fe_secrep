import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { update_employee } from "../../actions/employees/employeeActions";
import { list_work_organizations } from "../../actions/work_organizations/workOrganizationsActions";
import { modalHide } from "../../actions/modalActions";
import Alert from 'react-bootstrap/Alert';
import { alertShow } from "../../actions/alertActions";
import { alertHide } from "../../actions/alertActions";
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect } from 'react';

function UpdateEmployee(props){

    const { list_work_organizations } = props;
    useEffect(() => {
            
        list_work_organizations();
        //Mora array kao dodatni argument da se ne bi ponavljalo.
    }, [list_work_organizations]);

    const handleSubmit = (event) => {

        event.preventDefault();
        let target = event.target;
        let elements = target.elements;
        const data = {
            id: elements["id"].value && elements["id"].value.length > 0 ? elements["id"].value : null,
            firstName: elements["firstName"].value && elements["firstName"].value.length > 0 ? elements["firstName"].value : null,
            lastName: elements["lastName"].value && elements["lastName"].value.length > 0 ? elements["lastName"].value : null,
            work_org_id: elements["workOrg"].value && elements["workOrg"].value.length > 0 ? elements["workOrg"].value : null,
            sec_id: props.authId,
            avatar: elements["avatar"] && elements["avatar"].files[0] ? elements["avatar"].files[0] : null,
        }
        
        let formData = new FormData();
        formData.append('_method', "PATCH");
        formData.append('id', data.id);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('work_org_id', data.work_org_id);
        formData.append('sec_id', data.sec_id);
        formData.append('avatar', data.avatar);

        props.update_employee(formData);
        props.modalHide([false]);

    }

        let chosen_employee = props && props.chosen_employee ? props.chosen_employee : "";
        let option1 = [<option key={""} value={""}>None</option>];

        let tmp = null;
        let workOrgs = props.work_organizations && props.work_organizations.list_work_organizations ? props.work_organizations.list_work_organizations.map((item, i) => {
            
            if(chosen_employee.work_organization.id===item.id){
                tmp = item.id;
            }
            return <option key={item.id} value={item.id}>{item.name}</option>

        }) : null;
        
        if(workOrgs && workOrgs.length > 0){

            option1.push(...workOrgs);

        }

        let workOrgSelect = <Form.Select defaultValue={tmp} id="workOrg" aria-label="Default select example" name="workOrg">
            {option1}
        </Form.Select>;

        let chosen_employee_id = props && props.chosen_employee && props.chosen_employee.id ? props.chosen_employee.id : null;
        let errors = props && props.errors && props.errors.errors && props.errors.errors.messages ? props.errors.errors.messages : null;

    return (
      <div>
            <Form onSubmit={(e)=>handleSubmit(e)} name="myForm" encType="multipart/form-data">

                <Form.Control type="hidden" name="id" value={chosen_employee_id} required/>
                
                <Form.Group className="mb-1" controlId="firstName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="firstName" placeholder="Enter first name" defaultValue={chosen_employee.firstName}/>
                </Form.Group>

                <Form.Group className="mb-1" controlId="lastName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Enter last name" defaultValue={chosen_employee.lastName}/>
                </Form.Group>

                <Form.Group controlId="avatar" className="mb-3">
                    <Form.Label>Upload your avatar image</Form.Label>
                    <Form.Control type="file" name="avatar"/>
                </Form.Group>

                <Form.Group className="mb-1" controlId="workOrgSelect">
                {workOrgSelect}
                </Form.Group>
                
                <Button name="button" variant="outline-success" type="submit">
                Update
                </Button>
            </Form>
            
            {errors && errors.length ? <Alert className="mt-2" variant="danger" show={props.alertState} onClick={() => this.props.alertHide([false])} dismissible>
                <Alert.Heading>There were {errors && errors.length ? "errors:" : null}</Alert.Heading>
                
                <ListGroup variant="flush">
                    {errors && errors.length>0 ? errors.map((item, i) => {
                        return <ListGroup.Item variant="danger" key={i}>{item}</ListGroup.Item>;
                    }) : null}
                </ListGroup>
            </Alert> : null}

        </div>
    )
}
  
update_employee.propTypes = {
    update_employee: PropTypes.func.isRequired,
};

list_work_organizations.propTypes = {
    list_work_organizations: PropTypes.func.isRequired,
};

alertShow.propTypes = {
    alertShow: PropTypes.func.isRequired,
};

alertHide.propTypes = {
    alertHide: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
  
    return ({
        employees: state.employees.list_employees,
        updated_employee: state.employees.updated_employees,
        work_organizations: state.list_work_organizations,
        errors: state.errors,
        modalState: state.modalState.modalState,
        itemId: state.modalState.itemId,
        alertState: state.alert.alertState,
        alert_purpose: state.alert.alert_purpose
    });

};

export default connect(mapStateToProps, { 
    update_employee,
    list_work_organizations,
    modalHide,
    alertShow,
    alertHide
})(UpdateEmployee);