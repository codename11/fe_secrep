import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Component } from 'react'
import {connect} from "react-redux";
import { login } from "../actions/authActions";
import PropTypes from "prop-types";

class Login extends Component {

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
    
        const data = {
          email: this.state.email,
          password: this.state.password
        }
    
        this.props.login(data);
    
      }

    render() {
        
        return (
            <Form onSubmit={this.handleSubmit}>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  name="password" onChange={this.handleChange}/>
                </Form.Group>

                <Button variant="outline-primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
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