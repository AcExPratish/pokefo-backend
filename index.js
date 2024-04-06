import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

//defining allowed origins
const allowedOrigins = ["http://localhost:3000"];

//configuring cors with specific origin whitelist
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("not allowed by cors"));
      }
    },
    optionsSuccessStatus: 200,
    methods: ["POST"],
  })
);

//parsing json bodies
app.use(bodyParser.json());

app.get("/", (req, res) => {
  try {
    return res.json({ message: "server running" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

//verify using code -> post method
app.post("/verify", (req, res) => {
  const code = req?.body?.code;
  try {
    if (code && code?.length === 6) {
      return res.status(200).json({ message: "successful verification" });
    }

    return res.status(400).json({ message: "verification error" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

//starting the server
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
