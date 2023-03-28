import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {connect} from "react-redux";
import { create_work_organization } from "../../actions/work_organizations/workOrganizationsActions";
import { if_submitted } from "../../actions/custom_actions/ifSubmitted";

import PropTypes from "prop-types";

function CreateWorkOrgs(props){
    
    const handleSubmit = (event) => {
      event.preventDefault();
      let forma = event.target; 
      let elements = forma.elements;

      const data = {
            name: elements["name"].value
      };
      
      props.create_work_organization(data);
      props.if_submitted("You created new work organization! ", data.name);
    }

    return (
        <div>

            <Form onSubmit={(e)=>handleSubmit(e)} className="m-1">
                
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

create_work_organization.propTypes = {
    create_work_organization: PropTypes.func.isRequired,
};

if_submitted.propTypes = {
    if_submitted: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{return ({
    ifSubmitted: state.ifSubmitted
});};

export default connect(mapStateToProps, { 
    create_work_organization,
    if_submitted
})(CreateWorkOrgs);