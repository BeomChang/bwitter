import React from 'react';
import { authService } from 'fBase';
import { useHistory } from 'react-router-dom';

const Profile = (): JSX.Element => {
	const history = useHistory();

	const onLogOutClick = () => {
		authService.signOut();
		history.push('/');
	};

	return (
		<>
			<button onClick={onLogOutClick}>Log Out</button>
		</>
	);
};

export default Profile;
