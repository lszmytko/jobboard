module.exports = {
  async redirects() {
    return [
      {
        source: "/advdetails/:slug([a-zA-Z0-9]+)",
        destination: "/",
        permanent: false,
      },
      {
        source: "/pracownik/:slug([a-zA-Z0-9]+)",
        destination: "/",
        permanent: false,
      },
    ];
  },
};
