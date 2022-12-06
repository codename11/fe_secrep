import {connect} from "react-redux";
import { useEffect } from 'react';
import PropTypes from "prop-types";
import { get_users } from "../../actions/custom_reports/customReportsActions";
import { get_roles } from "../../actions/custom_reports/customReportsActions";

function Dashboard(props){
    
    const { get_users, get_roles } = props;
    useEffect(() => {
        
        get_users();
        get_roles();
        //Mora array kao dodatni argument da se ne bi ponavljalo.
    }, []);

    let myVar = "test";
    console.log(props);

    return myVar;

}

const mapStateToProps = (state) =>{ 
    
    return ({
        users: state.users,
        roles: state.roles
    });

};

get_roles.propTypes = {
    get_roles: PropTypes.func.isRequired,
};

get_users.propTypes = {
    get_users: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
    get_users,
    get_roles
})(Dashboard);