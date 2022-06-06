import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
import { create_work_organization } from "../../actions/work_organizations/workOrganizationsActions";

import PropTypes from "prop-types";

class CreateWorkOrgs extends Component {

    constructor(props) {

        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }
    
    async handleSubmit(event) {
      event.preventDefault();
      let forma = event.target; 
      let elements = forma.elements;

      const data = {
            name: elements["name"].value
      };
      
      this.props.create_work_organization(data);
    }

    render() {

        return (
            <div>

                <Form onSubmit={this.handleSubmit} className="m-1">
                    
                    <Form.Group className="mb-1" controlId="workOrgName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter new work organization" />
                    </Form.Group>

                    <Button variant="outline-primary" type="submit" className="m-1">
                        Submit
                    </Button>
                </Form>

            </div>
        )
    }
}

create_work_organization.propTypes = {
    create_work_organization: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
        
    });

};

export default connect(mapStateToProps, { 
    create_work_organization
})(CreateWorkOrgs);