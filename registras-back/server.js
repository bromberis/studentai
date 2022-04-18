const mongoose = require("mongoose");
const app = require("./app");

const DB =
  "mongodb+srv://Emilija:Wr_CN_Xkiqpt2Pm@cluster0.jjs1y.mongodb.net/students_register?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("mongoDB connected");
  });

const port = 3005;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
