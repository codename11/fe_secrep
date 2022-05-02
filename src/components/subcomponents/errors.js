import { Component } from 'react'
import {connect} from "react-redux";

class Errors extends Component {

    constructor(props) {

        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
        
    }
    
    async handleSubmit(event) {
      event.preventDefault();
      
      
    }

    render() {
      console.log("errors: ", this.props);
        let temporary = "temporary ";
        let errors = this.props && this.props.errors && this.props.errors.errors && this.props.errors.errors.messages && this.props.errors.errors.messages.length>0 ? this.props.errors.errors.messages.map((item, i) => {
            return <div style={{display: "none"}} key={i} className={temporary+"alert alert-danger"}>{item}</div>
        }) : null;
        
        return (
        <div>
            {errors}
        </div>
        )
    }
}

const mapStateToProps = (state) =>{ 
    
    return ({
        list_employees: state.employees.list_employees,
    });

};

export default connect(mapStateToProps, { 
    
})(Errors);