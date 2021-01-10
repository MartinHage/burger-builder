import React from "react";
import Button from "../../../components/UI/Button/Button";

import "./ContactData.css";
const ContactData = () => {
  /*
    const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState({
    street: "",
    postalCode: "",
  });
  */

  return (
    <div className="ContactData">
      <h4>Enter your Contact Data</h4>{" "}
      <form>
        <input
          className="Input"
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className="Input"
          type="email"
          name="email"
          placeholder="Your email"
        />
        <input
          className="Input"
          type="text"
          name="street"
          placeholder="Your street"
        />
        <input
          className="Input"
          type="text"
          name="postal"
          placeholder="Postal code"
        />
        <Button type="Success">ORDER</Button>
      </form>
    </div>
  );
};

export default ContactData;
