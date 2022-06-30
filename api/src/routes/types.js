const { Router } = require("express");
const router = Router();
const {
  getAndSetTypesFromApi,
  getTypesFromDB,
} = require("./middlewares/getTypes");

router.post("/", async (req, res) => {
  try {
    const types = await getAndSetTypesFromApi();
    res.send(types);
  } catch (e) {
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const typesDb = await getTypesFromDB();
    typesDb
      ? res.status(200).send(typesDb)
      : res.status(404).send("Types not found");
  } catch (e) {
    res.status(500).send("Server error");
  }
});
module.exports = router;
