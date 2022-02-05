import { dbService } from 'fBase';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat';

export interface HomeProps {
	userObj: firebase.User | null;
}

const Home = (props: HomeProps): JSX.Element => {
	const { userObj } = props;

	const [bweet, setBweet] = useState<string>('');
	const [bweets, setBweets] = useState<any[]>([]);

	useEffect(() => {
		dbService.collection('bweets').onSnapshot((snapshot) => {
			const bweetArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			setBweets(bweetArray);
		});
	}, []);

	const onSubmit = async (e: any) => {
		e.preventDefault();

		await dbService.collection('bweets').add({
			text: bweet,
			createdAt: Date.now(),
			creatorId: userObj?.uid,
		});

		setBweet('');
	};

	const onChange = (e: any) => {
		const {
			target: { value },
		} = e;

		setBweet(value);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input type="text" placeholder="What's on your mind?" maxLength={120} value={bweet} onChange={onChange} />
				<input type="submit" value="Bweet" />
			</form>

			<div>
				{bweets.map((bweet: any) => (
					<div key={bweet.id}>
						<h4>{bweet.text}</h4>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
