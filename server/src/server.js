const cfg = require("./config/env"), connect = require("./config/db"), app = require("./app");
connect().then(() => app.listen(cfg.port, () => console.log(`API on http://localhost:${cfg.port}/api`)))
  .catch((e) => { console.error("Startup failed:", e.message); process.exit(1); });
