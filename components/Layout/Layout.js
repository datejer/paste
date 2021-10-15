import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import styles from './Layout.module.scss';

export default function Layout({ children }) {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	return (
		<div className={styles.container}>
			<main className={styles.main}>{children}</main>

			<footer className={styles.footer}>
				<div>
					{mounted ? (
						<a
							className={styles.button}
							onClick={() =>
								theme === 'dark' ? setTheme('light') : setTheme('dark')
							}
						>
							{theme === 'dark' ? '🌞' : '🌙'}
						</a>
					) : (
						''
					)}
				</div>
				<a href="https://ejer.ga/" target="_blank" rel="noopener noreferrer">
					Made by <span className={styles.name}>ejer</span>
				</a>
			</footer>
		</div>
	);
}
