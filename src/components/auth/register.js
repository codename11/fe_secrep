import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
import { register } from "../../actions/auth/authActions";
import PropTypes from "prop-types";
import store from "../../store";

function Register(props){
 
    const handleSubmit = (e) => {
      e.preventDefault();
  
      let target = e.target;
      const data = {
        name: target.elements["name"].value,
        email: target.elements["email"].value,
        password: target.elements["password"].value,
        password_confirmation: target.elements["password_confirmation"].value
      }

      target.elements["name"].value = "";
      target.elements["email"].value = "";
      target.elements["password"].value = "";
      target.elements["password_confirmation"].value = "";

      props.register(data);
  
    }
        
    return (
        <Form onSubmit={(e)=>handleSubmit(e)}>

            <Form.Group className="mb-3" controlId="register-name">
                <Form.Label>Enter name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" name="name" onChange={() => {return;}}/>
                <Form.Text className="text-muted">
                Enter your name here.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="register-email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={() => {return;}}/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="register-password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"  name="password" onChange={() => {return;}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="register-confirm-password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" name="password_confirmation" onChange={() => {return;}}/>
            </Form.Group>

            <Button variant="outline-primary" type="submit">
                Submit
            </Button>
        </Form>
    )
    
}

register.propTypes = {
    register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 

    return ({
        auth: state.auth.auth,
        tabKey: state.key.key,
    });

};

export default connect(mapStateToProps, { register })(Register);