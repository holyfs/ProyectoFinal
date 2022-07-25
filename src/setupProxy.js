const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api/user", {
      target: "https://3001-holyfs-proyectofinal-q4aicqzoqf2.ws-eu54.gitpod.io",
      secure: false,
      changeOrigin: true
    })
  );

  app.use(
    proxy("/api/image", {
      target: "hthttps://3001-holyfs-proyectofinal-q4aicqzoqf2.ws-eu54.gitpod.io",
      secure: false,
      changeOrigin: true
    })
  );
};