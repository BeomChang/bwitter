import React, { useState } from 'react';
import { authService } from 'fBase';

const Auth = (): JSX.Element => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [newAccount, setNewAccount] = useState<boolean>(true);

	const onChange = (e: any) => {
		const {
			target: { name, value },
		} = e;

		if (name === 'email') {
			setEmail(value);
		} else if (name == 'password') {
			setPassword(value);
		}
	};
	const onSubmit = async (e: any) => {
		/**
		 * preventDefault()
		 * 기본 행위가 실행되는 걸 원치 않는다. (예) 새로 고침 // 기본적으로 onSubmit 을 수행하면 새로 고침이 되는데 React 에서 새로 고침이 발생하는 경우 code 와 state 모두 사라진다.
		 * 즉, 프로그래머가 컨트롤 할 수 있게 된다.
		 */
		e.preventDefault();

		try {
			let data;
			if (newAccount) {
				// create account
				data = await authService.createUserWithEmailAndPassword(email, password);
			} else {
				// log in
				data = await authService.signInWithEmailAndPassword(email, password);
			}

			console.log(data);
		} catch (error) {
			console.log('[Auth onSubmit Error] ', error);
		}
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input name="email" type="email" placeholder="Email" value={email} onChange={onChange} required />
				<input name="password" type="password" placeholder="Password" value={password} onChange={onChange} required />
				<input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
			</form>

			<div>
				<button>Continue with Google</button>
				<button>Continue with GitHub</button>
			</div>
		</div>
	);
};

export default Auth;
