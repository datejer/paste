import Head from "next/head";

export default function SEO({ title }) {
	return (
		<Head>
			<title>{title ? `${title} / paste.ejer.gq` : "paste.ejer.gq"}</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
}
