import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from 'react'
import DeleteVehicle from '../vehicles/delete_vehicle';

class CustomModal extends Component {

  constructor(props) {

    super(props);

    //this.handleChange = this.handleChange.bind(this);
    
  }

  render() {
    //console.log("CustomModal: ", this.props);

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
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