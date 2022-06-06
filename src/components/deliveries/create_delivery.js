import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import { create_delivery } from "../../actions/delivery/deliveryActions";
import PropTypes from "prop-types";
import { alertShow } from "../../actions/alertActions";
import { alertHide } from "../../actions/alertActions";

class CreateDelivery extends Component {

    constructor(props) {

        super(props);
        this.state = {
          cnt: 0,
          time_in: new Date(),
          time_out: new Date(),
          labelIds: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNoteField = this.addNoteField.bind(this);
        this.removeNoteField = this.removeNoteField.bind(this);
        this.setTimeIn = this.setTimeIn.bind(this);
        this.setTimeOut = this.setTimeOut.bind(this);
        this.labelCheck = this.labelCheck.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
   
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

    setTimeIn(date){
      
      this.setState({
        time_in: date
      });
      
    }

    setTimeOut(date){
      
      this.setState({
        time_out: date
      });

    }

    removeNoteField(){

      this.setState({
        cnt: this.state.cnt-1
      });

    }

    addNoteField(){
      
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

      let sec_id = this.props && this.props.sec_id ? this.props.sec_id : null;
      
      const data = {
        operator_id: elements["employees"].value ? elements["employees"].value : null,
        vehicles: this.state.labelIds ? this.state.labelIds : null,
        delivery_note: delivery_notes ? delivery_notes : null,
        id: sec_id ? sec_id : null,
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

      this.props.create_delivery(data);

    }

    render() {
      
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
          vehicle_id: item.id
        });
        return <Dropdown.Item key={item.id} href={"#"+item.id}>
          <div className="form-check">
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

      return (
        <div>

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
                    selected={this.state.time_in}
                    onChange={(date) => this.setTimeIn(date)}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeIntervals={15}
                    name="time_in"
                    shouldCloseOnSelect={false}
                    className="datepickerCustom"
                  />

                  <DatePicker
                    selected={this.state.time_out}
                    onChange={(date) => this.setTimeOut(date)}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeIntervals={15}
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


create_delivery.propTypes = {
  create_delivery: PropTypes.func.isRequired,
};

alertShow.propTypes = {
    alertShow: PropTypes.func.isRequired,
};
  
alertHide.propTypes = {
    alertHide: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
        alertState: state.alert.alertState,
        alert_purpose: state.alert.alert_purpose
    });

};

export default connect(mapStateToProps, { 
    create_delivery,
    alertShow,
    alertHide
})(CreateDelivery);