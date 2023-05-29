function getallUserData(req, res, knex) {
  try {
    knex
      .select("*")
      .from("users")
      .then((data) => {
        //console.log(data);
        return res.status(200).json({ UsersData: data });
      })
      .catch((err) =>
        res.status(400).json({ message: "Unable to fetch data from database" })
      );
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = getallUserData;