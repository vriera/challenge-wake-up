import styled from "styled-components";
import Container from "react-bootstrap/Container";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ResponsiveContainer = styled(Container)`
  @media (min-width: 992px) {  // This is for 'lg' breakpoint
    max-width: 992px;
  }
`;

const AddItemForm= () => {


    return <ResponsiveContainer className="mb-2 p-3 text-white">
        <h2>
            Add a new item!
        </h2>
         <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </ResponsiveContainer>
}

export default AddItemForm;