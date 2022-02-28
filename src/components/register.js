import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function RegisterCard(props){

    return <Card className="register-card">

                <Card.Header>Registration Form</Card.Header>
                <Card.Body>
                    <Form onSubmit={props.handleSubmit}>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Enter name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" name="name" onChange={props.handleChange}/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.dddd
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={props.handleChange}/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"  name="password" onChange={props.handleChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password_confirmation">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" name="password_confirmation" onChange={props.handleChange}/>
                        </Form.Group>

                        <Button variant="outline-primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer>You must register to use program</Card.Footer>

            </Card>;

} 

export default RegisterCard;