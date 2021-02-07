import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import SEO from "../components/seo";
import styles from "../styles/Home.module.css";

const Paste = () => {
	const router = useRouter();
	const [paste, setPaste] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (router.query.id) {
			axios
				.get(`/api/paste?id=${router.query.id}`)
				.then((response) => {
					setPaste(response.data);
					setTimeout(setLoading(false), 5000);
				})
				.catch((error) => {
					router.push("/");
				});
		}
	}, [router.query.id]);

	return (
		<div className={styles.container}>
			<SEO title={router.query.id} />

			<main className={styles.main}>
				<h1 className={styles.title}>{router.query.id}</h1>
				<code className={styles.code}>
					{loading ? (
						<div className="lds-ring">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					) : (
						paste.content.split(/\n/).map((item, key) => {
							return (
								<span key={key}>
									{item}
									<br />
								</span>
							);
						})
					)}
				</code>
			</main>

			<footer className={styles.footer}>
				<a href="https://ejer.ga" target="_blank" rel="noopener noreferrer">
					Made by ejer
				</a>
			</footer>
		</div>
	);
};

export default Paste;
