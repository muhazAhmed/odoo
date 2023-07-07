import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../assets/API_URL/API_URL";

// url :- gets passed from pages => ServerVariables.jsx

//=============== postMethodAPI =================

const usePostAPI = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = async (url, inputs) => {
    setLoading(true);
  
    try {
      const res = await axios.post(API_URL + url, inputs);
      setData(res.data.data);
      setTimeout(() => {
        setError(null);
      }, 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  
    setLoading(false);
  };
  

  return { data, error, loading, postData, setError };
};

//=============== getMethodAPI =================

const useFetchAPI = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(API_URL + url);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, loading, error };
};

export { usePostAPI, useFetchAPI };
