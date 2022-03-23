import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Component } from 'react'
import {connect} from "react-redux";
import { list_work_organizations } from "../../actions/work_organizations/workOrganizationsActions";
import { delete_work_organization } from "../../actions/work_organizations/workOrganizationsActions";
import { modalHide } from "../../actions/modalActions";
import PropTypes from "prop-types";

class DeleteWorkOrgs extends Component {

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
            id: elements["workorgid"].value
        }
        console.log("data: ", data);
        this.props.delete_work_organization(data);
        this.props.modalHide([false]);
    }

    render() {
        console.log("delworkOrgs: ", this.props);
        
        let selectedWorkOrg = this.props && this.props.work_organizations && this.props.work_organizations.list_work_organizations ? this.props.work_organizations.list_work_organizations.find((item, i) => {
            return this.props.itemId===item.id;
        }) : null;
        console.log("selectedWorkOrg: ", selectedWorkOrg);
        return (

            <div className="frame1 container updateWorkOrgs">
                
                <Form onSubmit={this.handleSubmit} className="m-1">
                    
                    <Form.Group className="mb-1" controlId="workorgid">
                        <Form.Label>Work organization with internal id of "{selectedWorkOrg.id}" will be deleted.</Form.Label>
                        <Form.Control type="hidden" name="workorgid" value={selectedWorkOrg.id}/>
                    </Form.Group>

                    <Button variant="outline-warning" type="submit" className="m-1">
                        Submit
                    </Button>
                </Form>

            </div>
        )
    }
}

list_work_organizations.propTypes = {
    list_work_organizations: PropTypes.func.isRequired,
};

delete_work_organization.propTypes = {
    delete_work_organization: PropTypes.func.isRequired,
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
    delete_work_organization, 
    modalHide
})(DeleteWorkOrgs);