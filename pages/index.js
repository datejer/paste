import { useState } from "react";
import axios from "axios";
import router from "next/router";
import { useToasts } from "react-toast-notifications";
import SEO from "../components/seo";
import styles from "../styles/Home.module.css";

export default function Home() {
	const [content, setContent] = useState("");
	const { addToast } = useToasts();

	const handleContent = (e) => setContent(e.target.value);

	const submit = () => {
		if (!content || content.length < 1)
			return addToast("Please enter some text to paste!", {
				appearance: "error",
				autoDismiss: true,
			});

		axios
			.post("/api/paste", {
				content,
			})
			.then((response) => {
				router.push(`/${response.data.id}`);
			})
			.catch((error) => {
				addToast(error.response.data.message, {
					appearance: "error",
					autoDismiss: true,
				});
			});
	};

	return (
		<div className={styles.container}>
			<SEO />

			<main className={styles.main}>
				<h1 className={styles.title}>paste.ejer.gq</h1>
				<textarea
					placeholder="Hello World!"
					className={styles.code}
					style={{ height: "50vh" }}
					onChange={handleContent}
				/>
				<button className={styles.button} onClick={submit}>
					Paste
				</button>
			</main>

			<footer className={styles.footer}>
				<a href="https://ejer.ga" target="_blank" rel="noopener noreferrer">
					Made by ejer
				</a>
			</footer>
		</div>
	);
}
