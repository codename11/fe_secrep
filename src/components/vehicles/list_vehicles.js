import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
import { get_vehicles } from "../../actions/vehicles/vehicleActions";
import { get_vehicle_types } from "../../actions/vehicle_types/vehicleTypesActions";
import { list_work_organizations } from "../../actions/work_organizations/workOrganizationsActions";
import PropTypes from "prop-types";

class ListVehicles extends Component {

    constructor(props) {

        super(props);
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    componentDidMount(){
      this.props.get_vehicle_types();
      this.props.list_work_organizations();
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
        let arr = [];
        for(let i=0;i<len1;i++){

          if(elements[i].name){
            data[elements[i].name] = elements[i].value;
          }
          
        }
        
        this.props.get_vehicles(data);
        
      }

    render() {
        
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

        let typesSelect = <Form.Select className="selectClass1" aria-label="Default select example" name="type">
          {option1}
        </Form.Select>;
        let workOrgSelect = <Form.Select className="selectClass1" aria-label="Default select example" name="workOrg">
          {option2}
        </Form.Select>;
        
        return (
            <Form onSubmit={this.handleSubmit} className="formClass1">

                {typesSelect}
                {workOrgSelect}
              
                <Button variant="outline-primary" type="submit">
                    Submit
                </Button>
            </Form>
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

const mapStateToProps = (state) =>{ 
  
    return ({
        auth: state.auth.auth,
        tabKey: state.key.key,
        vehicles: state.vehicles,
        vehicle_types: state.list_vehicle_types,
        work_organizations: state.list_work_organizations
    });

};

export default connect(mapStateToProps, { get_vehicles, get_vehicle_types, list_work_organizations })(ListVehicles);