"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var App = /** @class */ (function () {
    function App() {
        this.express = express_1.default();
        this.middlewares();
        this.database();
        this.routes();
    }
    App.prototype.middlewares = function () {
        this.express.use(express_1.default.json());
        this.express.use(cors_1.default());
    };
    App.prototype.database = function () {
        mongoose_1.default.connect('mongodb+srv://thebet401:thebet401@cluster0.dmhbs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true
        });
    };
    App.prototype.routes = function () {
        this.express.get('/', function (req, res) {
            return res.send('Hello World');
        });
    };
    return App;
}());
exports.default = new App().express;
