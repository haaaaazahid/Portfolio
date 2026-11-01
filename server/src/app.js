const express = require("express"), helmet = require("helmet"), cors = require("cors"), compression = require("compression"), path = require("path");
const cfg = require("./config/env"), routes = require("./routes"), { notFound, errorHandler } = require("./middleware"), { DIR } = require("./utils/upload");
const app = express();
app.set("trust proxy", 1); // correct client IPs for rate limiting behind Render/Railway/Nginx
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: cfg.clientUrl.split(","), credentials: false }));
app.use(compression());
app.use(express.json({ limit: "50kb" }));
app.use("/uploads", express.static(DIR, { maxAge: "7d" }));
app.use("/api", routes);
app.use("/api", notFound);
app.use(errorHandler);
module.exports = app;
