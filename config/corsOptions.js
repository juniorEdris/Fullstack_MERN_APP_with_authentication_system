const { allowedOrigins } = require("./allowedOrigins");

const corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // !origin is for postman kind apps to access the API's
      callback(null, true);
    } else {
      callback(new Error("Not allowed by Cors"));
    }
  },
  credentials: true,
  //   optional for some devices (e.g: smartTvs or older browsers), which can not adjust with 204 status
  optionsSuccessStatus: 200,
};

module.exports = {
  corsOption,
};
