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
             //console.log(user);
             let { id, name, email, entries } = user[ 0 ];
             res.status(200).json({
               message: `sign in Success`, data: {
                 id,
                 name,
                 email,
                 entries
               }
             });
           })
           .catch((err) => res.status(400).json({ err, message: "Unable to fetch!" }
           ));
       }
       else
         return res.status(400).json({ message: "Incorrect Credentials!"});
     })
     .catch((err) => res.status(400).json({ message:"Email not Found!"}));
};

module.exports = {
  signInHandler
};