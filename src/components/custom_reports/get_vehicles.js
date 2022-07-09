import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
import Table from 'react-bootstrap/Table';
import PropTypes from "prop-types";
import Accordion from 'react-bootstrap/Accordion';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { get_vehicles } from "../../actions/custom_reports/customReportsActions";
import ListGroup from 'react-bootstrap/ListGroup';

class GetVehicles extends Component {

    constructor(props) {

        super(props);
        this.state = {
            time_in: new Date(),
            time_out: new Date(),
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setTimeIn = this.setTimeIn.bind(this);
        this.setTimeOut = this.setTimeOut.bind(this);

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
    
    async handleSubmit(event) {
        event.preventDefault();
        let forma = event.target; 
        let elements = forma.elements;
        let len1 = elements.length;

        let data = {};
        let len2 = 0;
        for(let key in elements){
            if(elements[key].type==="checkbox" && elements[key].checked){  
                data.vehicle = [];
                len2++;
            }
        }

        for(let i=0;i<len1;i++){

            if(elements[i].type==="checkbox" && elements[i].checked && elements[i].value){  
                data.vehicle.push(elements[i].value);
            }

            if(elements[i].type!=="checkbox" && elements[i].value){  
                data[elements[i].name] = elements[i].value;
            }

        }
        
        this.props.get_vehicles(data);
    }
/*
if(item==="user" || item==="type" || item==="workOrganization" || item==="complements" || item==="deliveries"){

                return <ListGroup.Item></ListGroup.Item>;

            }
*/
    render() {
        console.log("customGetVehicles: ", this.props);
        let vehicleList = this.props && this.props.list_vehicles && this.props.list_vehicles.length>0 ? this.props.list_vehicles : null;
        let list_vehicles = vehicleList && vehicleList.length>0 ? vehicleList.map((item, i) => {
            return <option key={item.id} value={item.id}>{item.registration}</option>
        }) : null;

        if(list_vehicles){
            list_vehicles.unshift(<option key="tmp" value="">Choose vehicle</option>);
        }

        let lista = [];
        if(vehicleList && vehicleList.length>0){

            for(let i=0;i<vehicleList.length;i++){

                let subObj1 = [];
                let tmp1 = vehicleList ? Object.keys(vehicleList[i]).map(item1 => {
                    
                    if(vehicleList[i].hasOwnProperty("user")){

                        console.log("isObject: ", vehicleList[i] instanceof Object);

                    }
                    return item1;

                }) : null;
                
                lista[i] = <div><div>{i+": "}</div>{tmp1}</div>;

            }

        }
        
        return (
        <div>
            <Form onSubmit={this.handleSubmit} name="myForm" className="grid-container f1">

                <DatePicker
                    selected={this.state.time_in}
                    onChange={(date) => this.setTimeIn(date)}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeIntervals={15}
                    name="time_in"
                    shouldCloseOnSelect={false}
                    className="itemGV1"
                />

                <DatePicker
                    selected={this.state.time_out}
                    onChange={(date) => this.setTimeOut(date)}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeIntervals={15}
                    name="time_out"
                    shouldCloseOnSelect={false}
                    className="itemGV2"
                />

                <Form.Select className="itemGV3" aria-label="Default select example" name="vehicle_id" id="vehicle_id">
                    {list_vehicles}
                </Form.Select>

                <div className="itemGV4 grid-container">

                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        label="User"
                        name="user"
                        value="user"
                    />

                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        label="Type"
                        name="type"
                        value="type"
                    />

                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        label="WorkOrg"
                        name="workOrganization"
                        value="workOrganization"
                    />

                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        label="Complements"
                        name="complements"
                        value="complements"
                    />

                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        label="Deliveries"
                        name="deliveries"
                        value="deliveries"
                    />

                </div>

                <Button className="itemGV5" name="button" variant="outline-success" type="submit">
                    Klik
                </Button>

            </Form>

            {lista}

        </div>
      )
  }
}

get_vehicles.propTypes = {
    get_vehicles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
        list_vehicles: state.vehicles.list_vehicles,
    });

};

export default connect(mapStateToProps, { 
    get_vehicles,
})(GetVehicles);