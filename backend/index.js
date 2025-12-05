const mongoose = require("mongoose");
const createApp = require("./createApp");
const dotenv = require("dotenv");
dotenv.config();

const app = createApp();
const PORT = process.env.PORT || 5000;
const DATABASEURL = process.env.DATA_BASE_URL;
console.log(DATABASEURL);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose
  .connect(DATABASEURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
