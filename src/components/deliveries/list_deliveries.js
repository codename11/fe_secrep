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
import { create_delivery } from "../../actions/delivery/deliveryActions";
import { get_deliveries } from "../../actions/delivery/deliveryActions";
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import { alertShow } from "../../actions/alertActions";
import { alertHide } from "../../actions/alertActions";

class Deliveries extends Component {

    constructor(props) {

        super(props);
        this.state = {
          cnt: 0,
          date: new Date(),
          labelIds: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNoteField = this.addNoteField.bind(this);
        this.removeNoteField = this.removeNoteField.bind(this);
        this.setDate = this.setDate.bind(this);
        this.labelCheck = this.labelCheck.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
      this.props.get_employees();
      this.props.get_vehicles();
      this.props.get_deliveries();
    }

    handleChange(itemId){

      let arr1 = [...this.state.labelIds];
      let index = arr1.indexOf(itemId);
      if(index > -1){
        arr1.splice(index, 1);
      }
      else{
        arr1.push(itemId);
      }

      this.setState({
        labelIds: [...arr1]
      });

    }

    labelCheck(itemId){

      let arr1 = [...this.state.labelIds];
      let index = arr1.indexOf(itemId);
      if(index > -1){
        arr1.splice(index, 1);
      }
      else{
        arr1.push(itemId);
      }

      this.setState({
        labelIds: [...arr1]
      });

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

      let delivery_notes = [];
      for(let i=0;i<=this.state.cnt;i++){

        delivery_notes.push(elements["delivery_note"+i].value);

      }
      console.log("delivery_notes:: ", delivery_notes);
      let sec_id = this.props && this.props.auth && this.props.auth.user ? this.props.auth.user.id : null;
      
      const data = {
        operator_id: elements["employees"].value ? elements["employees"].value : null,
        vehicles: this.state.labelIds ? this.state.labelIds : null,
        delivery_note: delivery_notes ? delivery_notes : null,
        sec_id: sec_id ? sec_id : null,
        time_in: elements["time_in"].value ? elements["time_in"].value : null,
        time_out: elements["time_out"].value ? elements["time_out"].value : null,
        comment: elements["comment"].value ? elements["comment"].value : null,
        load_place: elements["load_place"].value ? elements["load_place"].value : null,
        unload_place: elements["unload_place"].value ? elements["unload_place"].value : null,
      };

      let errors = {
        type: "validation",
        origin: "create_delivery",
        messages: []
      };
      
      for(const [key, value] of Object.entries(data)){

        if(value){

          

        }
        else{

          errors.messages.push([`${key}`+" is required"]);

        }
        
      }

      let tmp = errors ? errors : data;
      console.log("dataxxx: ", data);
      this.props.create_delivery(data);

    }

    render() {
      console.log("deliveries: ", this.state.labelIds);

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
            <input className="form-check-input" type="checkbox" key={"x"+item.id} value={obj} checked={this.state.labelIds.indexOf(item.id) > -1 ? true : false} onChange={() => this.handleChange(item.id)}/>
            <label key={"y"+item.id} class="form-check-label" for="flexCheckDefault" onClick={() => this.labelCheck(item.id)}>
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
      
      let errors = this.props && this.props.errors && this.props.errors.errors && this.props.errors.errors.messages ? this.props.errors.errors.messages : null;

      //console.log("delivery_note: ", this.state);
      console.log("deliveryState: ", this.state.labelIds);
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

            {errors && errors.length ? <Alert className="mt-2" variant="danger" show={this.props.alertState} onClick={() => this.props.alertHide([false])} dismissible>
            <Alert.Heading>There were {errors && errors.length ? "errors:" : null}</Alert.Heading>
            
            <ListGroup variant="flush">
                {errors && errors.length>0 ? errors.map((item, i) => {
                    return <ListGroup.Item variant="danger" key={i}>{item}</ListGroup.Item>;
                }) : null}
            </ListGroup>
            </Alert> : null}


        </div>
      )
  }
}

get_vehicles.propTypes = {
  get_vehicles: PropTypes.func.isRequired,
};

create_delivery.propTypes = {
  get_deliveries: PropTypes.func.isRequired,
};

get_deliveries.propTypes = {
  list_deliveries: PropTypes.func.isRequired,
};

alertShow.propTypes = {
  alertShow: PropTypes.func.isRequired,
};

alertHide.propTypes = {
  alertHide: PropTypes.func.isRequired,
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
      errors: state.errors,
      alertState: state.alert.alertState,
      alert_purpose: state.alert.alert_purpose
    });

};

export default connect(mapStateToProps, { 
  get_vehicles,
  get_employees,
  create_delivery,
  get_deliveries,
  alertShow,
  alertHide
})(Deliveries);