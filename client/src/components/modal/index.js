import React from 'react';
import RegisterModal from './register-modal';
import LoginModal from './login-modal';
import AddSensorModal from './addSensor-modal';
import UpdateSensorModal from './updateSensor-modal';
import DeleteSensorModal from './deleteSensor-modal';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../redux/actions';

export default () => {
	const dispatch = useDispatch();
	const { modalName, language } = useSelector(({modalName, language}) => {
		return { modalName,language };
	});

	const closeModal = () => {
		dispatch(setModal(''));
	}

  switch (modalName) {
    case 'register':
      return (
      	<RegisterModal 
      		closeModal={closeModal}
					lang={language.register}
      	/>);
    case 'login':
      return (
      	<LoginModal 
      		closeModal={closeModal}
					lang={language.login}
      	/>);
    case 'addSensor':
      return (
        <AddSensorModal 
          closeModal={closeModal}
          lang={language.addSensor}
        />);
    case 'updateSensor':
      return (
        <UpdateSensorModal 
          closeModal={closeModal}
          lang={language.updateSensor}
        />);
    case 'deleteSensor':
      return (
        <DeleteSensorModal 
          closeModal={closeModal}
          lang={language.deleteSensor}
        />);
    default:
      return null;
  }
};
