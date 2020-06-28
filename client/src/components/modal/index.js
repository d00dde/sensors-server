import React from 'react';
import RegisterModal from './registerModal';
import LoginModal from './loginModal';
import AddSensorModal from './addSensorModal';
import AddSensorAdminModal from './addSensorAdminModal';
import UpdateSensorModal from './updateSensorModal';
import UpdateSensorAdminModal from './updateSensorAdminModal';
import DeleteSensorModal from './deleteSensorModal';
import DeleteSensorAdminModal from './deleteSensorAdminModal';
import DeleteUserModal from './deleteUserModal';
import SetRightsModal from './setRightsModal';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../redux/actions';

export default () => {
	const dispatch = useDispatch();
	const { modalName, language } = useSelector(({ modalName, language }) => {
		return { modalName, language };
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
    case 'addSensorAdmin':
      return (
        <AddSensorAdminModal 
          closeModal={closeModal}
          lang={language.addSensor}
        />);
    case 'updateSensor':
      return (
        <UpdateSensorModal 
          closeModal={closeModal}
          lang={language.updateSensor}
        />);
    case 'updateSensorAdmin':
      return (
        <UpdateSensorAdminModal 
          closeModal={closeModal}
          lang={language.updateSensor}
        />);
    case 'deleteSensor':
      return (
        <DeleteSensorModal 
          closeModal={closeModal}
          lang={language.deleteSensor}
        />);
    case 'deleteSensorAdmin':
      return (
        <DeleteSensorAdminModal 
          closeModal={closeModal}
          lang={language.deleteSensor}
        />);
    case 'deleteUser':
      return (
        <DeleteUserModal 
          closeModal={closeModal}
          lang={language.deleteUser}
        />);
    case 'setRights':
      return (
        <SetRightsModal 
          closeModal={closeModal}
          lang={language.setRights}
        />);
    default:
      return null;
  }
};
