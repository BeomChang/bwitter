import { dbService } from 'fBase';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat';
import { Bweets } from 'interfaces/bweets.interface';
import Bweet from 'components/Bweet';

export interface HomeProps {
	userObj: firebase.User | null;
}

const Home = (props: HomeProps): JSX.Element => {
	const { userObj } = props;

	const [bweetTxt, setBweetTxt] = useState<string>('');
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
			text: bweetTxt,
			createdAt: Date.now(),
			creatorId: userObj?.uid,
		});

		setBweetTxt('');
	};

	const onChange = (e: any) => {
		const {
			target: { value },
		} = e;

		setBweetTxt(value);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input type="text" placeholder="What's on your mind?" maxLength={120} value={bweetTxt} onChange={onChange} />
				<input type="submit" value="Bweet" />
			</form>

			<div>
				{bweets.map((bweet: Bweets) => (
					<Bweet key={bweet.id} bweetObj={bweet} isOwner={bweet.creatorId === userObj?.uid} />
				))}
			</div>
		</div>
	);
};

export default Home;
