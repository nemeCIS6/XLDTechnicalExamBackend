import path from "path";

const settings = {
  server: {
    host: "http://localhost",
    port: 3001,
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
