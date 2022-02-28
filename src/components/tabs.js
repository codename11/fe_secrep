import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import { useState } from "react";

function ControlledTabs() {
    const [key, setKey] = useState('home');
  
    return (
        <Container fluid>
            <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                <Tab eventKey="home" title="Home">
                    <div>Text 1</div>
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    <div>Text 2</div>
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    <div>Text 3</div>
                </Tab>
            </Tabs>
        </Container>
    );
}
  
export default ControlledTabs;