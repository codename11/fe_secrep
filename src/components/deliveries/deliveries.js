import { Component } from 'react'
import {connect} from "react-redux";
import { get_vehicles } from "../../actions/vehicles/vehicleActions";
import { get_employees } from "../../actions/employees/employeeActions";
import { modalShow } from "../../actions/modalActions";
import { modalHide } from "../../actions/modalActions";
import PropTypes from "prop-types";
import Accordion from 'react-bootstrap/Accordion';
import { get_deliveries } from "../../actions/delivery/deliveryActions";
import CreateDelivery from '../deliveries/create_delivery';

class Deliveries extends Component {

    constructor(props) {

        super(props);
        this.state = {
          
        };

    }

    componentDidMount(){
      this.props.get_employees();
      this.props.get_vehicles();
      this.props.get_deliveries();
    }

    render() {
      console.log("deliveries: ", this.props);
      return (
        <div>
          
          <Accordion defaultActiveKey="0">

            <Accordion.Item eventKey="0">
                <Accordion.Header>Create new delivery</Accordion.Header>
                <Accordion.Body className="accordion-custom">

                  <CreateDelivery sec_id={this.props.auth.user.id} employees={this.props.employees} vehicles={this.props.vehicles} errors={this.props.errors}/>

                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
                <Accordion.Header>List deliveries</Accordion.Header>
                <Accordion.Body>

                    List Deliveries

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
  list_deliveries: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
      auth: state.auth.auth,
      tabKey: state.key.tabKey,
      vehicles: state.vehicles,
      modalState: state.modalState.modalState,
      itemId: state.modalState.itemId,
      modal_purpose: state.modalState.modal_purpose,
      employees: state.employees,
      deliveries: state.deliveries,
      errors: state.errors
    });

};

export default connect(mapStateToProps, { 
  get_vehicles,
  get_employees,
  get_deliveries,
})(Deliveries);