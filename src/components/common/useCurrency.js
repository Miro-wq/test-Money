import { useEffect, useState } from 'react';
import axios from 'axios';

const useCurrency = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAndStore = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://openexchangerates.org/api/latest.json?app_id=' +
            process.env.REACT_APP_OXR_API_KEY
        );
        const newData = response.data;
        const fetchTime = new Date().getTime();
        localStorage.setItem(
          'MONO',
          JSON.stringify({ data: newData, fetchTime })
        );
        setData(newData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    const storedData = localStorage.getItem('MONO');
    if (storedData) {
      const { data, fetchTime } = JSON.parse(storedData);
      const currentTime = new Date().getTime();
      if (currentTime - fetchTime < 3600000) {
        setData(data);
        setLoading(false);
      } else {
        fetchDataAndStore();
      }
    } else {
      fetchDataAndStore();
    }
  }, []);

  return { data, loading, error };
};

export default useCurrency;
