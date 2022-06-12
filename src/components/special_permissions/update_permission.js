import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { update_permission } from "../../actions/special_permission/special_permissionActions";
import { modalHide } from "../../actions/modalActions";
import Alert from 'react-bootstrap/Alert';
import { alertShow } from "../../actions/alertActions";
import { alertHide } from "../../actions/alertActions";
import ListGroup from 'react-bootstrap/ListGroup';

class UpdatePermission extends Component {

    constructor(props) {

        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
        
    }

    handleSubmit(event){

        event.preventDefault();
        let target = event.target;
        let elements = target.elements;
        const data = {
            id: elements["id"].value && elements["id"].value.length > 0 ? elements["id"].value : null,
            permission_name: elements["permission_name"].value && elements["permission_name"].value.length > 0 ? elements["permission_name"].value : null,
            permission_description: elements["permission_description"].value && elements["permission_description"].value.length > 0 ? elements["permission_description"].value : null,
            sec_id: this.props.sec_id,
        }
        
        this.props.update_permission(data);
        this.props.modalHide([false]);
    }

  render() {

        let chosen_permission = this.props && this.props.chosen_permission ? this.props.chosen_permission : "";
        
        let errors = this.props && this.props.errors && this.props.errors.errors && this.props.errors.errors.messages ? this.props.errors.errors.messages : null;
        
    return (
      <div>
        <Form onSubmit={this.handleSubmit} name="myForm" encType="multipart/form-data">

            <Form.Control type="hidden" name="id" value={this.props.itemId} required/>
            
            <Form.Group className="mb-1" controlId="permission_name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="permission_name" placeholder="Enter permission name" defaultValue={chosen_permission.permission_name}/>
            </Form.Group>

            <Form.Group className="mb-1" controlId="permission_description">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="permission_description" placeholder="Enter permission description" defaultValue={chosen_permission.permission_description}/>
            </Form.Group>
            
            <Button name="button" variant="outline-success" type="submit">
              Update
            </Button>
        </Form>
        
        {errors && errors.length ? <Alert className="mt-2" variant="danger" show={this.props.alertState} onClick={() => this.props.alertHide([false])} dismissible>
            <Alert.Heading>There were {errors && errors.length ? "errors:" : null}</Alert.Heading>
            
            <ListGroup variant="flush">
                {errors && errors.length>0 ? errors.map((item, i) => {
                    return <ListGroup.Item variant="danger" key={i}>{item}</ListGroup.Item>;
                }) : null}
            </ListGroup>
        </Alert> : null}

    </div>
    )
  }
}
  
update_permission.propTypes = {
    update_permission: PropTypes.func.isRequired,
};

alertShow.propTypes = {
    alertShow: PropTypes.func.isRequired,
};

alertHide.propTypes = {
    alertHide: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
  
    return ({
        errors: state.errors,
        modalState: state.modalState.modalState,
        itemId: state.modalState.itemId,
        alertState: state.alert.alertState,
        alert_purpose: state.alert.alert_purpose
    });

};

export default connect(mapStateToProps, { 
    update_permission,
    modalHide,
    alertShow,
    alertHide
})(UpdatePermission);