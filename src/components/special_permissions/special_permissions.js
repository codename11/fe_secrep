import { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Accordion from 'react-bootstrap/Accordion';
import { list_permissions } from "../../actions/special_permission/special_permissionActions";
import ListPermissions from '../special_permissions/list_permissions';

class SpecialPermissions extends Component {

    constructor(props) {

        super(props);
        this.state = {
          
        };

    }

    componentDidMount(){
      
      this.props.list_permissions()
    }

    render() {
      console.log("permissionsProps: ", this.props);
      let list_permissions = this.props && this.props.special_permissions && this.props.special_permissions.list_permissions && this.props.special_permissions.list_permissions.length > 0 ? this.props.special_permissions.list_permissions : null;
      
      return (
        <div>
          
          <Accordion defaultActiveKey="0">

            <Accordion.Item eventKey="0">
                <Accordion.Header>Create new special permission</Accordion.Header>
                <Accordion.Body className="accordion-custom">

                  Create permission

                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
                <Accordion.Header>List special permissions</Accordion.Header>
                <Accordion.Body>

                    <ListPermissions list_permissions={list_permissions}/>
                    
                </Accordion.Body>
            </Accordion.Item>

          </Accordion>
        
        </div>
      )
  }
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