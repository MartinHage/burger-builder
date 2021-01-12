import React from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";

import "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
const ContactData = (props) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState({
    street: "",
    zipcode: "",
    country: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const orderHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      customer: {
        name: "Kevin Gran",
        address: {
          street: "Teststreet 1",
          zipCode: "14248",
          country: "Sweden",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then(() => {
        setIsLoading(false);
        props.history.push("/");
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="ContactData">
      <h4>Enter your Contact Data</h4>{" "}
      {isLoading ? (
        <Spinner />
      ) : (
        <form>
          <Input
            inputtype="input"
            type="text"
            name="name"
            placeholder="Your name"
          />
          <Input
            inputtype="input"
            type="email"
            name="email"
            placeholder="Your email"
          />
          <Input
            inputtype="input"
            type="text"
            name="street"
            placeholder="Your street"
          />
          <Input
            inputtype="input"
            type="text"
            name="postal"
            placeholder="Postal code"
          />
          <Button type="Success" clicked={orderHandler}>
            ORDER
          </Button>
        </form>
      )}
    </div>
  );
};

export default ContactData;
