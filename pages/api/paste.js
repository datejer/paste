import database from "../../middlewares/database";
import nextConnect from "next-connect";
import { ObjectID } from "mongodb";

const handler = nextConnect();

handler.use(database);

handler.get(async (req, res) => {
	if (!req.query.id || req.query.id.length <= 0)
		return res.status(404).json({ message: "Please provide an ID!" });

	req.db
		.collection("pastes")
		.findOne({ _id: new ObjectID(req.query.id) })
		.then((paste) => {
			if (!paste)
				return res
					.status(404)
					.json({ message: "Couldn't find a paste with this ID!" });

			return res.status(200).json({
				message: "Paste found!",
				id: paste._id,
				content: paste.content,
			});
		});
});

handler.post(async (req, res) => {
	if (!req.body.content || req.body.content.length <= 0)
		return res
			.status(400)
			.json({ message: "Please enter some text to paste!" });

	const result = await req.db.collection("pastes").insertOne({
		content: req.body.content,
	});

	return res.status(201).json({
		message: "Successfully pasted your text!",
		id: result.insertedId,
	});
});

export default handler;
