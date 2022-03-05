import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
import { get_vehicles } from "../../actions/vehicles/vehicleActions";
import PropTypes from "prop-types";

class ListVehicles extends Component {

    constructor(props) {

        super(props);
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
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
    
        /*const data = {
          email: this.state.email,
          password: this.state.password
        }*/
        
        this.props.get_vehicles({
          access_token: this.props.access_token
        });
        
      }

    render() {
        
        let options = this.props.vehicles && this.props.vehicles.list_vehicles ? this.props.vehicles.list_vehicles.map((item, i) => {
          return <option key={item.id} value={item.id}>{item.registration}</option>
        }) : null;

        return (
            <Form onSubmit={this.handleSubmit}>

                <Form.Select aria-label="Default select example" name="sel1" onChange={this.handleChange}>
                  {options}
                </Form.Select>

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

const mapStateToProps = (state) =>{ 
  
    return ({
        auth: state.auth.auth,
        tabKey: state.key.key,
        vehicles: state.vehicles,
    });

};

export default connect(mapStateToProps, { get_vehicles })(ListVehicles);