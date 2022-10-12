import {connect} from "react-redux";
import { get_vehicles } from "../../actions/vehicles/vehicleActions";
import { get_employees } from "../../actions/employees/employeeActions";
import PropTypes from "prop-types";
import Accordion from 'react-bootstrap/Accordion';
import { get_deliveries } from "../../actions/delivery/deliveryActions";
import CreateDelivery from '../deliveries/create_delivery';
import ListDeliveries from '../deliveries/list_deliveries';
import { list_permissions } from "../../actions/special_permission/special_permissionActions";
import { useEffect } from 'react'

function Deliveries(props){

  const { get_employees, get_vehicles, get_deliveries, list_permissions } = props;
  useEffect(() => {
        
    get_employees();
    get_vehicles();
    get_deliveries();
    list_permissions();
    //Mora array kao dodatni argument da se ne bi ponavljalo.
  }, [get_employees, get_vehicles, get_deliveries, list_permissions]);

  return (
    <div>
      
      <Accordion defaultActiveKey="1">

        <Accordion.Item eventKey="0">
            <Accordion.Header>Create new delivery</Accordion.Header>
            <Accordion.Body className="accordion-custom">

              <CreateDelivery sec_id={props.auth.user.id} employees={props.employees} vehicles={props.vehicles} errors={props.errors}/>

            </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
            <Accordion.Header>List deliveries</Accordion.Header>
            <Accordion.Body>

                <ListDeliveries sec_id={props.auth.user.id} access_token={props.auth.access_token} list_deliveries={props.deliveries.list_deliveries}/>
                
            </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    
    </div>
  )
}

list_permissions.propTypes = {
  list_permissions: PropTypes.func.isRequired,
};

get_employees.propTypes = {
  get_vehicles: PropTypes.func.isRequired,
};

get_vehicles.propTypes = {
  get_vehicles: PropTypes.func.isRequired,
};

get_deliveries.propTypes = {
  list_deliveries: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
      auth: state.auth.auth,
      tabKey: state.key.tabKey,
      vehicles: state.vehicles,
      employees: state.employees,
      deliveries: state.deliveries,
      errors: state.errors,
      special_permissions: state.special_permissions
    });

};

export default connect(mapStateToProps, { 
  get_vehicles,
  get_employees,
  get_deliveries,
  list_permissions
})(Deliveries);