import React, { useState } from 'react';
import AppRouter from './Router';
import { authService } from 'fBase';
import firebase from 'firebase/compat';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<firebase.User | null>(authService.currentUser);

	return (
		<div>
			<AppRouter isLoggedIn={isLoggedIn} />
			<footer>&copy; {new Date().getFullYear()} Bwitter </footer>
		</div>
	);
}

export default App;
