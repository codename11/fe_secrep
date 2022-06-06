import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from 'react'

class CustomModal extends Component {

  constructor(props) {

    super(props);
    
  }

  render() {

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.modalheadertext}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          {this.props.modalbodytext}
          {this.props.form ? this.props.form : ""}

        </Modal.Body>
        <Modal.Footer>
        {this.props.modalfootertext}
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
  
export default CustomModal;