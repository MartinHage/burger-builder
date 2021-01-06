import React from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = React.useState(null);
    const errorConfirmedHandler = () => {
      setError(null);
    };
    React.useEffect(() => {
      axios.interceptors.request.use((req) => {
        setError(null);
        return req;
      });
      axios.interceptors.response.use(
        (res) => res,
        (error) => setError(error)
      );
    }, []);
    return (
      <>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
