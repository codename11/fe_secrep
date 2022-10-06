import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
import { login } from "../../actions/auth/authActions";
import PropTypes from "prop-types";

function Login(props){
    
    const handleSubmit = (e) => {
        e.preventDefault();

        let target = e.target;
        const data = {
            email: target.elements["email"].value,
            password: target.elements["password"].value
        }
        
        props.login(data);

        target.elements["email"].value = "";
        target.elements["password"].value = "";

    }
        
    return (
        <Form onSubmit={(e)=>handleSubmit(e)}>

            <Form.Group className="mb-3" controlId="login-email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email"/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="login-password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"  name="password"/>
            </Form.Group>

            <Button variant="outline-primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

login.propTypes = {
    login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 

    return ({
        auth: state.auth.auth,
        tabKey: state.key.key,
    });

};

export default connect(mapStateToProps, { login })(Login);