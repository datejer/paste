module.exports = {
	async rewrites() {
		return [
			{
				source: "/raw/:slug",
				destination: "/api/paste/raw?id=:slug",
			},
		];
	},
};
