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
    //console.log("test: ", this.props);
  }

  render() {
    console.log("app: ", this.props);
    let tabKey = this.props.tabKey;
    let access_token = this.props.auth.access_token;

    return (
      <Container className="container">
        
        <Tabs onClick={this.test} id="controlled-tab-example" activeKey={tabKey} onSelect={(tabKey)=> this.props.setTab(tabKey)} className="mb-3">
          
          {access_token===null ? <Tab eventKey="register_tab" title="Register">
            <Register/>
          </Tab> : null}

          {access_token===null ? <Tab eventKey="login_tab" title="Login">
            <Login/>
          </Tab> : null}
          
        </Tabs>
      </Container>
    )
  }
}

const mapStateToProps = (state) =>{ 

  return ({
    tabKey: state.key.tabKey,
    auth: state.auth.auth,
  });

};

export default connect(mapStateToProps, { setTab })(App);