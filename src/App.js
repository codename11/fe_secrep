import ControlledTabs from './components/tabs';
import RegisterCard from './components/register';
import Container from 'react-bootstrap/Container';
import React, { Component } from 'react'
import { connect } from "react-redux";
import { register } from "./actions/authActions"
import PropTypes from "prop-types";

class App extends Component {

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
      console.log("State: ", this.state);

    }
    
  }

  async handleSubmit(event) {
    event.preventDefault();

    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }

    this.props.register(data);

  }
  
  render() {

    console.log(this.state);
    
    return (
      <Container className="container" fluid>
        <RegisterCard handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
      </Container>
    )
  }
}

register.propTypes = {
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 

  return ({auth: state.auth.auth,});

};

export default connect(mapStateToProps, { register })(App);