import { dbService } from 'fBase';
import { Bweets } from 'interfaces/bweets.interface';
import React, { useState } from 'react';

export interface BweetProps {
	bweetObj: Bweets;
	isOwner: boolean;
}

const Bweet = (props: BweetProps): JSX.Element => {
	const { bweetObj, isOwner } = props;

	const [editing, setEditing] = useState<boolean>(false);
	const [newBweet, setNewBweet] = useState<string>(bweetObj.text);

	const onDeleteClick = async () => {
		const ok = confirm('Are you sure you want to delete this bweet?');
		if (ok) {
			// delete bweet
			await dbService.doc(`bweets/${bweetObj.id}`).delete();
		}
	};

	const toggleEditing = () => {
		setEditing((prev) => !prev);
	};

	const onChange = (e: any) => {
		const {
			target: { value },
		} = e;

		setNewBweet(value);
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();

		await dbService.doc(`bweets/${bweetObj.id}`).update({
			text: newBweet,
		});

		setEditing(false);
	};

	return (
		<div>
			{editing ? (
				<>
					{isOwner && (
						<>
							<form onSubmit={onSubmit}>
								<input type="text" placeholder="Edit your bweet" onChange={onChange} value={newBweet} required />
								<input type="submit" value="Update Bweet" />
							</form>
							<button onClick={toggleEditing}>Cancel</button>
						</>
					)}
				</>
			) : (
				<>
					<h4>{bweetObj.text}</h4>
					{isOwner && (
						<>
							<button onClick={onDeleteClick}>Delete Bweet</button>
							<button onClick={toggleEditing}>Edit Bweet</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Bweet;
