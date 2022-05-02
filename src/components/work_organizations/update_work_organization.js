import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
import { list_work_organizations } from "../../actions/work_organizations/workOrganizationsActions";
import { update_work_organization } from "../../actions/work_organizations/workOrganizationsActions";
import { modalHide } from "../../actions/modalActions";
import PropTypes from "prop-types";

class UpdateWorkOrgs extends Component {

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

        let selectedWorkOrg = this.props && this.props.work_organizations && this.props.work_organizations.list_work_organizations ? this.props.work_organizations.list_work_organizations.find((item, i) => {
            return this.props.itemId===item.id;
        }) : null;

        const data = {
            id: selectedWorkOrg.id,
            name: elements["name"].value,
            sec_id: this.props.sec_id
        }
        this.props.update_work_organization(data);
        this.props.modalHide([false]);
    }

    render() {
        console.log("updworkOrgs: ", this.props);
        
        let selectedWorkOrg = this.props && this.props.work_organizations && this.props.work_organizations.list_work_organizations ? this.props.work_organizations.list_work_organizations.find((item, i) => {
            return this.props.itemId===item.id;
        }) : null;
        console.log("selectedWorkOrg: ", selectedWorkOrg);
        
        return (

            <div className="frame1 container updateWorkOrgs">
                
                <Form onSubmit={this.handleSubmit} className="m-1">
                    
                    <Form.Group className="mb-1" controlId="workorgid">
                        <Form.Label>Work organization with internal id of "{selectedWorkOrg.id}" will be updated.</Form.Label>
                        <Form.Control type="hidden" name="workorgid" value={selectedWorkOrg.id}/>
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="workOrgName" key={selectedWorkOrg.name}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter new work organization" defaultValue={selectedWorkOrg.name}/>
                    </Form.Group>

                    <Button variant="outline-warning" type="submit" className="m-1">
                        Submit
                    </Button>
                </Form>

            </div>
        )
    }
}

update_work_organization.propTypes = {
    update_work_organization: PropTypes.func.isRequired,
};

modalHide.propTypes = {
    modalHide: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
        auth: state.auth.auth,
        work_organizations: state.list_work_organizations,
        select_option: state.form.select_option,
        modalState: state.modalState.modalState,
        itemId: state.modalState.itemId
    });

};

export default connect(mapStateToProps, { 
    list_work_organizations, 
    update_work_organization,
    modalHide
})(UpdateWorkOrgs);