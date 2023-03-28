import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { deleteDelivery } from "../../actions/delivery/deliveryActions";
import { modalHide } from "../../actions/modalActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

function DeleteDelivery(props){

  const handleClick = (event) => {

    event.preventDefault();

    let target = event.target;
    let deliveryid = target.parentElement.elements["deliveryid"].value;
    props.deleteDelivery(deliveryid);
    props.modalHide([false]);

  }

  let deliveryid = props.deliveryid ? props.deliveryid : 0;
  
  return (
    
      <Form>
          <Form.Group className="mb-3" controlId="deliveryid">
              <Form.Label>Delivery with internal id of "{deliveryid}" will be deleted.</Form.Label>
              <Form.Control type="hidden" name="deliveryid" value={deliveryid}/>
          </Form.Group>

          <Button onClick={(event)=>handleClick(event)} variant="outline-danger" type="button">
              Delete
          </Button>
      </Form>

  )
}

deleteDelivery.propTypes = {
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
    deleteDelivery,
    modalHide
})(DeleteDelivery);