import { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";

class ListPermissions extends Component {

    constructor(props) {

        super(props);
        this.state = {
          
        };

    }

    componentDidMount(){
      
      

    }

    render() {
      console.log("listPermissionsProps: ", this.props);
      return (
        <div>
          
          Test
        
        </div>
      )
  }
}

const mapStateToProps = (state) =>{ 
    
    return ({
      
    });

};

export default connect(mapStateToProps, { 
  
})(ListPermissions);