import React, { Component } from 'react'
import Register from './components/register';
import Container from 'react-bootstrap/Container';
import { connect } from "react-redux";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { setTab } from "./actions/tabActions";
import Login from './components/login';

class App extends Component {

  constructor(props) {

    super(props);
    this.test = this.test.bind(this);
  }

  test(){
    //console.log(this.props);
  }

  render() {
    console.log("app: ", this.props);
    let tabKey = this.props.tabKey;
    return (
      <Container className="container">
        
        <Tabs onClick={this.test} id="controlled-tab-example" activeKey={tabKey} onSelect={(tabKey)=> this.props.setTab(tabKey)} className="mb-3">
          
          <Tab eventKey="register_tab" title="Register">
            <Register/>
          </Tab>
          <Tab eventKey="login_tab" title="Login">
            <Login/>
          </Tab>
          
        </Tabs>
      </Container>
    )
  }
}

const mapStateToProps = (state) =>{ 

  return ({
    tabKey: state.key.key,
    auth: state.auth.auth,
  });

};

export default connect(mapStateToProps, { setTab })(App);