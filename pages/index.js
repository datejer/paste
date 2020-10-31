import SEO from "../components/seo";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<SEO />

			<main className={styles.main}>
				<h1 className={styles.title}>paste.ejer.gq</h1>
			</main>

			<footer className={styles.footer}>
				<a href="https://ejer.ga" target="_blank" rel="noopener noreferrer">
					Made by ejer
				</a>
			</footer>
		</div>
	);
}
