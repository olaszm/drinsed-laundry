module.exports = {
  publicPath: process.env.VUE_APP_STATIC_ROOT,
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With,Content-Type, Accept",
    },
  },
};
