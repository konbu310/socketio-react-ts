const { FuseBox, QuantumPlugin } = require("fuse-box");
const { task } = require("fuse-box/sparky");

const share = {
  sourceMaps: true,
  plugins: [
    process.env.NODE_ENV === "production" &&
      QuantumPlugin({
        treeshake: true,
        uglify: true,
        bakeApiIntoBundle: "bundle"
      })
  ]
};

const client = FuseBox.init({
  target: "browser",
  homeDir: "src/client",
  output: "public/dist/$name.js",
  ...share
});

const server = FuseBox.init({
  target: "server",
  homeDir: "src/server",
  output: "dist/$name.js",
  ...share
});

task("build:client", () => {
  client
    .bundle("bundle")
    .instructions(">index.tsx")
    .watch();
  client.run();
});

task("build:server", () => {
  server
    .bundle("index")
    .instructions(">[index.ts]")
    .watch();
  server.run();
});

task("default", ["&build:client", "&build:server"], () => {});
