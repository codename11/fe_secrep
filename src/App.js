import React, { Component } from 'react'
import Register from './components/auth/register';
import Container from 'react-bootstrap/Container';
import { connect } from "react-redux";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { setTab } from "./actions/tabActions";
import Login from './components/auth/login';
import Vehicles from './components/vehicles/list_vehicles';
import { get_vehicles } from "./actions/vehicles/vehicleActions";
import { get_vehicle_types } from "./actions/vehicle_types/vehicleTypesActions";
import { list_work_organizations } from "./actions/work_organizations/workOrganizationsActions";
import WorkOrgs from './components/work_organizations/list_work_organizations';
import PropTypes from "prop-types";
import Employees from './components/employees/list_employees';
import Deliveries from './components/deliveries/deliveries';
import SpecialPermissions from './components/special_permissions/special_permissions';
import CustomReports from './components/custom_reports/custom_reports';

class App extends Component {

  constructor(props) {

    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(tabKey){

    if(this.props && this.props.auth && this.props.auth.access_token && tabKey==="vehicles_tab"){

      this.props.get_vehicles(); 
      this.props.get_vehicle_types(); 
      this.props.list_work_organizations();

    }
    
  }

  render() {
    
    let tabKey = this.props.tabKey;
    let access_token = this.props && this.props.auth && this.props.auth.access_token ? this.props.auth.access_token : null;

    return (
      <Container className="container">
        
        <Tabs id="controlled-tab-example" activeKey={tabKey} onSelect={(tabKey)=> {
          this.props.setTab(tabKey); this.handleSelect(tabKey);
          }} className="mb-3">
          
          <Tab eventKey="register_tab" title="Register">
            <Register/>
          </Tab>

          <Tab eventKey="login_tab" title="Login">
            <Login/>
          </Tab>

          {access_token!==null ? 
            <Tab eventKey="vehicles_tab" title="Vehicles">
              {tabKey==="vehicles_tab" ? <Vehicles/> : null}
            </Tab> 
          : null}

          {access_token!==null ?
            <Tab eventKey="work_organization_tab" title="Work_Organizations">
              {tabKey==="work_organization_tab" ? <WorkOrgs/> : null}
            </Tab> 
          : null}

          {access_token!==null ?
            <Tab eventKey="employees_tab" title="Employees">
              {tabKey==="employees_tab" ? <Employees/> : null}
            </Tab> 
          : null}

          {access_token!==null ?
            <Tab eventKey="deliveries_tab" title="Deliveries">
                {tabKey==="deliveries_tab" ? <Deliveries/> : null}
            </Tab> 
          : null}

          {access_token!==null ?
            <Tab eventKey="special_permissions_tab" title="Special Permissions">
                {tabKey==="special_permissions_tab" ? <SpecialPermissions/> : null}
            </Tab> 
          : null}

          {access_token!==null ?
            <Tab eventKey="custom_reports_tab" title="Custom Reports">
                {tabKey==="custom_reports_tab" ? <CustomReports/> : null}
            </Tab> 
          : null}
          
        </Tabs>

      </Container>
    )
  }
}

get_vehicles.propTypes = {
  get_vehicles: PropTypes.func.isRequired,
};

get_vehicle_types.propTypes = {
  get_vehicle_types: PropTypes.func.isRequired,
};

list_work_organizations.propTypes = {
  list_work_organizations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 

  return ({
    tabKey: state.key.tabKey,
    auth: state.auth.auth,
    vehicles: state.vehicles,
    vehicle_types: state.list_vehicle_types,
    work_organizations: state.list_work_organizations,
    modalState: state.modalState,
    itemId: state.modalState.itemId,
    deleted_vehicle_id: state.deleted_vehicle_id
  });

};

export default connect(mapStateToProps, { 
  setTab,
  get_vehicles,
  get_vehicle_types,
  list_work_organizations
 })(App);