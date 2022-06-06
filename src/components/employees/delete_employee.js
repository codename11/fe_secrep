import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { delete_employee } from "../../actions/employees/employeeActions";
import { modalHide } from "../../actions/modalActions";

class DeleteEmployee extends Component {

    constructor(props) {

        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
        //this.props.get_employees();
    }
    
    async handleSubmit(event) {
      event.preventDefault();
      let forma = event.target; 

      let chosen_employee_id = forma.elements[0].value;
      const data = {
        id: chosen_employee_id,
      };
      
      this.props.delete_employee(data);
      this.props.modalHide([false]);
    }

    render() {
      
      let chosen_employee_id = this.props && this.props.chosen_employee && this.props.chosen_employee.id ? this.props.chosen_employee.id : null;
      let authId = this.props && this.props.authId ? this.props.authId : null;

      return (
        <div>
            
          <Form onSubmit={this.handleSubmit} name="myForm">

            <Form.Control type="hidden" name="id" value={chosen_employee_id} required/>
        
            <Button name="button" variant="outline-success" type="submit">
              Delete
            </Button>

          </Form>

        </div>
      )
    }
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