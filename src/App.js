import React, { Component } from 'react'
import ControlledTabs from './components/tabs';
import Register from './components/register';
import Container from 'react-bootstrap/Container';
import { connect } from "react-redux";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { setTab } from "./actions/tabActions";

class App extends Component {

  constructor(props) {

    super(props);
    this.test = this.test.bind(this);
  }

  test(){
    //console.log("test");
  }

  render() {
    
    let tabKey = this.props.tabKey;
    return (
      <Container className="container">
        
        <Tabs id="controlled-tab-example" activeKey={tabKey} onSelect={(tabKey)=> this.props.setTab(tabKey)} className="mb-3">
          
          <Tab eventKey="register" title="Register">
            <Register/>
          </Tab>
          <Tab eventKey="login" title="Login">
            test2
          </Tab>
          
        </Tabs>
      </Container>
    )
  }
}

const mapStateToProps = (state) =>{ 

  return ({tabKey: state.key.key});

};

export default connect(mapStateToProps, { setTab })(App);