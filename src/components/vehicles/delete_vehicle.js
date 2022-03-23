import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Component } from 'react';
import { deleteVehicle } from "../../actions/vehicles/vehicleActions";
import { modalHide } from "../../actions/modalActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class DeleteVehicle extends Component {

  constructor(props) {

    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){

    event.preventDefault();

    let target = event.target;
    let vehicleid = target.parentElement.elements["vehicleid"].value;
    this.props.deleteVehicle(vehicleid);
    this.props.modalHide([false])

  }

  render() {
    //console.log("delete_vehicle: ", this.props);
    let vehicleId = this.props.vehicleid ? this.props.vehicleid : 0;
    
    return (
      
        <Form>
            <Form.Group className="mb-3" controlId="vehicleid">
                <Form.Label>Vehicle with internal id of "{vehicleId}" will be deleted.</Form.Label>
                <Form.Control type="hidden" name="vehicleid" value={vehicleId}/>
            </Form.Group>

            <Button onClick={this.handleClick} variant="outline-danger" type="button">
                Delete
            </Button>
        </Form>

    )
  }
}

deleteVehicle.propTypes = {
    deleteVehicle: PropTypes.func.isRequired,
};

modalHide.propTypes = {
  modalHide: PropTypes.func.isRequired,
};
  
const mapStateToProps = (state) =>{ 
  
    return ({
        deleted_vehicle_id: state.deleted_vehicle_id,
        modalState: state.modalState.modalState
    });

};

export default connect(mapStateToProps, { 
    deleteVehicle,
    modalHide
})(DeleteVehicle);