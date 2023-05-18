import {connect} from "react-redux";
import PropTypes from "prop-types";
import Accordion from 'react-bootstrap/Accordion';
import { get_deliveries } from "../../actions/custom_reports/customReportsActions";
import { get_employees } from "../../actions/custom_reports/customReportsActions";
import { get_users } from "../../actions/custom_reports/customReportsActions";
import GetVehicles from '../custom_reports/get_vehicles';
import GetDeliveries from '../custom_reports/get_deliveries';
import GetEmployees from '../custom_reports/get_employees';
import GetUsers from '../custom_reports/get_users';

function CustomReports(props){

    return (
        <div>
            
            <Accordion defaultActiveKey="0">

                <Accordion.Item eventKey="0">
                    <Accordion.Header>Vehicles</Accordion.Header>
                    <Accordion.Body className="accordion-custom">

                        <GetVehicles/>

                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Deliveries</Accordion.Header>
                    <Accordion.Body>

                        <GetDeliveries get_deliveries={props.get_deliveries}/>
                        
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>Employees</Accordion.Header>
                    <Accordion.Body>
                        
                        <GetEmployees get_employees={props.get_employees}/>

                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header>Users</Accordion.Header>
                    <Accordion.Body>

                    <GetUsers get_users={props.get_users}/>
                        
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
        
        </div>
    )
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