import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Component } from 'react';
import { updateVehicle } from "../../actions/vehicles/vehicleActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class UpdateVehicle extends Component {

  constructor(props) {

    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.test = this.test.bind(this);
  }

  test(event){

    event.preventDefault();
    console.log("test");

  }

  handleClick(event){

    event.preventDefault();

    let target = event.target;
    //let vehicleid = target.parentElement.elements["vehicleid"].value;
    //this.props.updateVehicle(vehicleid);

  }

  render() {
    console.log("updateVehicle: ", this.props);
    let vehicle = this.props.vehicle ? this.props.vehicle : "";
    
    
    return (
      <div>
        <Form onSubmit={this.test}>
            <Form.Group className="mb-3" controlId="vehicleid">
                <Form.Label>Vehicle with internal id of "{vehicle.id}" will be updated.</Form.Label>
                <Form.Control type="hidden" name="vehicleid" value={vehicle.id}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRegistration">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={this.test} placeholder="Enter new name" defaultValue={vehicle.registration} />
            </Form.Group>

            
        </Form>
        <Button onClick={this.handleClick} variant="outline-warning" type="button">
            Update
        </Button>
    </div>
    )
  }
}

updateVehicle.propTypes = {
    updateVehicle: PropTypes.func.isRequired,
};
  
const mapStateToProps = (state) =>{ 
  
    return ({
        updated_vehicle_id: state.updated_vehicle_id
    });

};

export default connect(mapStateToProps, { 
    updateVehicle
})(UpdateVehicle);