import { useState, useEffect } from "react";

export const useRequest = (queryString) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = "909d343adb4b45ddb9f87cf3701a4bb1";
    const requestHandler = async () => {
      const request = await fetch(queryString, {
        headers: { "X-Auth-Token": apiKey },
      });
      const response = await request.json();
      if (request.ok) {
        setLoading(false);
        setData(response);
      } else {
        throw new Error(
          `Could not fetch ${queryString}, status: ${response.status}`
        );
      }
    };

    requestHandler();
  }, [queryString]);

  return {
    data,
    loading,
  };
};
