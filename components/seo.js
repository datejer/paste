import Head from "next/head";

export default function SEO({ title, description }) {
	return (
		<Head>
			<title>{title ? `${title} / paste.ejer.gq` : "paste.ejer.gq"}</title>
			<link rel="icon" href="/favicon.ico" />

			<meta
				name="title"
				content={title ? `${title} / paste.ejer.gq` : "paste.ejer.gq"}
			/>
			<meta name="description" content={description} />

			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://paste.ejer.gq/" />
			<meta
				property="og:title"
				content={title ? `${title} / paste.ejer.gq` : "paste.ejer.gq"}
			/>
			<meta property="og:description" content={description} />
			{/* <meta property="og:image" content={fullImage} /> */}

			<meta property="twitter:url" content="https://paste.ejer.gq/" />
			<meta property="twitter:domain" content="paste.ejer.gq" />
			<meta
				property="twitter:title"
				content={title ? `${title} / paste.ejer.gq` : "paste.ejer.gq"}
			/>
			<meta property="twitter:description" content={description} />
			{/* <meta property="twitter:image" content={fullImage} /> */}

			<meta property="og:site_name" content="paste.ejer.gq" />
			<meta name="theme-color" content="#ffffff" />
		</Head>
	);
}
