import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { get_vehicles_custom } from "../../actions/custom_reports/customReportsActions";
import { toCSV } from "../../actions/custom_reports/customReportsActions";
import {setTimeIn} from "../../actions/custom_reports/customReportsActions";
import {setTimeOut} from "../../actions/custom_reports/customReportsActions";
import Pagination from 'react-bootstrap/Pagination';
import {setPageNumber} from "../../actions/custom_reports/customReportsActions";
import {set_per_page} from "../../actions/custom_reports/customReportsActions";

class GetVehicles extends Component {

    constructor(props) {

        super(props);
        this.state = {
            pageIndex: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setActive = this.setActive.bind(this);
        this.handleSubmitPerPage = this.handleSubmitPerPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.firstPage = this.firstPage.bind(this);
        this.lastPage = this.lastPage.bind(this);

    }

    componentDidMount(){
      
        this.props.get_vehicles_custom();

    }

    firstPage(){
        this.setState({
            pageIndex: 0
        }, ()=>{
            this.props.get_vehicles_custom({page: this.state.pageIndex+1});
        });
    }

    lastPage(){
        this.setState({
            pageIndex: this.props.pagination.last_page-1
        }, ()=>{
            this.props.get_vehicles_custom({page: this.state.pageIndex+1});
        });
    }

    prevPage(){

        let pagination = this.props && this.props.pagination ? this.props.pagination : null;
        let first = 0;
        let last = pagination.last_page;

        this.setState({
            pageIndex: this.state.pageIndex-1 >= first ? this.state.pageIndex-1 : last-1
        }, ()=>{
            this.props.get_vehicles_custom({page: this.state.pageIndex+1});
        });

    }

    nextPage(){

        let pagination = this.props && this.props.pagination ? this.props.pagination : null;
        let first = 0;
        let last = pagination.last_page;

        this.setState({
            pageIndex: this.state.pageIndex+1 <= last-1 ? this.state.pageIndex+1 : first
        }, ()=>{
            this.props.get_vehicles_custom({page: this.state.pageIndex+1});
        });
        
    }

    handleSubmitPerPage(event){

        event.preventDefault();
        let forma = event.target; 
        let elements = forma.elements;
        let per_page = elements[0].value;
        let metoda = elements[1].checked ? elements[1].value : (elements[2].checked ? elements[2].value : null);
        let per_page_id = 1;
        if(per_page && metoda && per_page_id){
            let data = {
                per_page: per_page,
                metoda: metoda,
                "per_page_id": per_page_id
            }
            this.props.set_per_page(data);
            this.props.get_vehicles_custom();
        }
        

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

        this.setState({
            pageIndex: 0
        }, () => {
            this.props.get_vehicles_custom(data);
        });

    }

    render() {
        //console.log("getVehiclesProps: ", this.props);
        
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

        let accordionVehicleList = <div className="grid-container2"><div className="itemGV6 grid-container1 gc2-item1">{tmp1}</div>
            <a className="btn btn-outline-info ReportPageDownload" href={href} download="wholeReport" onClick={(e)=>this.props.toCSV(e, vehicleList)}>
                ReportPageDownload
            </a>
        </div>;
        
        let pagination = this.props && this.props.pagination ? this.props.pagination : null;
        let last_page = pagination && pagination.last_page ? pagination.last_page : null;
        let pageIndex = this.state && this.state.pageIndex ? this.state.pageIndex : 0;
        let current_page = pagination && pagination.current_page ? pagination.current_page : null;
        let arr1 = [];

        let ttt = [];//i+2<=last_page
        const createPaginationItem = (pageIndex, i) => {
            
            if(pageIndex===i && i-4>=0 && i+4<=last_page-1){
                ttt.push([<Pagination.Ellipsis />, i-2, i-1, i, i+1, i+2, <Pagination.Ellipsis />]);
            }
            
            return <Pagination.Item key={i} active={pageIndex===i} page={i+1} onClick={(e)=>{this.setActive(e, i)}}>
                {i+1}
            </Pagination.Item>;
            
        };

        for(let i=0;i<last_page;i++){
            
            arr1.push(createPaginationItem(pageIndex, i));
            
        }
        //console.clear();
        console.log("ttt: ", ttt);
        //<Pagination.Ellipsis />
        //arr1.push(createPaginationItem(pageIndex, i));
        //let midpoint = Math.ceil(last_page/2);
        //let arr2 = [...Array(10).keys()];
        //if((current_page && current_page-side>=0) || (current_page && current_page+side<=last_page))
        let arr2 = [];
        let side = 2;
        let left = null;
        let right = null;

        let pagesArr = [...arr1];//Generated array from number.
        let per_page = pagination && pagination.per_page ? pagination.per_page : null;
        let checkIfUtility = this.props && this.props.auth && this.props.auth.user && this.props.auth.user.utility && this.props.auth.user.utility.id && Number.isInteger(this.props.auth.user.utility.id) ? true : false;

        return (
        <div>
            <div>
                <h5 className="labelSetPerPage">Set or update per page</h5>
                <Form onSubmit={this.handleSubmitPerPage} name="myPerPageForm" className="grid-container f1">
                    
                    <Form.Group className="mb-3 per_page" controlId="per_page">
                        <Form.Control name="per_page" type="number" min={0} max={20} defaultValue={per_page} placeholder="Per page" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="post">
                        <Form.Check name="metoda" type="radio" value="post" label="Create" disabled={checkIfUtility ? true : false} defaultChecked={checkIfUtility ? false : true}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="patch">
                        <Form.Check name="metoda" type="radio" value="patch" label="Update" disabled={checkIfUtility ? false : true} defaultChecked={checkIfUtility ? true : false}/>
                    </Form.Group>

                    <Button className="itemGV5" name="per_page_button" variant="outline-success" type="submit">
                        Set per page
                    </Button>

                </Form>

            </div>

            <Form onSubmit={this.handleSubmit} name="myForm" className="grid-container f1">
                
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

                <Button className="itemGV5" name="button" variant="outline-success" type="submit">
                    Submit
                </Button>

            </Form>
            {accordionVehicleList}
            <div>
                <Pagination>
                    <Pagination.First onClick={this.firstPage}/>
                    <Pagination.Prev onClick={this.prevPage}/>
                        {pagesArr}
                    <Pagination.Next  onClick={this.nextPage}/>
                    <Pagination.Last  onClick={this.lastPage}/>
                </Pagination>
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

set_per_page.propTypes = {
    set_per_page: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
        list_vehicles: state.vehicles.list_vehicles,
        pagination: state.customReports.pagination,
        href: state.customReports.href,
        time_in: state.customReports.time_in,
        time_out: state.customReports.time_out,
        auth: state.auth.auth
    });

};

export default connect(mapStateToProps, { 
    toCSV,
    get_vehicles_custom,
    setTimeIn,
    setPageNumber,
    setTimeOut,
    set_per_page
})(GetVehicles);