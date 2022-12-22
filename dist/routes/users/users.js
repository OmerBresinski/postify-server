"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.users = void 0;
var prismaClient_1 = require("../../prismaClient");
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var passport_twitter_1 = __importDefault(require("passport-twitter"));
exports.users = express_1["default"].Router();
passport_1["default"].use(new passport_twitter_1["default"].Strategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET,
    callbackURL: "http://127.0.0.1:4000/api/users/auth/twitter/callback"
}, function (token, tokenSecret, profile, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        try {
            // Find or create the user in your database based on their Twitter profile
            console.log(profile);
            user = prismaClient_1.prisma.users.create({
                data: { email: "omer@twitter.com" }
            });
            return [2 /*return*/, done(null, user)];
        }
        catch (error) {
            return [2 /*return*/, done(error)];
        }
        return [2 /*return*/];
    });
}); }));
exports.users.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, profileUrl, note;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, profileUrl = _a.profileUrl;
                return [4 /*yield*/, prismaClient_1.prisma.users.create({
                        data: {
                            email: email,
                            profileUrl: profileUrl
                        }
                    })];
            case 1:
                note = _b.sent();
                return [2 /*return*/, res.json(note)];
        }
    });
}); });
exports.users.get("/", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.prisma.users.findMany()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); });
exports.users.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.prisma.users.findFirst({ where: { id: +req.params.id } })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.json(user)];
        }
    });
}); });
exports.users.post("/auth/twitter", passport_1["default"].authenticate("twitter"));
exports.users.get("/auth/twitter/callback", passport_1["default"].authenticate("twitter", { failureRedirect: "/login" }), function (req, res) {
    console.log("Callback", { req: req, res: res });
    // Successful authentication, redirect home.
    res.redirect("/");
});
exports.users.get("/logout", function (req, res) {
    req.logout({ keepSessionInfo: true }, function (err) { return console.log(err); });
    res.redirect("/");
});
//# sourceMappingURL=users.js.map