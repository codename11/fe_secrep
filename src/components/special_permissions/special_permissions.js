import {connect} from "react-redux";
import PropTypes from "prop-types";
import Accordion from 'react-bootstrap/Accordion';
import { list_permissions } from "../../actions/special_permission/special_permissionActions";
import ListPermissions from '../special_permissions/list_permissions';
import CreatePermission from '../special_permissions/create_permission';
import { useEffect } from 'react';

function SpecialPermissions(props){

  const { list_permissions } = props;
  useEffect(() => {
          
    list_permissions();
      //Mora array kao dodatni argument da se ne bi ponavljalo.
  }, [list_permissions]);
      
    let permission_list = props && props.special_permissions && props.special_permissions.list_permissions && props.special_permissions.list_permissions.length > 0 ? props.special_permissions.list_permissions : null;
      
    return (
      <div>
        
        <Accordion defaultActiveKey="0">

          <Accordion.Item eventKey="0">
              <Accordion.Header>Create new special permission</Accordion.Header>
              <Accordion.Body className="accordion-custom">

                <CreatePermission sec_id={props.auth.user.id} errors={props.errors}/>

              </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
              <Accordion.Header>List special permissions</Accordion.Header>
              <Accordion.Body>

                <ListPermissions list_permissions={permission_list} sec_id={props.auth.user.id} access_token={props.auth.access_token}/>
                  
              </Accordion.Body>
          </Accordion.Item>

        </Accordion>
      
      </div>
    )
}

list_permissions.propTypes = {
  list_permissions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>{ 
    
    return ({
      auth: state.auth.auth,
      tabKey: state.key.tabKey,
      errors: state.errors,
      special_permissions: state.special_permissions
    });

};

export default connect(mapStateToProps, { 
  list_permissions
})(SpecialPermissions);