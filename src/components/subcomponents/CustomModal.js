import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from 'react'
import DeleteVehicle from '../vehicles/delete_vehicle';

class CustomModal extends Component {

  constructor(props) {

    super(props);
    
  }

  render() {
    //console.log(this.props);
    let vehicle = this.props && this.props.chosen_vehicle ? this.props.chosen_vehicle : null;
    
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props && this.props.purpose && this.props.purpose === "delete" ? "You are trying to delete an item: " : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            {this.props && this.props.purpose && this.props.purpose === "delete" && vehicle ? <h6>An vehicle: </h6> : ""}
            { vehicle ? 
              <div>
                <div><strong>Name:</strong> {vehicle.registration}</div>
                <div><strong>Type:</strong> {vehicle.type.name}</div>
                <div><strong>Organization:</strong> {vehicle.work_organization.name}</div>
                <div><strong>Created_at:</strong> {vehicle.created_at}</div>
                <div><strong>Updated_at:</strong> {vehicle.updated_at}</div>
              </div>
            : null
            }
            <DeleteVehicle vehicleid={this.props.vehicleid}/>

        </Modal.Body>
        <Modal.Footer>
          <Button>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
  
export default CustomModal;