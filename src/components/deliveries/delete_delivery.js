import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Component } from 'react';
import { deleteDelivery } from "../../actions/delivery/deliveryActions";
import { modalHide } from "../../actions/modalActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class DeleteDelivery extends Component {

  constructor(props) {

    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){

    event.preventDefault();

    let target = event.target;
    let deliveryid = target.parentElement.elements["deliveryid"].value;
    this.props.deleteDelivery(deliveryid);
    this.props.modalHide([false]);

  }

  render() {
    console.log("delete_delivery: ", this.props);
    let deliveryid = this.props.deliveryid ? this.props.deliveryid : 0;
    
    return (
      
        <Form>
            <Form.Group className="mb-3" controlId="deliveryid">
                <Form.Label>Delivery with internal id of "{deliveryid}" will be deleted.</Form.Label>
                <Form.Control type="hidden" name="deliveryid" value={deliveryid}/>
            </Form.Group>

            <Button onClick={this.handleClick} variant="outline-danger" type="button">
                Delete
            </Button>
        </Form>

    )
  }
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