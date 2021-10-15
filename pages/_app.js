import '../styles/globals.css';
import { ToastProvider } from 'react-toast-notifications';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider defaultTheme="dark">
			<ToastProvider>
				<Component {...pageProps} />
			</ToastProvider>
		</ThemeProvider>
	);
}

export default MyApp;
