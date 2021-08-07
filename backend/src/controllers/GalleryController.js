const { db } = require("../database/database");

module.exports = {
  async findAll(req, res) {
    let { sort, order } = req.query;

    let sorters;
    if (sort === "null") {
      return res
        .status(400)
        .json({
          error: "SortingServiceException",
          message: "Sort must be not null",
        })
        .send();
    }
    if (sort) {
      sort = typeof sort === "object" ? sort : [sort];
      order = typeof order === "object" ? order : [order];
      const possibleSorts = ["id", "title", "author", "editionYear"];
      sorters = [];
      sort.forEach((s, i) => {
        if (possibleSorts.includes(s)) {
          sorters.push(`${s} ${order[i] || "asc"}`);
        }
      });
      sorters = sorters.length === 0 ? ["id asc"] : sorters;
    } else {
      return res.json([]);
    }

    db.all(
      `SELECT * FROM books ORDER BY ${sorters ? sorters.join(",") : "id asc"}`,
      (err, rows) => {
        res.json(rows);
      }
    );
  },
};
