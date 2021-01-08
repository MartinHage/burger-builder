import React from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = React.useState(null);
    const errorConfirmedHandler = () => {
      setError(null);
    };
    React.useEffect(() => {
      // Anything in here is fired on component mount.
      const reqInterceptor = axios.interceptors.request.use((req) => {
        setError(null);
        return req;
      });
      const resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => setError(error)
      );
      return () => {
        // Anything in here is fired on component unmount.
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
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
