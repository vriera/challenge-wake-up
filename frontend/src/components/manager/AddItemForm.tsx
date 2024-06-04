import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MenuItemType } from "../../models/menuItemType";
import { useEffect, useState } from "react";
import { AddItemParams, addItem } from "../../api/menu";
import Sucess from "./Success";
import { useQueryClient } from "@tanstack/react-query";
const ResponsiveContainer = styled(Container)`
  @media (min-width: 992px) {
    max-width: 992px;
  }
`;

const AddItemForm = ({managerId} : {managerId:number}) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [priceError, setPriceError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const handleSubmit = async (event : any) => {
    event.preventDefault();
    if (isNaN(parseFloat(price)) || parseFloat(price) < 0 || price.split(".")[1]?.length > 2) {
        setPriceError("Price must be a non-negative number with up to 2 decimal places.");
        return;
      }
      setLoading(true);
      setPriceError("");

    let p : AddItemParams=  {
        name,
        description,
        price: parseFloat(price),
        type: category as MenuItemType,
      }

    console.log("Submitting", p);
    await addItem(p ,managerId );
    queryClient.invalidateQueries( {
      predicate: (query) =>
        query.queryKey[0] === 'menuItems' && query.queryKey[1] === managerId,
    })
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    // Show success message
    setSuccessMessage(`Item: ${name} added successfully!`);

    // Hide success message after 3 seconds
    setTimeout(() => {
    setSuccessMessage("");
    }, 3000);
    setLoading(false)
    // Here you can add code to send the form data to the server
  };

  return (
    <ResponsiveContainer className="mb-2 p-3 text-white">
      <h2>Add a new item!</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Item name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSelect">
          <Form.Label>Item category</Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {Object.values(MenuItemType).filter(x=> x !== MenuItemType.ALL).map((value) => (
              <option value={value} key={value}>
                {value.charAt(0) + value.substring(1).toLowerCase()}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            isInvalid={priceError !== ""}
            required
          />
        <Form.Control.Feedback  className="bg-white rounded border border-danger" type="invalid">{" * " +priceError}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Form>
      <Sucess message={successMessage} show={successMessage !== ""}></Sucess>
    </ResponsiveContainer>
  );
};

export default AddItemForm;



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