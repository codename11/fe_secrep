import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { delete_employee } from "../../actions/employees/employeeActions";
import { modalHide } from "../../actions/modalActions";

function DeleteEmployee(props){

    const handleSubmit = (event) => {
      event.preventDefault();
      let forma = event.target; 

      let chosen_employee_id = forma.elements[0].value;
      const data = {
        id: chosen_employee_id,
      };
      
      props.delete_employee(data);
      props.modalHide([false]);

    }
      
    let chosen_employee_id = props && props.chosen_employee && props.chosen_employee.id ? props.chosen_employee.id : null;
    let authId = props && props.authId ? props.authId : null;

    return (
      <div>
          
        <Form onSubmit={(e)=>handleSubmit(e)} name="myForm">

          <Form.Control type="hidden" name="id" value={chosen_employee_id} required/>
      
          <Button name="button" variant="outline-success" type="submit">
            Delete
          </Button>

        </Form>

      </div>
    )
  }

delete_employee.propTypes = {
  delete_employee: PropTypes.func.isRequired,
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
  delete_employee,
  modalHide
})(DeleteEmployee);