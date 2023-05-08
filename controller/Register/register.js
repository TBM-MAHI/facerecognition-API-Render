const registerHandler = (req, res, knex, bcrypt, saltRounds) => {
  let { email, name, password } = req.body;
  if (!email || !name || !password)
    return res.status(400).json({ message: "Input fields Empty!" });

  console.log(email, name, password);
  const hash = bcrypt.hashSync(password, saltRounds);
  knex.transaction(function (trx) {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        let { email } = loginEmail[0];
        return trx
          .insert({
            name: name,
            email: email,
            joined: new Date(),
          })
          .into("users")
          .returning("*")
          .then((response) => {
            console.log(response);
            return res.json(response[0]);
          });
      })
      .then(trx.commit)
      .catch((err) =>
        res.status(400).json({ message: "This Email already exists!Try again" })
      );
  });
};

module.exports = {
  registerHandler,
};
