import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { authService } from 'fBase';
import firebase from 'firebase/compat';

function App() {
	const [init, setInit] = useState<boolean>(false);
	const [userObj, setUserObj] = useState<firebase.User | null>(null);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) setUserObj(user);
			setInit(true);
		});
	}, []);

	return (
		<div>
			{init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : 'Initializing...'}
			<footer>&copy; {new Date().getFullYear()} Bwitter </footer>
		</div>
	);
}

export default App;
