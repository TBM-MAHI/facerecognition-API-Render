const signInHandler = (knex, bcrypt) => (req, res) => {
    let { email, password } = req.body;
   if (!email || !password)
     return res.status(400).json({ message: "Input fields Empty!" });
   knex
     .select("email", "hash")
     .from("login")
     .where("email", "=", req.body.email)
     .then((data) => {
       let { hash } = data[0];
       const isValid = bcrypt.compareSync(req.body.password, hash);
       if (isValid) {
         return knex
           .select("*")
           .from("users")
           .where("email", "=", req.body.email)
           .then((user) => {
             console.log(user);
             res.json(user[0]);
           })
           .catch((err) => res.status(400).json("Unable to get user"));
       }
       else
         return res.status(400).json({ message : "Password Incorrect!"});
     })
     .catch((err) => res.status(400).json({ message:"Email not Found!"}));
};

module.exports = {
  signInHandler
};