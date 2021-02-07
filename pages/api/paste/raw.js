import database from "../../../middlewares/database";
import nextConnect from "next-connect";
import { ObjectID } from "mongodb";

let tagsToReplace = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
};

const replaceTag = (tag) => {
	return tagsToReplace[tag] || tag;
};

const escapeHTML = (str) => {
	return str.replace(/[&<>]/g, replaceTag);
};

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

			return res
				.status(200)
				.send(
					`<pre style="word-wrap: break-word; white-space: pre-wrap;">${escapeHTML(
						paste.content
					)}</pre>`
				);
		});
});

export default handler;
