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

        /*const data = {
                name: elements["name"].value,
                sec_id: this.props.sec_id,
                select_option: this.props && this.props.select_option ? this.props.select_option : null
        };*/
        const data = {
            id: this.props.select_option.value,
            name: elements["name"].value,
            sec_id: this.props.sec_id
        }
        this.props.update_work_organization(data);
    }

    render() {
        //console.log("updworkOrgs: ", this.props);

        let workOrgs = this.props.listWorkOrgs;
        let option_value = this.props && this.props.select_option && this.props.select_option.name ? this.props.select_option.name : "";
        
        return (

            <div className="frame1 container updateWorkOrgs">
                
                <Form onSubmit={this.handleSubmit} className="m-1">
                    
                    {this.props.workOrgSelect}

                    <Form.Group className="mb-1" controlId="workOrgName" key={option_value}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter new work organization" defaultValue={option_value}/>
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

const mapStateToProps = (state) =>{ 
    
    return ({
        auth: state.auth.auth,
        work_organizations: state.list_work_organizations,
        select_option: state.form.select_option
    });

};

export default connect(mapStateToProps, { 
    list_work_organizations, 
    update_work_organization
})(UpdatetWorkOrgs);