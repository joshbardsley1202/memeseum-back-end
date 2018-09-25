const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const app = express()


app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(cors())
app.use("/users", require("./routes/Users"))
app.use("/posts",require("./routes/Posts"))

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    console.log("Express error",err)
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get("env") === "development" ? err.stack : {}
    });
});

module.exports = app;
