import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
import { get_vehicles } from "../../actions/vehicles/vehicleActions";
import { get_employees } from "../../actions/employees/employeeActions";
//import { list_work_organizations } from "../../actions/work_organizations/workOrganizationsActions";
//import Table from 'react-bootstrap/Table';
//import CustomModal from '../subcomponents/CustomModal';
import { modalShow } from "../../actions/modalActions";
import { modalHide } from "../../actions/modalActions";
import PropTypes from "prop-types";
//import DeleteVehicle from '../vehicles/delete_vehicle';
//import UpdateVehicle from '../vehicles/update_vehicle';
//import CreateVehicle from '../vehicles/create_vehicle';
import Accordion from 'react-bootstrap/Accordion';
import Dropdown from 'react-bootstrap/Dropdown';

class Deliveries extends Component {

    constructor(props) {

        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
      //this.props.get_vehicle_types();
      //this.props.list_work_organizations();
      //this.props.get_vehicles();
    }
    
    async handleSubmit(event) {
      event.preventDefault();
      let forma = event.target; 
      let elements = forma.elements;
      let len1 = elements.length;

      let vehicles = Object.values(elements).filter((item, i) => {
        return item.className === "form-check-input" && item.checked ? item : null;
      }).map((item, i) => JSON.parse(item.value));

      const data = {
        operator_id: elements["employees"].value,
        vehicles: vehicles
      };
      
      
      console.log("test: ", data);

    }

    render() {
      console.log("deliveries: ", this.props);

      let option1 = [<option key={""} value={""}>Choose employee</option>];
      let employees = this.props.employees && this.props.employees.list_employees ? this.props.employees.list_employees.map((item, i) => {
        return <option key={item.id} value={item.id}>{item.lastName+" "+item.firstName}</option>
      }) : null;

      if(employees && employees.length > 0){

        option1.push(...employees);

      }

      let employeeSelect = <Form.Select id="employees" className="m-1" aria-label="Default select example" name="employees">
        {option1}
      </Form.Select>;

      let option2 = [];
      let vehicles = this.props.vehicles && this.props.vehicles.list_vehicles ? this.props.vehicles.list_vehicles.map((item, i) => {
        let obj = JSON.stringify({
          vehicle_id: item.id,
          //[item.type.name+"_id"]: item.type.id
        });
        return <Dropdown.Item key={item.id} href={"#"+item.id}>
          <div class="form-check">
            <input className="form-check-input" type="checkbox" key={"x"+item.id} value={obj}/>
            <label key={"y"+item.id} class="form-check-label" for="flexCheckDefault">
              {item.registration}
            </label>
          </div>
        </Dropdown.Item>
      }) : null;

      if(vehicles && vehicles.length > 0){

        option2.push(...vehicles);

      }

      let vehicleSelect = <Dropdown autoClose="outside">
          <Dropdown.Toggle variant="basic" id="dropdown-basic">
            Choose vehicles
          </Dropdown.Toggle>
          <Dropdown.Menu id="vehicles" className="m-1">
            {option2}
          </Dropdown.Menu>
        </Dropdown>;
      
      return (
        <div>
          
          <Accordion defaultActiveKey="0">

            <Accordion.Item eventKey="0">
                <Accordion.Header>Create new delivery</Accordion.Header>
                <Accordion.Body>

                <Form onSubmit={this.handleSubmit}>

                  {employeeSelect}
                  {vehicleSelect}

                  <Button variant="outline-primary" type="submit" className="m-1">
                      Submit
                  </Button>
                </Form>

                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
                <Accordion.Header>List deliveries</Accordion.Header>
                <Accordion.Body>

                    Deliveries

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

const mapStateToProps = (state) =>{ 
    
    return ({
      auth: state.auth.auth,
      tabKey: state.key.tabKey,
      vehicles: state.vehicles,
      modalState: state.modalState.modalState,
      itemId: state.modalState.itemId,
      modal_purpose: state.modalState.modal_purpose,
      employees: state.employees
    });

};

export default connect(mapStateToProps, { 
  get_vehicles,
  get_employees
})(Deliveries);