import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
import Table from 'react-bootstrap/Table';
import PropTypes from "prop-types";
import Accordion from 'react-bootstrap/Accordion';

class GetVehicles extends Component {

    constructor(props) {

        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }
    
    async handleSubmit(event) {
      event.preventDefault();
      let forma = event.target; 
      let elements = forma.elements;
      let len1 = elements.length;

      const data = {
        el1: elements[0] && elements[0].checked ? elements[0].value : null,
        el2: elements[1] && elements[1].checked ? elements[1].value : null,
        el3: elements[2] && elements[2].checked ? elements[2].value : null,
        el4: elements[3] && elements[3].checked ? elements[3].value : null,
        el5: elements[4] && elements[4].checked ? elements[4].value : null,
      };
      console.log(data);
    }

    render() {

      return (
        <div>
          <Form onSubmit={this.handleSubmit} name="myForm">

                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Check this switch1"
                    name="sw1"
                    value="1"
                />

                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Check this switch2"
                    name="sw2"
                    value="2"
                />

                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Check this switch3"
                    name="sw3"
                    value="3"
                />

                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Check this switch4"
                    name="sw4"
                    value="4"
                />

                <Button name="button" variant="outline-success" type="submit">
                    Klik
                </Button>

            </Form>
        </div>
      )
  }
}

const mapStateToProps = (state) =>{ 
    
    return ({
        vehicles: state.vehicles,
    });

};

export default connect(mapStateToProps, { 
  
})(GetVehicles);