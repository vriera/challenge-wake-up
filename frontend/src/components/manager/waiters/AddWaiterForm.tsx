import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { addWaiter, AddWaiterParams } from "../../../api/waiters"
import Sucess from "../Success";
import { useQueryClient } from "@tanstack/react-query";
const ResponsiveContainer = styled(Container)`
  @media (min-width: 992px) {
    max-width: 992px;
  }
`;

const AddWaiterForm = ({ managerId }: { managerId: number }) => {
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let p: AddWaiterParams = {
      name,
      managerId
    }

    console.log("Submitting", p);
    try {
      await addWaiter(p);
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === 'waiters' && query.queryKey[1] === managerId,
      })
    } catch (e) {
      console.log(e)
      setShow(true)
    }

    setName("");
    // Show success message
    setSuccessMessage(`Waiter: ${name} added successfully!`);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    setLoading(false)
    // Here you can add code to send the form data to the server
  };

  return (
    <ResponsiveContainer className="mb-2 p-3 text-white">
      <h2>Add a new Waiter</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Waiter name</Form.Label>
          {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible>
              Error adding a waiter. Name must be unique.
          </Alert>
        ) : (
          <div />
        )}
          <Form.Control
            type="text"
            placeholder="Enter your waiter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>

      </Form>
      <Sucess message={successMessage} show={successMessage !== ""}></Sucess>
    </ResponsiveContainer>
  );
};

export default AddWaiterForm;



/*
<Form.Group className="position-relative mb-3">
                <Form.Label>Add</Form.Label>
                <Form.Control
                    type="file"
                    name="file"
                    onChange={()=> {return}}
                />
            </Form.Group>
            */