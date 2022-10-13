import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomModal(props){

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.modalheadertext}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        {props.modalbodytext}
        {props.form ? props.form : ""}

      </Modal.Body>
      <Modal.Footer>
        {props.modalfootertext}
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
  
export default CustomModal;