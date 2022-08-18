import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Accordion from 'react-bootstrap/Accordion';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { get_vehicles } from "../../actions/custom_reports/customReportsActions";
import { toCSV } from "../../actions/custom_reports/customReportsActions";
import {setTimeIn} from "../../actions/custom_reports/customReportsActions";
import {setTimeOut} from "../../actions/custom_reports/customReportsActions";
import Pagination from 'react-bootstrap/Pagination';
import {setPageNumber} from "../../actions/custom_reports/customReportsActions";

class GetVehicles extends Component {

    constructor(props) {

        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.test = this.test.bind(this);

    }

    componentDidMount(){
      
        this.props.get_vehicles();

    }

    test(e, i){
        let pagination = this.props && this.props.pagination ? this.props.pagination : null;
        
        console.log("pagination: ", pagination);
        
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

    render() {
        console.log("getVehiclesProps: ", this.props);
        let vehicleList = this.props && this.props.list_vehicles && this.props.list_vehicles.length>0 ? this.props.list_vehicles : null;
        let list_vehicles = vehicleList && vehicleList.length>0 ? vehicleList.map((item, i) => {
            return <option key={item.id} value={item.id}>{item.registration}</option>
        }) : null;

        if(list_vehicles){
            list_vehicles.unshift(<option key="tmp" value="">Choose vehicle</option>);
        }
        
        let tmp1 = vehicleList && vehicleList.length>0 ? vehicleList.map((item, i) => {

            return <Accordion.Item eventKey={item.id} key={"x"+item.id}>
                <Accordion.Header key={"y"+item.id}>{item.registration}</Accordion.Header>
                <Accordion.Body key={"z"+item.id} className="accordion-custom">

                    <code key={"q"+item.id}><pre key={"w"+item.id}>{JSON.stringify(item, null, 4)}</pre></code>

                </Accordion.Body>
            </Accordion.Item>;

        }) : null;
        let accordionVehicleList = <Accordion defaultActiveKey="0" className="itemGV6">{tmp1}</Accordion>;
        
        let href = this.props && this.props.href ? this.props.href : null;
        
        let pagination = this.props && this.props.pagination ? this.props.pagination : null;
        let from = pagination && pagination.from ? pagination.from : null;
        let to = pagination && pagination.to ? pagination.to : null;
        let current_page = pagination && pagination.current_page ? pagination.current_page : null;
        let last_page = pagination && pagination.last_page ? pagination.last_page : null;
        let index = pagination && pagination.index ? pagination.index : null;

        let pagesArr = [...Array(last_page).keys()].map((item, i)=> {
            
            return <Pagination.Item key={i} active={index===i} page={i+1} onClick={(e)=>{this.props.setPageNumber(e,  i);this.test(e, i)}}>
                {i+1}
            </Pagination.Item>;
            
        });//Generated array from number.
        
        return (
        <div>
            <Form onSubmit={this.handleSubmit} name="myForm" className="grid-container f1">

                <DatePicker
                    selected={this.props.time_in}
                    onChange={(date) => this.props.setTimeIn(date)}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeIntervals={15}
                    name="time_in"
                    shouldCloseOnSelect={false}
                    className="itemGV1"
                />

                <DatePicker
                    selected={this.props.time_out}
                    onChange={(date) => this.props.setTimeOut(date)}
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

                <Button className="itemGV7" name="button2" href={href} download="wholeReport"  variant="outline-success" onClick={this.props.toCSV}>
                    WholeReportDownload
                </Button>

                <Button className="itemGV5" name="button" variant="outline-success" type="submit">
                    Klik
                </Button>

            </Form>
            {accordionVehicleList}
            <div>
                <Pagination>{pagesArr}</Pagination>
            </div>

        </div>
      )
  }
}

setPageNumber.propTypes = {
    setPageNumber: PropTypes.func.isRequired,
};

setTimeIn.propTypes = {
    setTimeIn: PropTypes.func.isRequired,
};

setTimeOut.propTypes = {
    setTimeOut: PropTypes.func.isRequired,
};

toCSV.propTypes = {
    toCSV: PropTypes.func.isRequired,
};

get_vehicles.propTypes = {
    get_vehicles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
        list_vehicles: state.vehicles.list_vehicles,
        href: state.customReports.href,
        time_in: state.customReports.time_in,
        time_out: state.customReports.time_out,
        pagination: state.customReports.pagination
    });

};

export default connect(mapStateToProps, { 
    get_vehicles,
    toCSV,
    setTimeIn,
    setPageNumber,
    setTimeOut,
})(GetVehicles);