import { useState, useEffect, useRef } from "react";
import axios from "axios";
import router from "next/router";
import { useToasts } from "react-toast-notifications";
import SEO from "../components/seo";
import styles from "../styles/Home.module.css";

export default function Home() {
	const textarea = useRef(null);
	const [content, setContent] = useState("");
	const [pasting, setPasting] = useState(false);
	const { addToast } = useToasts();

	useEffect(() => {
		textarea.current.focus();
	}, []);

	const handleContent = (e) => setContent(e.target.value);

	const submit = () => {
		if (!content || content.length < 1)
			return addToast("Please enter some text to paste!", {
				appearance: "error",
				autoDismiss: true,
			});

		if (pasting)
			return addToast("This text is already being pasted!", {
				appearance: "error",
				autoDismiss: true,
			});

		setPasting(true);

		axios
			.post("/api/paste", {
				content,
			})
			.then((response) => {
				router.push(`/${response.data.id}?copy=1`);
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
					ref={textarea}
				/>
				{pasting ? (
					<button
						className={styles.button}
						onClick={submit}
						style={{ padding: "1em 1.5em" }}
					>
						<div className={styles.dotflashing}></div>
					</button>
				) : (
					<button className={styles.button} onClick={submit}>
						Paste
					</button>
				)}
			</main>

			<footer className={styles.footer}>
				<a href="https://ejer.ga/" target="_blank" rel="noopener noreferrer">
					Made by <span className={styles.name}>ejer</span>
				</a>
			</footer>
		</div>
	);
}
