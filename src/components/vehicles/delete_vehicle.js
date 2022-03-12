import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Component } from 'react';
import { deleteVehicle } from "../../actions/vehicles/vehicleActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class DeleteVehicle extends Component {

  constructor(props) {

    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  async handleSubmit(event) {
    event.preventDefault();
    let target = event.target;
    
    const data = {
        vehicleid: target.elements["vehicleid"].value
    }
    console.log("value: ", target.elements["vehicleid"].value);
    console.log("DeleteVehicle: ", this.props.vehicleid);
    this.props.deleteVehicle(data);

  }

  render() {
    

    let vehicleId = this.props.vehicleid ? this.props.vehicleid : 0;
    
    return (
      
        <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="vehicleid">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="hidden" name="vehicleid" value={vehicleId}/>
            </Form.Group>

            <Button variant="outline-primary" type="submit">
                Delete
            </Button>
        </Form>

    )
  }
}

deleteVehicle.propTypes = {
    deleteVehicle: PropTypes.func.isRequired,
};
  
const mapStateToProps = (state) =>{ 
  
    return ({
        deleted_vehicle_id: state.deleted_vehicle_id
    });

};

export default connect(mapStateToProps, { 
    deleteVehicle
})(DeleteVehicle);