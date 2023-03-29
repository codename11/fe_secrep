import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {connect} from "react-redux";
import { list_work_organizations } from "../../actions/work_organizations/workOrganizationsActions";
import { update_work_organization } from "../../actions/work_organizations/workOrganizationsActions";
import { modalHide } from "../../actions/modalActions";
import PropTypes from "prop-types";
import { useEffect } from 'react';

function UpdateWorkOrgs(props){

    /*const { list_work_organizations } = props;
    useEffect(() => {
            
        list_work_organizations();
        //Mora array kao dodatni argument da se ne bi ponavljalo.
    }, [list_work_organizations]);*/
    
    const handleSubmit = (event) => {
        event.preventDefault();
        let forma = event.target; 
        let elements = forma.elements;

        let selectedWorkOrg = props && props.work_organizations && props.work_organizations.list_work_organizations ? props.work_organizations.list_work_organizations.find((item, i) => {
            return props.itemId===item.id;
        }) : null;

        const data = {
            id: selectedWorkOrg.id,
            name: elements["name"].value,
            sec_id: props.sec_id
        }
        props.update_work_organization(data);
        props.modalHide([false]);

    }

    let chosen_organization = props && props.work_organizations && props.work_organizations.list_work_organizations ? props.work_organizations.list_work_organizations.find((item, i) => {
        return props.itemId===item.id;
    }) : null;
        console.log("selectedWorkOrg: ", props);
    return (

        <div className="frame1 container updateWorkOrgs">
            
            <Form onSubmit={(e)=>handleSubmit(e)} className="m-1">
                
                <Form.Group className="mb-1" controlId="workorgid">
                    <Form.Label>Work organization with internal id of "{chosen_organization.id}" will be updated.</Form.Label>
                    <Form.Control type="hidden" name="workorgid" value={chosen_organization.id}/>
                </Form.Group>

                <Form.Group className="mb-1" controlId="workOrgName" key={chosen_organization.name}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter new work organization" defaultValue={chosen_organization.name}/>
                </Form.Group>

                <Button variant="outline-warning" type="submit" className="m-1">
                    Submit
                </Button>
            </Form>

        </div>
    )
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