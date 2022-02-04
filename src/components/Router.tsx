import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Profile from 'routes/Profile';
import Home from 'routes/Home';
import Navigation from './Navigation';

export interface AppRouterProps {
	isLoggedIn: boolean;
}

const AppRouter = (props: AppRouterProps) => {
	const { isLoggedIn } = props;

	return (
		<Router>
			{isLoggedIn && <Navigation />}

			<Switch>
				{isLoggedIn ? (
					<>
						<Route exact path="/">
							<Home />
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
