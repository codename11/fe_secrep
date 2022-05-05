import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
//mport { get_vehicles } from "../../actions/vehicles/vehicleActions";
//import { list_work_organizations } from "../../actions/work_organizations/workOrganizationsActions";
//import Table from 'react-bootstrap/Table';
//import CustomModal from '../subcomponents/CustomModal';
import { modalShow } from "../../actions/modalActions";
import { modalHide } from "../../actions/modalActions";
import PropTypes from "prop-types";
//import DeleteVehicle from '../vehicles/delete_vehicle';
//import UpdateVehicle from '../vehicles/update_vehicle';
//import CreateVehicle from '../vehicles/create_vehicle';

class Deliveries extends Component {

    constructor(props) {

        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
      //this.props.get_vehicle_types();
      //this.props.list_work_organizations();
      //this.props.get_vehicles();
    }
    
    async handleSubmit(event) {
      event.preventDefault();
      /*let forma = event.target; 
      let elements = forma.elements;
      let len1 = elements.length;

      const data = {};
      for(let i=0;i<len1;i++){

        if(elements[i].name){
          data[elements[i].name] = elements[i].value;
        }
        
      }
      
      this.props.get_vehicles(data);*/
      
    }

    render() {
      //console.log("lista: ", this.props);
      
      return (
        <div>
          
          Delieveries

        </div>
      )
  }
}

const mapStateToProps = (state) =>{ 
    
    return ({
        
    });

};

export default connect(mapStateToProps, { 
 
})(Deliveries);