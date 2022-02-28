import ControlledTabs from './components/tabs';
import RegisterCard from './components/register';
import Container from 'react-bootstrap/Container';
import React, { Component } from 'react'

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      test: null
    };

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
      console.log("State: ", this.state);

    }
    
  }

  handleSubmit(event) {
      event.preventDefault();

      let target = event.target;
      let elements = target.elements;
      let len1 = elements.length;

      for(let i=0;i<len1;i++){

        if(elements[i].value.length > 0 && (elements[i].type !== "checkbox" && elements[i].type !== "radio") && elements[i].type !== "submit"){

          this.setState({
            [elements[i].name]: elements[i].value
          });

        }

        if(elements[i].value.length > 0 && (elements[i].type === "checkbox" || elements[i].type === "radio") && elements[i].checked === true && elements[i].type !== "submit"){

          this.setState({
            [elements[i].name]: elements[i].value
          });

        }

      }

  }
  
  render() {

    console.log(this.state);
    
    return (
      <Container className="container" fluid>
        <RegisterCard handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
      </Container>
    )
  }
}

export default App;