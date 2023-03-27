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
import { handleChange } from "../../actions/delivery/deliveryActions";
import { setTimeIn } from "../../actions/delivery/deliveryActions";
import { setTimeOut } from "../../actions/delivery/deliveryActions";
import { addNoteField } from "../../actions/delivery/deliveryActions";
import { removeNoteField } from "../../actions/delivery/deliveryActions";
import PropTypes from "prop-types";
import { alertShow } from "../../actions/alertActions";
import { alertHide } from "../../actions/alertActions";
import { get_vehicles } from "../../actions/vehicles/vehicleActions";
import { useEffect } from 'react';

function CreateDelivery(props){
    
    const { get_vehicles } = props;
    useEffect(() => {
            
      get_vehicles();
        //Mora array kao dodatni argument da se ne bi ponavljalo.
    }, [get_vehicles]);

    const handleSubmit = (e) => {
      e.preventDefault();
      let forma = e.target; 
      let elements = forma.elements;

      let delivery_notes = [];
      let cnt = props && props.cnt ? props.cnt : null;
      for(let i=0;i<=cnt;i++){

        delivery_notes.push(elements["delivery_note"+i].value);

      }

      let sec_id = props && props.sec_id ? props.sec_id : null;
      
      let labelIds = props && props.labelIds ? props.labelIds : null;

      const data = {
        operator_id: elements["employees"].value ? elements["employees"].value : null,
        vehicles: labelIds ? labelIds : null,
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
      
      props.create_delivery(data);

    }
    
    let option1 = [<option key={""} value={""}>Choose employee</option>];
    let employees = props.employees && props.employees.list_employees ? props.employees.list_employees.map((item, i) => {
      return <option key={item.id} value={item.id}>{item.lastName+" "+item.firstName}</option>
    }) : null;

    if(employees && employees.length > 0){

      option1.push(...employees);

    }

    let employeeSelect = <Form.Select id="employees" className="item1" aria-label="Default select example" name="employees">
      {option1}
    </Form.Select>;

    let cnt = props && props.cnt ? props.cnt : null;
    let labelIds = props && props.labelIds ? props.labelIds : null;
    let time_in = props && props.time_in ? props.time_in : null;
    let time_out = props && props.time_out ? props.time_out : null;

    let option2 = [];
    //console.log("props.labelIds: ", props);
    let vehicles = props.vehicles && props.vehicles.list_vehicles ? props.vehicles.list_vehicles.map((item, i) => {
      let obj = JSON.stringify({
        vehicle_id: item.id
      });
      return <Dropdown.Item key={item.id} href={"#"+item.id}>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" key={"x"+item.id} value={obj} checked={labelIds.indexOf(item.id) > -1 ? true : false} onChange={() => {props.handleChange(item.id)}}/>
          <label key={"y"+item.id} className="form-check-label" htmlFor="flexCheckDefault" onClick={() => {props.handleChange(item.id)}}>
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

    for(let i=0;i<=cnt;i++){

      delivery_notes_arr.push(<Form.Group className="item3 item3Custom" key={"delivery-notes"+i}>
        <Form.Control id={"delivery_note"+i} key={i} placeholder="Enter new delivery note"  name={"delivery_note"+i}/>
        </Form.Group>
      );

    }
    
    let errors = props && props.errors && props.errors.errors && props.errors.errors.messages ? props.errors.errors.messages : null;

    return (
      <div>

        <Form onSubmit={(e)=>handleSubmit(e)} className="grid-container">

          {employeeSelect}
          {vehicleSelect}
          {delivery_notes_arr}
          <Button variant="outline-info" className="item4" onClick={()=>props.addNoteField() }>
              Add note
          </Button>

          <Button variant="outline-info" className="item4" onClick={()=> props.removeNoteField() }>
              Remove note
          </Button>

          <Form.Group className="" controlId="load_place">
            <Form.Control type="text" placeholder="Load place" name="load_place" />
          </Form.Group>

          <Form.Group className="" controlId="unload_place">
            <Form.Control type="text" placeholder="Unload place" name="unload_place" />
          </Form.Group>

          <DatePicker
            selected={time_in}
            onChange={(date) => props.setTimeIn(date)}
            showTimeSelect
            dateFormat="dd/MM/yyyy HH:mm"
            timeIntervals={15}
            name="time_in"
            shouldCloseOnSelect={false}
            className="datepickerCustom"
          />

          <DatePicker
            selected={time_out}
            onChange={(date) => props.setTimeOut(date)}
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

        {errors && errors.length ? <Alert className="mt-2" variant="danger" show={props.alertState} onClick={() => props.alertHide([false])} dismissible>
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

addNoteField.propTypes = {
  addNoteField: PropTypes.func.isRequired,
};

removeNoteField.propTypes = {
  removeNoteField: PropTypes.func.isRequired,
};

setTimeIn.propTypes = {
  setTimeIn: PropTypes.func.isRequired,
};

setTimeOut.propTypes = {
  setTimeOut: PropTypes.func.isRequired,
};

handleChange.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

create_delivery.propTypes = {
  create_delivery: PropTypes.func.isRequired,
};

alertShow.propTypes = {
    alertShow: PropTypes.func.isRequired,
};
  
alertHide.propTypes = {
    alertHide: PropTypes.func.isRequired,
};

get_vehicles.propTypes = {
  get_vehicles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 

    return ({
        alertState: state.alert.alertState,
        alert_purpose: state.alert.alert_purpose,
        cnt: state.deliveries.cnt,
        time_in: state.deliveries.time_in,
        time_out: state.deliveries.time_out,
        labelIds: state.deliveries.labelIds
    });

};

export default connect(mapStateToProps, { 
    create_delivery,
    alertShow,
    alertHide,
    handleChange,
    setTimeIn,
    setTimeOut,
    addNoteField,
    removeNoteField,
    get_vehicles
})(CreateDelivery);