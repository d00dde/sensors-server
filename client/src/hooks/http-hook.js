import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-type'] = 'application/json';
        }
        console.log('before request', body);
        setLoading(true);
        const response = await fetch(url, { method, body, headers });
        console.log('after request', response);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Server error');
        }

        setLoading(false);
        return data;
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
        throw error;
      }
    },
    [],
  );
  const clearErrors = useCallback(() => {
    setError(null);
  }, []);

  return { loading, error, request, clearErrors };
};
