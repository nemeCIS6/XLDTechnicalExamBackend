import path from "path";

const settings = {
  server: {
    port: process.env.PORT||8080,
    bodySizeLimit: "3MB",
    allowedOrigins: [
      "*"
    ]
  },
  datastore: {
    projectId: 'integral-linker-280315'
  },
  authenticationTokenName: `none`
};
module.exports = settings;
