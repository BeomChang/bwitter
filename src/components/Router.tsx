import React from 'react';
import firebase from 'firebase/compat';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Profile from 'routes/Profile';
import Home from 'routes/Home';
import Navigation from './Navigation';

export interface AppRouterProps {
	isLoggedIn: boolean;
	userObj: firebase.User | null;
}

const AppRouter = (props: AppRouterProps) => {
	const { isLoggedIn, userObj } = props;

	return (
		<Router>
			{isLoggedIn && <Navigation />}

			<Switch>
				{isLoggedIn ? (
					<>
						<Route exact path="/">
							<Home userObj={userObj} />
						</Route>

						<Route exact path="/profile">
							<Profile />
						</Route>
					</>
				) : (
					<>
						<Route exact path="/">
							<Auth />
						</Route>
					</>
				)}
			</Switch>
		</Router>
	);
};

export default AppRouter;
