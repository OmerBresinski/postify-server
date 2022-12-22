"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("dotenv");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var api_1 = require("./api");
var passport_1 = __importDefault(require("passport"));
var express_session_1 = __importDefault(require("express-session"));
var app = (0, express_1["default"])();
app.use((0, express_session_1["default"])({
    secret: "shimmering_unicorn",
    resave: false,
    saveUninitialized: true
}));
app.use(passport_1["default"].initialize());
app.use(passport_1["default"].session());
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
app.use("/api", api_1.api);
app.listen(process.env.SERVER_PORT, function () {
    return console.log("Server started on port ".concat(process.env.SERVER_PORT));
});
//# sourceMappingURL=server.js.map