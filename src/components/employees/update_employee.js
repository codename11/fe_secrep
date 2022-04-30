import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { update_employee } from "../../actions/employees/employeeActions";
import { list_work_organizations } from "../../actions/work_organizations/workOrganizationsActions";

class UpdateEmployee extends Component {

    constructor(props) {

        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
        this.props.list_work_organizations();
    }

    handleSubmit(event){

        event.preventDefault();
        let target = event.target;
        let elements = target.elements;
        const data = {
            id: this.props && this.props.chosen_employee && this.props.chosen_employee.id ? this.props.chosen_employee.id : null,
            firstName: elements["firstName"].value && elements["firstName"].value.length > 0 ? elements["firstName"].value : null,
            lastName: elements["lastName"].value && elements["lastName"].value.length > 0 ? elements["lastName"].value : null,
            work_org_id: elements["workOrg"].value && elements["workOrg"].value.length > 0 ? elements["workOrg"].value : null,
            sec_id: this.props.authId,
            avatar: elements["avatar"] && elements["avatar"].files[0] ? elements["avatar"].files[0] : null,
        }
        console.log("data: ", data);
        let formData = new FormData();
        formData.append('id', data.id);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('work_org_id', data.work_org_id);
        formData.append('sec_id', data.sec_id);
        formData.append('avatar', data.avatar);

        this.props.update_employee(formData);
        //"http://secrep.test/storage/"
    }

  render() {
        console.log("update_employee: ", this.props);

        let chosen_employee = this.props && this.props.chosen_employee ? this.props.chosen_employee : "";
        let option1 = [<option key={""} value={""}>None</option>];

        let tmp = null;
        let workOrgs = this.props.work_organizations && this.props.work_organizations.list_work_organizations ? this.props.work_organizations.list_work_organizations.map((item, i) => {
            
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

    return (
      <div>
        <Form onSubmit={this.handleSubmit} name="myForm" encType="multipart/form-data">

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
        
    </div>
    )
  }
}
  
update_employee.propTypes = {
    update_employee: PropTypes.func.isRequired,
};

list_work_organizations.propTypes = {
    list_work_organizations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
  
    return ({
        updated_employee: state.employees.updated_employees,
        work_organizations: state.list_work_organizations
    });

};

export default connect(mapStateToProps, { 
    update_employee,
    list_work_organizations
})(UpdateEmployee);