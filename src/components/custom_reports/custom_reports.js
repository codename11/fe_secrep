import { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Accordion from 'react-bootstrap/Accordion';
import { get_vehicles } from "../../actions/custom_reports/customReportsActions";
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

    componentDidMount(){
      
        let data1 = {
            "start_date": "17/07/2021 00:00",
            "end_date": "30/07/2023 00:00",
            "vehicle_id": 1,
            "vehicle": [
                "user",
                "type",
                "workOrganization",
                "complements"
            ]
        };
        this.props.get_vehicles(data1);

        let data2 = {
            "start_date": "17/07/2021 00:00",
            "end_date": "30/01/2023 00:00",
            "delivery_id": 75,
            "delivery": [
                "operator",
                "enteredBy",
                "complement"
            ]
        };

        this.props.get_deliveries(data2);

        let data3 = {
            "start_date": "17/07/2021 00:00",
            "end_date": "30/01/2023 00:00",
            "employee_id": 1,
            "employee": [
                "work_organization",
                "enteredBy",
                "deliveries"
            ]
        };

        this.props.get_employees(data3);

        let data4 = {
            "start_date": "17/07/2021 00:00",
            "end_date": "30/01/2023 00:00",
            "user_id": 1,
            "user": [
                "role",
                "vehicles",
                "deliveries",
                "complement",
                "delivery_details",
                "special_permissions",
                "employees"
            ]
        };

        this.props.get_users(data4);

    }

    render() {
      
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

get_vehicles.propTypes = {
    get_vehicles: PropTypes.func.isRequired,
};

get_deliveries.propTypes = {
    get_vehicles: PropTypes.func.isRequired,
};

get_employees.propTypes = {
    get_vehicles: PropTypes.func.isRequired,
};

get_users.propTypes = {
    get_vehicles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
        auth: state.auth.auth,
        tabKey: state.key.tabKey,
        errors: state.errors,
        vehicles: state.vehicles,
        employees: state.employees,
        deliveries: state.deliveries,
        users: state.users
    });

};

export default connect(mapStateToProps, { 
    get_vehicles,
    get_deliveries,
    get_employees,
    get_users
})(CustomReports);