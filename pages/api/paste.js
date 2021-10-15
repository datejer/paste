import database from '../../middlewares/database';
import nextConnect from 'next-connect';
import { ObjectID } from 'mongodb';
import shortid from 'shortid';

const handler = nextConnect();

handler.use(database);

handler.get(async (req, res) => {
	if (!req.query.id || req.query.id.length <= 0)
		return res.status(404).json({ message: 'Please provide an ID!' });

	if (shortid.isValid(req.query.id)) {
		req.db
			.collection('pastes')
			.findOne({
				id: req.query.id,
			})
			.then(paste => {
				if (!paste)
					return res
						.status(404)
						.json({ message: "Couldn't find a paste with this ID!" });

				return res.status(200).json({
					message: 'Paste found!',
					id: paste.id,
					content: paste.content,
					date: paste.date,
				});
			});
	} else {
		req.db
			.collection('pastes')
			.findOne({
				_id: new ObjectID(req.query.id),
			})
			.then(paste => {
				if (!paste)
					return res
						.status(404)
						.json({ message: "Couldn't find a paste with this ID!" });

				return res.status(200).json({
					message: 'Paste found!',
					id: paste._id,
					content: paste.content,
					date: ObjectID(req.query.id).getTimestamp(),
				});
			});
	}
});

handler.post(async (req, res) => {
	if (!req.body.content || req.body.content.length <= 0)
		return res
			.status(400)
			.json({ message: 'Please enter some text to paste!' });

	let id = shortid.generate();

	await req.db.collection('pastes').insertOne({
		id: id,
		content: req.body.content,
		date: new Date(),
	});

	return res.status(201).json({
		message: 'Successfully pasted your text!',
		id: id,
	});
});

export default handler;
