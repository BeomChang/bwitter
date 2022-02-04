import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { authService } from 'fBase';
import firebase from 'firebase/compat';

function App() {
	// const [isLoggedIn, setIsLoggedIn] = useState<firebase.User | null>(authService.currentUser);
	// console.log('App 시작 시 currentUser: ', authService.currentUser);
	// setInterval(() => {
	// 	console.log('2초의 시간 뒤 currentUser: ', authService.currentUser);
	// }, 2000);

	const [init, setInit] = useState<boolean>(false);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}

			setInit(true);
		});
	}, []);

	return (
		<div>
			{init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'}
			<footer>&copy; {new Date().getFullYear()} Bwitter </footer>
		</div>
	);
}

export default App;
