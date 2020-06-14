import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setLoading } from '../redux/actions';
import getPath from './requests';

export const useHttp = () => {
  const dispatch = useDispatch();
  const token = useSelector(({ token }) => token);

  const request = useCallback(async (requestName, body = null, id = null) => {
    const headers = {};
    let { method, url } = getPath(requestName);
    if (id) {
      url += id;
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (body) {
      body = JSON.stringify(body);
      headers['Content-type'] = 'application/json';
      // headers['Origin'] = 'http://localhost:3000';
    }
    dispatch(setLoading(true));
    dispatch(setError(''));
    try {
      //console.log('before request', url);
      const response = await fetch(/*'http://localhost:5000' + */ url, {
        method,
        body,
        headers,
      });
      //console.log('after request', response);
      //console.log('status', response.ok);
      const data = await response.json();
      dispatch(setLoading(false));
      return { ok: response.ok, data };
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
      dispatch(setError(error));
    }
  }, []);
  return { request };
};
