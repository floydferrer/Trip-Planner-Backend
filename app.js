const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const tripsRoutes = require("./routes/trips");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(authenticateJWT)

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/trips", tripsRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
  });
  
/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
if (process.env.NODE_ENV !== "test") console.error(err.stack);
const status = err.status || 500;
const message = err.message;

return res.status(status).json({
    error: { message, status },
});
});

module.exports = app;