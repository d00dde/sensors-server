import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../components/loader/';
import Error from '../components/error/';

export default (props) => {
	const { loading, error } = useSelector (({ loading, error }) => {
		return{
			loading,
			error,
		}
	});

	const content = error ? <Error /> : loading ? <Loader /> : props.children;

	return(
		<div className={props.className}>
			{content}
		</div>
	)
}