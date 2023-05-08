let handleImgaeAPI = (req, res) => {
  console.log("loading...");
  let { imgURL } = req.body;
  const IMAGE_URL = imgURL;
  // const IMAGE_URL = "https://th.bing.com/th/id/OIP.vIQr_keH9CObzE7niK_lcgHaEo?pid=ImgDet&rs=1";
  // const IMAGE_URL = "https://c.stocksy.com/a/wyk500/z9/1372242.jpg";
  const PAT = process.env.PAT;
  const MODEL_ID = "face-detection";
  const MODEL_VERSION_ID = process.env.MODEL_VERSION_ID; 
  const raw = JSON.stringify({
    user_app_id: {
      user_id: "mahi89",
      app_id: "Face_detect",
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id

  fetch(
    "https://api.clarifai.com/v2/models/" +
      MODEL_ID +
      "/versions/" +
      MODEL_VERSION_ID +
      "/outputs",
    requestOptions
  )
    .then((apiData) => 
     apiData.json()
    ).then(result=> res.send(result))
   
    .catch((err) => res.status(400).json({ msg: "error" }));
};

let entryHandler = (req, res, knex) => {
  let { id } = req.body;
  console.log(id);
  knex("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((response) => {
      if (response.length) {
        console.log(response);
        return res.json(response);
      } else return res.status(400).json({ message: "User Not Found" });
    });
};

module.exports = {
  entryHandler,
  handleImgaeAPI,
};
