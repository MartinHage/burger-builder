import React from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const Orders = () => {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (const key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        setOrders(fetchedOrders);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))}
    </div>
  );
};

export default withErrorHandler(Orders, axios);