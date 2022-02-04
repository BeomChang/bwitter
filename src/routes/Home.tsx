import { dbService } from 'fBase';
import React, { useEffect, useState } from 'react';

const Home = (): JSX.Element => {
	const [bweet, setBweet] = useState<string>('');
	const [bweets, setBweets] = useState<string[]>([]);

	const getBweets = async () => {
		const dbBweets = await dbService.collection('bweets').get();
		dbBweets.forEach((document: any) => {
			const bweetObject = {
				...document.data(),
				id: document.id,
			};
			setBweets((prev: any) => [bweetObject, ...prev]);
		});
	};

	useEffect(() => {
		getBweets();
	}, []);

	const onSubmit = async (e: any) => {
		e.preventDefault();

		await dbService.collection('bweets').add({
			bweet,
			createdAt: Date.now(),
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
						<h4>{bweet.bweet}</h4>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
