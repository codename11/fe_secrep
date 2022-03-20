import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Component } from 'react'
import {connect} from "react-redux";
import { list_work_organizations } from "../../actions/work_organizations/workOrganizationsActions";
import { update_work_organization } from "../../actions/work_organizations/workOrganizationsActions";
import PropTypes from "prop-types";

class UpdatetWorkOrgs extends Component {

    constructor(props) {

        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
      this.props.list_work_organizations();
    }
    
    async handleSubmit(event) {
      event.preventDefault();
      let forma = event.target; 
      let elements = forma.elements;
      let len1 = elements.length;

      const data = {
            name: elements["name"].value
      };
      
      this.props.update_work_organization(data);
    }

    render() {
        console.log("workOrgs: ", this.props);

        let workOrgs = this.props.work_organizations.list_work_organizations;
        
        return (
            <div>
                <div className="frame1 container">
                    <h5>Update work organization</h5>
                    <hr/>
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

            </div>
        )
    }
}

update_work_organization.propTypes = {
    update_work_organization: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
        auth: state.auth.auth,
        work_organizations: state.list_work_organizations,
    });

};

export default connect(mapStateToProps, { 
    list_work_organizations, 
    update_work_organization
})(UpdatetWorkOrgs);