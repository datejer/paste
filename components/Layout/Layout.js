import styles from "./Layout.module.scss";

export default function Layout({ children }) {
	return (
		<div className={styles.container}>
			<main className={styles.main}>{children}</main>

			<footer className={styles.footer}>
				<a href="https://ejer.ga/" target="_blank" rel="noopener noreferrer">
					Made by <span className={styles.name}>ejer</span>
				</a>
			</footer>
		</div>
	);
}
