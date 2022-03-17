import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
import { register } from "../../actions/auth/authActions";
import PropTypes from "prop-types";

class Register extends Component {

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
    
        let target = event.target;
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

        this.props.register(data);
    
      }

    render() {
        
        return (
            <Form onSubmit={this.handleSubmit}>

                <Form.Group className="mb-3" controlId="register-name">
                    <Form.Label>Enter name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" onChange={this.handleChange}/>
                    <Form.Text className="text-muted">
                    Enter your name here.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="register-email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="register-password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  name="password" onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="register-confirm-password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" name="password_confirmation" onChange={this.handleChange}/>
                </Form.Group>

                <Button variant="outline-primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
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