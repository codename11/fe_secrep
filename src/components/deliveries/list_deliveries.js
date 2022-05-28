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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Deliveries extends Component {

    constructor(props) {

        super(props);
        this.state = {
          cnt: 0,
          date: new Date()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNoteField = this.addNoteField.bind(this);
        this.removeNoteField = this.removeNoteField.bind(this);
        this.setDate = this.setDate.bind(this);
    }

    componentDidMount(){
      //this.props.get_vehicle_types();
      this.props.get_employees();
      this.props.get_vehicles();
    }

    setDate(date){

      this.setState({
        date: date
      });

    }

    removeNoteField(e){

      this.setState({
        cnt: this.state.cnt-1
      });

    }

    addNoteField(e){
      
      this.setState({
          cnt: this.state.cnt+1
      });
      
    }
    
    async handleSubmit(event) {
      event.preventDefault();
      let forma = event.target; 
      let elements = forma.elements;
      let len1 = elements.length;

      let vehicles = Object.values(elements).filter((item, i) => {
        return item.className === "form-check-input" && item.checked ? item : null;
      }).map((item, i) => JSON.parse(item.value));

      let delivery_notes = [];
      for(let i=0;i<=this.state.cnt;i++){

        delivery_notes.push({
          [elements["delivery_note"+i].name]: elements["delivery_note"+i].value
        });

      }

      let sec_id = this.props && this.props.auth && this.props.auth.user? this.props.auth.user.id : null;
      
      const data = {
        operator_id: elements["employees"].value,
        vehicles: vehicles,
        delivery_note: delivery_notes,
        sec_id: sec_id,
        time_in: elements["time_in"].value,
        time_out: elements["time_out"].value,
        comment: elements["comment"].value,
        load_place: elements["load_place"].value,
        unload_place: elements["unload_place"].value,
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

      let employeeSelect = <Form.Select id="employees" className="item1" aria-label="Default select example" name="employees">
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

      let vehicleSelect = <Dropdown autoClose="outside" className="item1">
          <Dropdown.Toggle variant="basic" id="dropdown-basic">
            Choose vehicles
          </Dropdown.Toggle>
          <Dropdown.Menu id="vehicles" className="m-1">
            {option2}
          </Dropdown.Menu>
      </Dropdown>;
      
      let delivery_notes_arr = [];

      for(let i=0;i<=this.state.cnt;i++){

        delivery_notes_arr.push(<Form.Group className="item3 item3Custom" key={"delivery-notes"+i}>
          <Form.Control id={"delivery_note"+i} key={i} placeholder="Enter new delivery note"  name={"delivery_note"+i}/>
          </Form.Group>
        );

      }
      
      console.log("delivery_note: ", this.state);
      
      return (
        <div>
          
          <Accordion defaultActiveKey="0">

            <Accordion.Item eventKey="0">
                <Accordion.Header>Create new delivery</Accordion.Header>
                <Accordion.Body className="accordion-custom">

                <Form onSubmit={this.handleSubmit} className="grid-container">

                  {employeeSelect}
                  {vehicleSelect}
                  {delivery_notes_arr}
                  <Button variant="outline-info" className="item4" onClick={this.addNoteField}>
                      Add note
                  </Button>

                  <Button variant="outline-info" className="item4" onClick={this.removeNoteField}>
                      Remove note
                  </Button>

                  <Form.Group className="" controlId="load_place">
                    <Form.Control type="text" placeholder="Load place" name="load_place" />
                  </Form.Group>

                  <Form.Group className="" controlId="unload_place">
                    <Form.Control type="text" placeholder="Unload place" name="unload_place" />
                  </Form.Group>

                  <DatePicker
                    selected={this.state.date}
                    onChange={(date) => this.setDate(date)}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:MM"
                    name="time_in"
                    shouldCloseOnSelect={false}
                    className="datepickerCustom"
                  />

                  <DatePicker
                    selected={this.state.date}
                    onChange={(date) => this.setDate(date)}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:MM"
                    name="time_out"
                    shouldCloseOnSelect={false}
                    className="datepickerCustom"
                    />

                  <Form.Group className="item6" controlId="comment">
                    <Form.Control as="textarea" rows={3} name="comment" placeholder="Comment"/>
                  </Form.Group>

                  <Button variant="outline-primary" type="submit" className="item5">
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