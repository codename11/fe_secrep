import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
import { get_vehicles } from "../../actions/vehicles/vehicleActions";
import { get_vehicle_types } from "../../actions/vehicle_types/vehicleTypesActions";
import { list_work_organizations } from "../../actions/work_organizations/workOrganizationsActions";
import Table from 'react-bootstrap/Table';
import CustomModal from '../subcomponents/CustomModal';
import { modalShow } from "../../actions/modalActions";
import { modalHide } from "../../actions/modalActions";
import PropTypes from "prop-types";

class ListVehicles extends Component {

    constructor(props) {

        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setModalShow = this.setModalShow.bind(this);
    }

    setModalShow(){

      this.setState({
        modalShow: !this.state.modalShow
      });

    }

    componentDidMount(){
      this.props.get_vehicle_types();
      this.props.list_work_organizations();
      this.props.get_vehicles();
    }

    handleChange(event) {
        const target = event.target;
        let obj = {//Dynamic state name
          key: target.name,
          value: target.value
        };
        
        if(obj.value.length > 0){
    
          this.setState({
            [obj.key]: obj.value
          });
    
        }
        else{
          
          delete this.state[obj.key];
    
        }
        
    }
    
    async handleSubmit(event) {
      event.preventDefault();
      let forma = event.target; 
      let elements = forma.elements;
      let len1 = elements.length;

      const data = {};
      for(let i=0;i<len1;i++){

        if(elements[i].name){
          data[elements[i].name] = elements[i].value;
        }
        
      }
      
      this.props.get_vehicles(data);
      
    }

    render() {
      //console.log("lista: ", this.props);
      
      let option1 = [<option key={""} value={""}>None</option>];
      let types = this.props.vehicle_types && this.props.vehicle_types.list_vehicle_types ? this.props.vehicle_types.list_vehicle_types.map((item, i) => {
        return <option key={item.id} value={item.name}>{item.name}</option>
      }) : null;

      if(types && types.length > 0){

        option1.push(...types);

      }

      let option2 = [<option key={""} value={""}>None</option>];
      let workOrgs = this.props.work_organizations && this.props.work_organizations.list_work_organizations ? this.props.work_organizations.list_work_organizations.map((item, i) => {
        return <option key={item.id} value={item.name}>{item.name}</option>
      }) : null;
      
      if(workOrgs && workOrgs.length > 0){

        option2.push(...workOrgs);

      }

      let typesSelect = <Form.Select id="type" className="selectClass1" aria-label="Default select example" name="type">
        {option1}
      </Form.Select>;
      let workOrgSelect = <Form.Select id="workOrg" className="selectClass1" aria-label="Default select example" name="workOrg">
        {option2}
      </Form.Select>;

      let vehicles = this.props && this.props.vehicles && this.props.vehicles.list_vehicles ? this.props.vehicles.list_vehicles : null;
      let vehicle_thead = <tr>
      <th>registration</th>
      <th>type</th>
      <th>work_organization.name</th>
      <th>created_at</th>
      <th>updated_at</th>
      <th>actions</th>
      </tr>;

      let thead = <thead>{vehicle_thead}</thead>;

      let vehicle_tbody = vehicles ? vehicles.map((item, i) => {

        let x1 = new Date(item.created_at);
        let d1Day = x1.getDate();
        let d1Month = x1.getMonth();
        let d1Year = x1.getFullYear();
        let created_at = d1Day+"/"+d1Month+"/"+d1Year;

        let x2 = new Date(item.updated_at);
        let d2Day = x2.getDate();
        let d2Month = x2.getMonth();
        let d2Year = x2.getFullYear();
        let updated_at = d2Day+"/"+d2Month+"/"+d2Year;

        return <tr key={item.id}>
            <td>{item.registration}</td>
            <td>{item.type.name}</td>
            <td>{item.work_organization.name}</td>
            <td>{created_at}</td>
            <td>{updated_at}</td>
            <td>
              {this.props && this.props.auth && this.props.auth.access_token ? 
                <Button variant="outline-warning" itemID ={item.id} onClick={() => this.props.modalShow([true, item.id])}>Update</Button>
               : null}
              <Button variant="outline-danger" itemID ={item.id}>Delete</Button>
            </td>
          </tr>

      }) : null;
      let tbody = <tbody>{vehicle_tbody}</tbody>;

      let vehicle_table = <Table striped bordered hover size="sm" responsive="sm">
          {thead}
          {tbody}
        </Table>

      let myModal = this.props && this.props.auth && this.props.auth.access_token ? 
        <CustomModal show={this.props.modalState} vehicleid={this.props.vehicleId} onClick={() => this.props.modalHide([false, this.props.vehicleId])}/> 
      : null;

      return (
        <div>
          <Form onSubmit={this.handleSubmit} className="formClass1">

              {typesSelect}
              {workOrgSelect}
            
              <Button variant="outline-primary" type="submit">
                  Submit
              </Button>
          </Form>

          {vehicle_table}

          {myModal}

        </div>
      )
  }
}

get_vehicles.propTypes = {
  get_vehicles: PropTypes.func.isRequired,
};

get_vehicle_types.propTypes = {
  get_vehicle_types: PropTypes.func.isRequired,
};

list_work_organizations.propTypes = {
  list_work_organizations: PropTypes.func.isRequired,
};

modalShow.propTypes = {
  modalShow: PropTypes.func.isRequired,
};

modalHide.propTypes = {
  modalHide: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
        auth: state.auth.auth,
        tabKey: state.key.tabKey,
        vehicles: state.vehicles,
        vehicle_types: state.list_vehicle_types,
        work_organizations: state.list_work_organizations,
        modalState: state.modalState.modalState,
        vehicleId: state.modalState.vehicleId,
        deleted_vehicle_id: state.deleted_vehicle_id
    });

};

export default connect(mapStateToProps, { 
  get_vehicles, 
  get_vehicle_types, 
  list_work_organizations, 
  modalShow,
  modalHide
})(ListVehicles);