import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { list_work_organizations } from "../../actions/work_organizations/workOrganizationsActions";
import { create_employee } from "../../actions/employees/employeeActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { useEffect } from 'react';
import { if_submitted } from "../../actions/custom_actions/ifSubmitted";

function CreateEmployee(props){

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
            firstName: elements["firstName"].value && elements["firstName"].value.length > 0 ? elements["firstName"].value : null,
            lastName: elements["lastName"].value && elements["lastName"].value.length > 0 ? elements["lastName"].value : null,
            work_org_id: elements["workOrg"].value && elements["workOrg"].value.length > 0 ? elements["workOrg"].value : null,
            sec_id: props.authId,
            avatar: elements["avatar"] && elements["avatar"].files[0] ? elements["avatar"].files[0] : null,
        }

        let formData = new FormData();
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('work_org_id', data.work_org_id);
        formData.append('sec_id', data.sec_id);
        formData.append('avatar', data.avatar);

        props.create_employee(formData);
        
        for(let i=0;i<elements.length;i++){
            elements[i].value = "";
        }

        props.if_submitted("You added new employee! ", data.firstName);

    }

    let option2 = [<option key={""} value={""}>None</option>];
    let workOrgs = props.work_organizations && props.work_organizations.list_work_organizations ? props.work_organizations.list_work_organizations.map((item, i) => {
        return <option key={item.id} value={item.id}>{item.name}</option>
    }) : null;
    
    if(workOrgs && workOrgs.length > 0){

        option2.push(...workOrgs);

    }

    let workOrgSelect = <Form.Select id="workOrg" aria-label="Default select example" name="workOrg">
        {option2}
    </Form.Select>;

    return (
        <div>
        
            <Form onSubmit={(e)=>handleSubmit(e)} name="myForm" encType="multipart/form-data">

                <Form.Group className="mb-1" controlId="firstName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="firstName" placeholder="Enter first name"/>
                </Form.Group>

                <Form.Group className="mb-1" controlId="lastName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Enter last name"/>
                </Form.Group>

                <Form.Group controlId="avatar" className="mb-3">
                    <Form.Label>Upload your avatar image</Form.Label>
                    <Form.Control type="file" name="avatar"/>
                </Form.Group>

                <Form.Group className="mb-1" controlId="workOrgSelect">
                    {workOrgSelect}
                </Form.Group>
                
                <Button name="button" variant="outline-success" type="submit">
                    Create
                </Button>
            </Form>
        
    </div>
    )
}

list_work_organizations.propTypes = {
  list_work_organizations: PropTypes.func.isRequired,
};
  
create_employee.propTypes = {
    create_employee: PropTypes.func.isRequired,
};

if_submitted.propTypes = {
    if_submitted: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
  
    return ({
        work_organizations: state.list_work_organizations,
        latest_employee: state.latest_employee,
        employees: state.employees.list_employees,
        ifSubmitted: state.ifSubmitted
    });

};

export default connect(mapStateToProps, { 
    list_work_organizations, 
    create_employee,
    if_submitted
})(CreateEmployee);