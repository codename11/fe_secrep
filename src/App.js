import React, { Component } from 'react'
import Register from './components/auth/register';
import Container from 'react-bootstrap/Container';
import { connect } from "react-redux";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { setTab } from "./actions/tabActions";
import Login from './components/auth/login';
import ListVehicles from './components/vehicles/list_vehicles';

class App extends Component {

  constructor(props) {

    super(props);
    this.test = this.test.bind(this);
  }

  test(){
    //console.log("test: ", this.props);
  }

  render() {
    console.log("app: ", this.props);
    let tabKey = this.props.tabKey;
    let access_token = this.props && this.props.auth && this.props.auth.access_token ? this.props.auth.access_token : null;

    return (
      <Container className="container">
        
        <Tabs id="controlled-tab-example" activeKey={tabKey} onSelect={(tabKey)=> this.props.setTab(tabKey)} className="mb-3">
          
          <Tab eventKey="register_tab" title="Register">
            <Register/>
          </Tab>

          <Tab eventKey="login_tab" title="Login">
            <Login/>
          </Tab>

          <Tab eventKey="list_vehicles_tab" title="List_Vehicles">
            {access_token!==null ? <ListVehicles/> : null}
          </Tab>

        </Tabs>
      </Container>
    )
  }
}

const mapStateToProps = (state) =>{ 

  return ({
    tabKey: state.key.tabKey,
    auth: state.auth.auth,
    vehicles: state.vehicles,
    vehicle_types: state.list_vehicle_types,
    work_organizations: state.list_work_organizations,
    modalState: state.modalState,
    vehicleId: state.modalState.vehicleId,
    deleted_vehicle_id: state.deleted_vehicle_id
  });

};

export default connect(mapStateToProps, { setTab })(App);