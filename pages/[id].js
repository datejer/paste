import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import copyTextToClipboard from '../utils/copy';
import Layout from '../components/Layout/Layout';
import SEO from '../components/SEO';
import styles from '../styles/Home.module.css';

const Paste = () => {
	const router = useRouter();
	const [paste, setPaste] = useState({});
	const [loading, setLoading] = useState(true);
	const { addToast } = useToasts();

	useEffect(() => {
		if (router.query.copy === '1') {
			addToast('Copied link to clipboard!', {
				appearance: 'success',
				autoDismiss: true,
			});
			copyTextToClipboard(window.location.origin + window.location.pathname);
		}
		if (router.query.id) {
			axios
				.get(`/api/paste?id=${router.query.id}`)
				.then(response => {
					setPaste(response.data);
					setLoading(false);
				})
				.catch(error => {
					router.push('/');
				});
		}
	}, [router.query.id]);

	const copyURL = () => {
		addToast('Copied link to clipboard!', {
			appearance: 'success',
			autoDismiss: true,
		});
		copyTextToClipboard(window.location.origin + window.location.pathname);
	};

	const copyText = () => {
		addToast('Copied the paste contents to clipboard!', {
			appearance: 'success',
			autoDismiss: true,
		});
		copyTextToClipboard(paste.content);
	};

	return (
		<Layout>
			<SEO
				title={router.query.id}
				description={`View paste with ID ${router.query.id}`}
			/>

			<h1 className={styles.title}>{router.query.id}</h1>

			{loading ? (
				<div className={styles.dotflashing}></div>
			) : (
				<div>
					<div className={styles.paste}>
						<div className={styles.toolbar}>
							<span>{new Date(paste.date).toLocaleString()}</span>
							<span>
								<a className={styles.toolbarButton} onClick={copyURL}>
									link
								</a>
								<a className={styles.toolbarButton} onClick={copyText}>
									copy
								</a>
								<Link href={`/raw/${router.query.id}`}>
									<a className={styles.toolbarButton}>raw</a>
								</Link>
							</span>
						</div>
						<ol className={styles.lines}>
							{paste.content.split(/\n/).map((item, key) => {
								return (
									<li className={styles.line} key={key}>
										{item}
									</li>
								);
							})}
						</ol>
					</div>
					<div className={styles.new}>
						<Link href="/">
							<a>Make your own paste.</a>
						</Link>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Paste;
