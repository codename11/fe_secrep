import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Accordion from 'react-bootstrap/Accordion';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { get_vehicles_custom } from "../../actions/custom_reports/customReportsActions";
import { toCSV } from "../../actions/custom_reports/customReportsActions";
import {setTimeIn} from "../../actions/custom_reports/customReportsActions";
import {setTimeOut} from "../../actions/custom_reports/customReportsActions";
import Pagination from 'react-bootstrap/Pagination';
import {setPageNumber} from "../../actions/custom_reports/customReportsActions";

class GetVehicles extends Component {

    constructor(props) {

        super(props);
        this.state = {
            pageIndex: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setActive = this.setActive.bind(this);

    }

    componentDidMount(){
      
        this.props.get_vehicles_custom();

    }

    setActive(e, i){

        this.props.setPageNumber(e, i);
        let pagination = this.props && this.props.pagination ? this.props.pagination : null;
        if(pagination.last_page>1){
            this.setState({
                pageIndex: i
            }, () => {
                this.props.get_vehicles_custom({page: i+1});
            });
        }
        
        console.log("setActive: ", i);
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
        console.log("handleSubmit: ", data);
        this.props.get_vehicles_custom(data);
    }

    render() {
        console.log("getVehiclesProps: ", this.props);
        
        let vehicleList = this.props && this.props.list_vehicles && this.props.list_vehicles.length>0 ? this.props.list_vehicles : null;
        let list_vehicles = vehicleList && vehicleList.length>0 ? vehicleList.map((item, i) => {
            return <option key={item.id} value={item.id}>{item.registration}</option>
        }) : null;

        if(list_vehicles){
            list_vehicles.unshift(<option key="tmp" value="">All vehicles</option>);
        }
        
        let tmp1 = vehicleList && vehicleList.length>0 ? vehicleList.map((item, i) => {

            return <div key={"q"+item.id}>
                <code className="vehicleCustom" key={"x"+item.id}><pre key={"y"+item.id}>{JSON.stringify(item, null, 4)}</pre></code>
            </div>;

        }) : null;

        let href = this.props && this.props.href ? this.props.href : null;

        let accordionVehicleList = <div className="itemGV6 grid-container1">{tmp1}
            <a className="btn btn-outline-success" href={href} download="wholeReport" onClick={(e)=>this.props.toCSV(e, vehicleList)}>
                ReportPageDownload
            </a>
        </div>;
        
        let pagination = this.props && this.props.pagination ? this.props.pagination : null;
        let from = pagination && pagination.from ? pagination.from : null;
        let to = pagination && pagination.to ? pagination.to : null;
        let current_page = pagination && pagination.current_page ? pagination.current_page : null;
        let last_page = pagination && pagination.last_page ? pagination.last_page : null;
        let index = pagination && pagination.index ? pagination.index : null;
        let pageIndex = this.state && this.state.pageIndex ? this.state.pageIndex : 0;
        
        let arr1 = [];

        for(let i=0;i<last_page;i++){
            arr1.push(<Pagination.Item key={i} active={pageIndex===i} page={i+1} onClick={(e)=>{this.setActive(e, i)}}>
            {i+1}
        </Pagination.Item>);
        }
        let pagesArr = [...arr1];//Generated array from number.
        
        return (
        <div>
            <Form onSubmit={this.handleSubmit} name="myForm" className="grid-container f1">
                
                <Form.Group className="mb-3 per_page" controlId="per_page">
                    <Form.Control name="per_page" type="number" min={0} max={20} placeholder="Per page" />
                </Form.Group>
                
                <DatePicker
                    selected={this.props.time_in}
                    onChange={(date) => this.props.setTimeIn(date)}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeIntervals={15}
                    name="start_date"
                    shouldCloseOnSelect={false}
                    className="itemGV1"
                    placeholderText={"Please select a date"}
                />

                <DatePicker
                    selected={this.props.time_out}
                    onChange={(date) => this.props.setTimeOut(date)}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeIntervals={15}
                    name="end_date"
                    shouldCloseOnSelect={false}
                    className="itemGV2"
                    placeholderText={"Please select a date"}
                />

                <Form.Select className="itemGV3" aria-label="Default select example" name="vehicle_id" id="vehicle_id">
                    {list_vehicles ? list_vehicles : <option value="">No available vehicles for this date range</option>}
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

                <a className="itemGV7 btn btn-outline-success" name="button2" href={href} download="wholeReport" onClick={(e)=>this.props.toCSV(e)}>
                    WholeReportDownload
                </a>

                <Button className="itemGV5" name="button" variant="outline-success" type="submit">
                    Submit
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

get_vehicles_custom.propTypes = {
    get_vehicles_custom: PropTypes.func.isRequired,
};

toCSV.propTypes = {
    toCSV: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
        list_vehicles: state.vehicles.list_vehicles,
        pagination: state.customReports.pagination,
        href: state.customReports.href,
        time_in: state.customReports.time_in,
        time_out: state.customReports.time_out,
        test: state
    });

};

export default connect(mapStateToProps, { 
    toCSV,
    get_vehicles_custom,
    setTimeIn,
    setPageNumber,
    setTimeOut
})(GetVehicles);