// Single source of truth for project field limits. Used by the Zod schema (utils/schemas.js) AND the
// Mongoose model (models/index.js), so the API and the database can never disagree.
// The admin form mirrors these in client/src/pages/admin/config.js (the client cannot import from /server).
module.exports = {
  project: { title: 150, status: 80, category: 60, description: 1000, details: 10000, tag: 60, tags: 30, url: 2048, image: 2048, images: 20 },
};
