const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const dotenv = require('dotenv');

const path = require("path");
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

dotenv.config();
app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const r=await axios.put(
        "https://api.chatengine.io/users/",
        {
            username:username,secret:username,first_name:username
        },
        {
            headers:{"Private-key":process.env.PRIVATE_KEY}
        });
        return res.status(r.status).json(r.data);
  } catch (e) {
        return res.status(e.response.status).json(e.response.data);
  }
});

// app.use(express.static(path.join(__dirname, "../frontend/dist")));

// app.get("*", (req, res) => {
//     res.setHeader("Access-control-Allow-Credentials","true");
//    // res.send("Api is running");
//     res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
// });

app.listen(3001);