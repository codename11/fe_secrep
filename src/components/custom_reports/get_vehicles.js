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
      
        this.props.get_vehicles_custom({page: 1});
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

    nextPage(pagination){

        let first = 0;
        let last = pagination.last_page;

        this.setState({
            pageIndex: this.state.pageIndex+1 < last ? this.state.pageIndex+1 : first
        }, ()=>{
            this.props.get_vehicles_custom({page: this.state.pageIndex+1});

        });
        console.log("nextPage1: ", pagination.current_page);

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
            this.props.get_vehicles_custom({page: 1});
            //console.log("getVehiclesProps: ", this.props);

        }
        this.firstPage();

    }

    setActive(e, i){

        this.props.setPageNumber(e, i);
        let pagination = this.props && this.props.pagination ? this.props.pagination : null;
        if(pagination.last_page>1){
            this.setState({
                pageIndex: i
            }, () => {
                this.props.get_vehicles_custom({page: this.state.pageIndex});

            });
        }
        console.log("pageIndex: ", this.state.pageIndex);
        console.log("setActive: ", i);

    }
    
    async handleSubmit(event) {
        event.preventDefault();
        let forma = event.target; 
        let elements = forma.elements;
        let len1 = elements.length;

        let data = {};

        for(let key in elements){
            if(elements[key].type==="checkbox" && elements[key].checked){  
                data.vehicle = [];
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
            //console.log("getVehiclesProps: ", this.props);

        });

    }

    render() {
        
        //console.log("getVehiclesState: ", this.state);
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
        
        let per_page = pagination && pagination.per_page ? pagination.per_page : null;
        let checkIfUtility = this.props && this.props.auth && this.props.auth.user && this.props.auth.user.utility && this.props.auth.user.utility.id && Number.isInteger(this.props.auth.user.utility.id) ? true : false;

        const setVisiblePages = (paginacija) =>{
            
            let pageIndex = null;
            let last_page = null;
            let siblings = 1;
            
            pageIndex = this.state.pageIndex;
            last_page = paginacija && paginacija.last_page && paginacija.last_page ? paginacija.last_page : null;
            //console.log("pageIndex1: ", this.state.pageIndex, "pageIndex2: ", pageIndex);
            //console.log("Props: ", this.props.pagination);
            //console.log("State: ", this.state.setVisiblePages);
            
            let myPages = [];
            // Uvrstiti u uslove sta da se radi ako ima manje od 3. Kako to ubaciti u sva tri if-a?
            if(pageIndex===0 && pageIndex<=last_page && pageIndex+siblings<=last_page && pageIndex+(siblings*2)<=last_page){
                
                //console.log("mojTest1", [pageIndex, pageIndex+siblings, pageIndex+(siblings*2)], pageIndex);

                myPages = [
                    <Pagination.Item key={pageIndex} active={pageIndex===this.state.pageIndex} page={pageIndex+1} onClick={(e)=>{this.setActive(e, pageIndex)}}>
                        {pageIndex+1}
                    </Pagination.Item>,
        
                    <Pagination.Item key={pageIndex+siblings} page={pageIndex+1+siblings} onClick={(e)=>{this.setActive(e, pageIndex+siblings)}}>
                        {pageIndex+1+siblings}
                    </Pagination.Item>,
        
                    <Pagination.Item key={pageIndex+(2*siblings)} page={pageIndex+1+(2*siblings)} onClick={(e)=>{this.setActive(e, pageIndex+(siblings*2))}}>
                        {pageIndex+1+(2*siblings)}
                    </Pagination.Item>,
    
                    <Pagination.Ellipsis key={"elip"+(pageIndex+3)}/>].filter(Boolean);
    
            }
            
            if(pageIndex>=0 && pageIndex<=last_page && pageIndex-siblings>=0 && pageIndex+siblings<=last_page){
                
                //console.log("mojTest2", [pageIndex-siblings, pageIndex, pageIndex+siblings], pageIndex);
                let ellipsis1 = pageIndex-siblings> 0 ? <Pagination.Ellipsis key={"elip"+(pageIndex+3)}/> : null;
                let ellipsis2 = (pageIndex+siblings)<last_page ? <Pagination.Ellipsis key={"elip"+(pageIndex+4)}/> : null;
                myPages = [
    
                    ellipsis1,
    
                    <Pagination.Item key={pageIndex-siblings} page={pageIndex+1-siblings} onClick={(e)=>{this.setActive(e, pageIndex-siblings)}}>
                        {pageIndex+1-siblings}
                    </Pagination.Item>,
        
                    <Pagination.Item key={pageIndex} active={pageIndex===this.state.pageIndex} page={pageIndex+1} onClick={(e)=>{this.setActive(e, pageIndex)}}>
                        {pageIndex+1}
                    </Pagination.Item>,
        
                    <Pagination.Item key={pageIndex+siblings} page={pageIndex+1+siblings} onClick={(e)=>{this.setActive(e, pageIndex+siblings)}}>
                        {pageIndex+1+siblings}
                    </Pagination.Item>,
    
                    ellipsis2].filter(Boolean);
    
            }
            
            if(pageIndex+1==last_page && pageIndex-(2*siblings)>=0){
    
                //console.log("mojTest3", [pageIndex-(siblings*2), pageIndex-siblings, pageIndex], pageIndex);
                myPages = [
                    <Pagination.Ellipsis key={"elip"+(pageIndex+3)}/>,
    
                    <Pagination.Item key={pageIndex-(2*siblings)} page={pageIndex+1-(2*siblings)} onClick={(e)=>{this.setActive(e, pageIndex-(siblings*2))}}>
                        {pageIndex+1-(2*siblings)}
                    </Pagination.Item>,
        
                    <Pagination.Item key={pageIndex-siblings} page={pageIndex+1-siblings} onClick={(e)=>{this.setActive(e, pageIndex)}}>
                        {pageIndex+1-siblings}
                    </Pagination.Item>,
        
                    <Pagination.Item key={pageIndex} active={pageIndex===this.state.pageIndex} page={pageIndex+1} onClick={(e)=>{this.setActive(e, pageIndex-siblings)}}>
                        {pageIndex+1}
                    </Pagination.Item>].filter(Boolean);
    
            }
    
            if(pageIndex>=0 && pageIndex<=last_page && last_page<=3){
                //console.log("mojTest4");
                let pages = [];
                for(let i=0;i<last_page;i++){

                    pages.push(
                        <Pagination.Item key={i} active={i===pageIndex} page={i+1} onClick={(e)=>{this.setActive(e, i)}}>
                            {i+1}
                        </Pagination.Item>
                    );
                    //console.log("mojTest4: ", pages.length);
                }
                myPages = [...pages].filter(Boolean)
    
            }
    
            if(this.state.setVisiblePages>3){
    
                myPages = [...this.state.setVisiblePages, <Pagination.Ellipsis key={"elipsa"}/>].filter(Boolean);
    
            }
            
            return myPages;

        };

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
                        id="User"
                        label="User"
                        name="user"
                        value="user"
                    />

                    <Form.Check 
                        type="switch"
                        id="Type"
                        label="Type"
                        name="type"
                        value="type"
                    />

                    <Form.Check 
                        type="switch"
                        id="WorkOrg"
                        label="WorkOrg"
                        name="workOrganization"
                        value="workOrganization"
                    />

                    <Form.Check 
                        type="switch"
                        id="Complements"
                        label="Complements"
                        name="complements"
                        value="complements"
                    />

                    <Form.Check 
                        type="switch"
                        id="Deliveries"
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

            <Pagination className="pagination">
                <Pagination.First onClick={this.firstPage}/>
                <Pagination.Prev onClick={this.prevPage}/>
                    {setVisiblePages(pagination)}
                <Pagination.Next  onClick={()=>this.nextPage(pagination)}/>
                <Pagination.Last  onClick={this.lastPage}/>
            </Pagination>
           
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