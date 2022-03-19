import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Component } from 'react'
import {connect} from "react-redux";
import { list_work_organizations } from "../../actions/work_organizations/workOrganizationsActions";
import { create_work_organization } from "../../actions/work_organizations/workOrganizationsActions";
import PropTypes from "prop-types";

class ListWorkOrgs extends Component {

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
      
      this.props.create_work_organization(data);
    }

    render() {
        console.log("workOrgs: ", this.props);

        let workOrgs = this.props.work_organizations.list_work_organizations;
        let workOrg_thead = <tr>
            <th>name</th>
            <th>created_at</th>
            <th>updated_at</th>
            <th>actions</th>
        </tr>;

        let thead = <thead>{workOrg_thead}</thead>;

        let workOrgs_tbody = workOrgs ? workOrgs.map((item, i) => {

            let x1 = new Date(item.created_at);
            let d1Day = x1.getDate();
            let d1Month = x1.getMonth();
            let d1Year = x1.getFullYear();
            let created_at = d1Day+"/"+d1Month+"/"+d1Year;

            let x2 = new Date(item.updated_at);
            let d2Day = x2.getDate();
            let d2Month = x2.getMonth();
            let d2Year = x2.getFullYear();
            let updated_at = d2Day+"/"+d2Month+"/"+d2Year;

            return <tr key={item.id}>
            <td>{item.name}</td>
            <td>{created_at}</td>
            <td>{updated_at}</td>
            <td className="grid-container">
              
              {this.props && this.props.auth && this.props.auth.access_token ? 
                <Button variant="outline-warning m-1" itemID={item.id} onClick={() => console.log("Update")}>Update</Button>
              : null}
              
              {this.props && this.props.auth && this.props.auth.access_token ? 
                <Button variant="outline-danger m-1" itemID ={item.id} onClick={() => console.log("Delete")}>Delete</Button>
               : null}

            </td>
          </tr>

        }) : null;

        let tbody = <tbody>{workOrgs_tbody}</tbody>;

        let workOrgs_table = <Table striped bordered hover size="sm" responsive="sm">
          {thead}
          {tbody}
        </Table>
      
        return (
            <div>
                <div className="frame1 container">
                    <h5>Enter new work organization</h5>
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

                {workOrgs_table}

            </div>
        )
    }
}

list_work_organizations.propTypes = {
    list_work_organizations: PropTypes.func.isRequired,
};

create_work_organization.propTypes = {
    create_work_organization: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
        auth: state.auth.auth,
        work_organizations: state.list_work_organizations,
    });

};

export default connect(mapStateToProps, { 
    list_work_organizations, 
    create_work_organization
})(ListWorkOrgs);