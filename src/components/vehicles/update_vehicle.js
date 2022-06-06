import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Component } from 'react';
import { updateVehicle } from "../../actions/vehicles/vehicleActions";
import { get_vehicle_types } from "../../actions/vehicle_types/vehicleTypesActions";
import { list_work_organizations } from "../../actions/work_organizations/workOrganizationsActions";
import { modalHide } from "../../actions/modalActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class UpdateVehicle extends Component {

  constructor(props) {

    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){

    event.preventDefault();
    let target = event.target;
    let elements = target.elements;
    const data = {
      id: elements["vehicleid"].value,
      registration: elements["name"].value && elements["name"].value.length > 0 ? elements["name"].value : null,
      vehicle_type_id: elements["type"].value && elements["type"].value.length > 0 ? elements["type"].value : null,
      workOrg: elements["workOrg"].value && elements["workOrg"].value.length > 0 ? elements["workOrg"].value : null
    }
    
    this.props.updateVehicle(data);
    this.props.modalHide([false])

  }

  render() {

    let vehicle = this.props.vehicle ? this.props.vehicle : "";
    
    let option1 = [<option key={""} value={""}>None</option>];
      let types = this.props.vehicle_types && this.props.vehicle_types.list_vehicle_types ? this.props.vehicle_types.list_vehicle_types.map((item, i) => {
        return <option key={item.id} value={item.id} selected={vehicle && vehicle.vehicle_type_id && vehicle.vehicle_type_id===item.id ? true : false}>{item.name}</option>
      }) : null;

      if(types && types.length > 0){

        option1.push(...types);

      }

      let option2 = [<option key={""} value={""}>None</option>];
      let workOrgs = this.props.work_organizations && this.props.work_organizations.list_work_organizations ? this.props.work_organizations.list_work_organizations.map((item, i) => {
        return <option key={item.id} value={item.id} selected={vehicle && vehicle.workOrganization_id && vehicle.workOrganization_id===item.id ? true : false}>{item.name}</option>
      }) : null;
      
      if(workOrgs && workOrgs.length > 0){

        option2.push(...workOrgs);

      }

      let typesSelect = <Form.Select id="type" aria-label="Default select example" name="type">
        {option1}
      </Form.Select>;
      let workOrgSelect = <Form.Select id="workOrg" aria-label="Default select example" name="workOrg">
        {option2}
      </Form.Select>;
    
    return (
      <div>
        <Form onSubmit={this.handleSubmit} name="myForm">
            <Form.Group className="mb-1" controlId="vehicleid">
                <Form.Label>Vehicle with internal id of "{vehicle.id}" will be updated.</Form.Label>
                <Form.Control type="hidden" name="vehicleid" value={vehicle.id}/>
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicRegistration">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter new name" defaultValue={vehicle.registration} />
            </Form.Group>

            <Form.Group className="mb-1" controlId="type">
              {typesSelect}
            </Form.Group>

            <Form.Group className="mb-1" controlId="workOrgSelect">
              {workOrgSelect}
            </Form.Group>
            
            <Button name="button" variant="outline-warning" type="submit">
              Update
            </Button>
        </Form>
        
    </div>
    )
  }
}

updateVehicle.propTypes = {
    updateVehicle: PropTypes.func.isRequired,
};

get_vehicle_types.propTypes = {
  get_vehicle_types: PropTypes.func.isRequired,
};

list_work_organizations.propTypes = {
  list_work_organizations: PropTypes.func.isRequired,
};
  
modalHide.propTypes = {
  modalHide: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
  
    return ({
        updated_vehicle_id: state.updated_vehicle_id,
        vehicle_types: state.list_vehicle_types,
        work_organizations: state.list_work_organizations,
        modalState: state.modalState.modalState
    });

};

export default connect(mapStateToProps, { 
    updateVehicle, get_vehicle_types, 
    list_work_organizations, 
    modalHide
})(UpdateVehicle);