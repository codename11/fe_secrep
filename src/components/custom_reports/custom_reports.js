import { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Accordion from 'react-bootstrap/Accordion';
import { get_deliveries } from "../../actions/custom_reports/customReportsActions";
import { get_employees } from "../../actions/custom_reports/customReportsActions";
import { get_users } from "../../actions/custom_reports/customReportsActions";
import GetVehicles from '../custom_reports/get_vehicles';

class CustomReports extends Component {

    constructor(props) {

        super(props);
        this.state = {
          
        };

    }

    render() {
      //console.log("customRepProps: ", this.props);
      //let list_permissions = this.props && this.props.special_permissions && this.props.special_permissions.list_permissions && this.props.special_permissions.list_permissions.length > 0 ? this.props.special_permissions.list_permissions : null;
      
      return (
        <div>
          
          <Accordion defaultActiveKey="0">

            <Accordion.Item eventKey="0">
                <Accordion.Header>List vehicles</Accordion.Header>
                <Accordion.Body className="accordion-custom">

                  <GetVehicles/>

                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
                <Accordion.Header>List deliveries</Accordion.Header>
                <Accordion.Body>

                  
                    
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
                <Accordion.Header>List employees</Accordion.Header>
                <Accordion.Body>

                  
                    
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
                <Accordion.Header>List users</Accordion.Header>
                <Accordion.Body>

                  
                    
                </Accordion.Body>
            </Accordion.Item>

          </Accordion>
        
        </div>
      )
  }
}

get_deliveries.propTypes = {
    get_deliveries: PropTypes.func.isRequired,
};

get_employees.propTypes = {
    get_employees: PropTypes.func.isRequired,
};

get_users.propTypes = {
    get_users: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
        auth: state.auth.auth,
        tabKey: state.key.tabKey,
        errors: state.errors,
        employees: state.employees,
        deliveries: state.deliveries,
        users: state.users
    });

};

export default connect(mapStateToProps, { 
    get_deliveries,
    get_employees,
    get_users
})(CustomReports);