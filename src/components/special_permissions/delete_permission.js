import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { delete_permission } from "../../actions/special_permission/special_permissionActions";
import { modalHide } from "../../actions/modalActions";

function DeletePermission(props){
    
    const handleSubmit = (event) => {
      event.preventDefault();
      let forma = event.target; 

      let chosen_permission_id = forma.elements[0].value;
      const data = {
        id: Number(chosen_permission_id),
      };
      
      props.delete_permission(data);
      props.modalHide([false]);

    }

    return (
      <div>
          
        <Form onSubmit={(e)=>handleSubmit(e)} name="myForm">

          <Form.Control type="hidden" name="id" value={props.itemId} required/>
      
          <Button name="button" variant="outline-success" type="submit">
            Delete
          </Button>

        </Form>

      </div>
    )
}

delete_permission.propTypes = {
    delete_permission: PropTypes.func.isRequired,
};

modalHide.propTypes = {
  modalHide: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
  return ({
      itemId: state.modalState.itemId,
      modalState: state.modalState.modalState,
      modal_purpose: state.modalState.modal_purpose,
  });

};

export default connect(mapStateToProps, { 
    delete_permission,
    modalHide
})(DeletePermission);