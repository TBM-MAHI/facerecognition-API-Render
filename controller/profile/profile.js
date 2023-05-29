let profileHandler=(req, res,knex) => {
  let { idno } = req.params;
  console.log(idno);
  knex("users")
    .where({
      id: idno,
    })
    .select("*")
    .then((response) => {
      if (response.length) {
        console.log(response);
        res.send(response[0]);
      } else
          return res.status(400).send("User Not Found");
    }).catch((err)=>res.status(400).send("User Not Found"));
};

module.exports = {
    profileHandler
}