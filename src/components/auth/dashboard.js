import {connect} from "react-redux";
import { useEffect } from 'react';
import PropTypes from "prop-types";
import { get_users } from "../../actions/custom_reports/customReportsActions";
import { get_roles } from "../../actions/custom_reports/customReportsActions";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { update_user_role } from "../../actions/custom_reports/customReportsActions";
import Alert from 'react-bootstrap/Alert';
import { alertShow } from "../../actions/alertActions";
import { alertHide } from "../../actions/alertActions";
import store from "../../store";
import { ALERT_SHOW, ALERT_HIDE } from "../../actions/types";
import ListGroup from 'react-bootstrap/ListGroup';

function Dashboard(props){
    
    const { get_users, get_roles } = props;
    useEffect(() => {
        
        get_users();
        get_roles();
        //Mora array kao dodatni argument da se ne bi ponavljalo.
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        let forma = event.target; 
        let elements = forma.elements;
  
        if(elements && elements.user && elements.user.value && elements.role && elements.role.value){

            const data = {
                user_id: Number(elements.user.value),
                new_role_id: Number(elements.role.value)
            }
    
            props.update_user_role(data);
            store.dispatch({
                type: ALERT_HIDE,
                payload: {
                    alertState: false,
                    alert_purpose: null
                }
            });

        }
        else{
            console.log("Choose a user");
            store.dispatch({
                type: ALERT_SHOW,
                payload: {
                    alertState: true,
                    alert_purpose: "Dashboard: Choose a user"
                }
            });
            
        }
        
    }

    let current_user_id = props && props.auth && props.auth.user && props.auth.user && props.auth.user.id && props.auth.user.role_id===1 ? props.auth.user.id : null;
    let option1 = [<option key={""} value={""}>None</option>];
    let list_users = props.users && props.users.list_users ? props.users.list_users.map((item, i) => {
      
        if(current_user_id !== item.id){
            return <option key={item.id} value={item.id}>{item.name}</option>
        }
        

    }) : null;
    
    if(list_users && list_users.length > 0){

      option1.push(...list_users);

    }

    let listUsersSelect = <Form.Select id="listUsers" className="m-1" aria-label="Default select example" name="user">
      {option1}
    </Form.Select>;

    let option2 = [<option key={""} value={""}>None</option>];
    let list_roles = props.roles && props.roles.list_roles ? props.roles.list_roles.map((item, i) => {
        
        return <option key={item.id} value={item.id}>{item.name}</option>

    }) : null;

    if(list_roles && list_roles.length > 0){

        option2.push(...list_roles);

    }

    let listRolesSelect = <Form.Select id="listRoles" className="m-1" aria-label="Default select example" name="role">
        {option2}
    </Form.Select>;

    return (
        <div>
            
            <Form onSubmit={(e)=>handleSubmit(e)} className="grid-container3">
                {listUsersSelect}
                {listRolesSelect}
                
                {props && props.alert_purpose ? <Alert className="mt-2 gc3-item3" variant="danger" show={props.alertState} onClick={() => props.alertHide([false])} dismissible>
                <Alert.Heading>There were error during role assigment</Alert.Heading>
                
                    <ListGroup variant="flush">
                        {props.alert_purpose}
                    </ListGroup>

                </Alert> : null}
                <Button variant="outline-primary" type="submit" className="m-1 gc3-item4">
                      Submit
                </Button>
            </Form>
        </div>
    );

}

const mapStateToProps = (state) => {
    
    return ({
        auth: state.auth.auth,
        users: state.users,
        roles: state.roles,
        alertState: state.alert.alertState,
        alert_purpose: state.alert.alert_purpose,
    });

};

update_user_role.propTypes = {
    get_roles: PropTypes.func.isRequired,
};

get_roles.propTypes = {
    get_roles: PropTypes.func.isRequired,
};

get_users.propTypes = {
    get_users: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
    get_users,
    get_roles,
    update_user_role,
    alertShow,
    alertHide,
})(Dashboard);