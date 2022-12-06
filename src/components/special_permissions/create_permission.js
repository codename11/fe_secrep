import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {connect} from "react-redux";
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import { create_permission } from "../../actions/special_permission/special_permissionActions";
import PropTypes from "prop-types";
import { alertShow } from "../../actions/alertActions";
import { alertHide } from "../../actions/alertActions";

function CreatePermission(props){
    
    const handleSubmit = (event) => {
      event.preventDefault();
      let forma = event.target; 
      let elements = forma.elements;

      let sec_id = props && props.sec_id ? props.sec_id : null;
      
      const data = {
        sec_id: sec_id ? sec_id : null,
        permission_name: elements["permission_name"].value ? elements["permission_name"].value : null,
        permission_description: elements["permission_description"].value ? elements["permission_description"].value : null,
      };
      
      props.create_permission(data);

    }
      
    let errors = props && props.errors && props.errors.errors && props.errors.errors.messages ? props.errors.errors.messages : null;

    return (
      <div>

          <Form onSubmit={(e)=>handleSubmit(e)} className="grid-container">

            <Form.Group className="" controlId="permission_name">
              <Form.Control type="text" placeholder="Permission name" name="permission_name" />
            </Form.Group>

            <Form.Group className="" controlId="permission_description">
              <Form.Control type="text" placeholder="Permission description" name="permission_description" />
            </Form.Group>

            <Button variant="outline-primary" type="submit" className="item5">
                Submit
            </Button>
          </Form>

          {errors && errors.length ? <Alert className="mt-2" variant="danger" show={props.alertState} onClick={() => props.alertHide([false])} dismissible>
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

create_permission.propTypes = {
    create_permission: PropTypes.func.isRequired,
};

alertShow.propTypes = {
    alertShow: PropTypes.func.isRequired,
};
  
alertHide.propTypes = {
    alertHide: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
        alertState: state.alert.alertState,
        alert_purpose: state.alert.alert_purpose
    });

};

export default connect(mapStateToProps, { 
    create_permission,
    alertShow,
    alertHide
})(CreatePermission);