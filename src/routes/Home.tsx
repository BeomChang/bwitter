import React, { useState } from 'react';

const Home = (): JSX.Element => {
	const [bweet, setBweet] = useState<string>('');

	const onSubmit = (e: any) => {
		e.preventDefault();
	};

	const onChange = (e: any) => {
		const {
			target: { value },
		} = e;

		setBweet(value);
	};

	return (
		<form onSubmit={onSubmit}>
			<input type="text" placeholder="What's on your mind?" maxLength={120} value={bweet} onChange={onChange} />
			<input type="submit" value="Bweet" />
		</form>
	);
};

export default Home;
