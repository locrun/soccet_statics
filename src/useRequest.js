import { useState, useEffect } from "react";

export const useRequest = (apiUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const requestHandler = async () => {
      try {
        const request = await fetch(apiUrl, {
          headers: { "x-auth-token": process.env.REACT_APP_API_KEY },
        });
        const response = await request.json();
        setLoading(false);
        setData(response);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

    requestHandler();
  }, [apiUrl]);

  const errorMessage = error ? (
    <h2 className="error">...Превышен лимит запросов на сервер!</h2>
  ) : null;

  return {
    data,
    loading,
    errorMessage,
  };
};
