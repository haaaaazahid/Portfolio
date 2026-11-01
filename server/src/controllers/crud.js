const { wrap } = require("../middleware");
// Generic CRUD: public list (optionally filtered), admin create/update/delete
module.exports = (Model, { sort = { order: 1, createdAt: -1 }, publicFilter = {} } = {}) => ({
  list: wrap(async (req, res) => {
    const filter = req.query.all && req.admin ? {} : publicFilter;
    res.json({ success: true, data: await Model.find(filter).sort(sort).lean() });
  }),
  get: wrap(async (req, res) => {
    const d = await Model.findOne({ _id: req.params.id, ...(req.admin ? {} : publicFilter) }).lean();
    d ? res.json({ success: true, data: d }) : res.status(404).json({ success: false, error: "Not found." });
  }),
  create: wrap(async (req, res) => res.status(201).json({ success: true, data: await Model.create(req.body) })),
  update: wrap(async (req, res) => {
    const d = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    d ? res.json({ success: true, data: d }) : res.status(404).json({ success: false, error: "Not found." });
  }),
  remove: wrap(async (req, res) => {
    const d = await Model.findByIdAndDelete(req.params.id);
    d ? res.json({ success: true, data: { id: d.id } }) : res.status(404).json({ success: false, error: "Not found." });
  }),
});
