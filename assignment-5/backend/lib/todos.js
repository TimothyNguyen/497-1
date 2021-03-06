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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./todo.db', function (err) {
    if (err)
        console.error(err.message);
    console.log('Connected to the todo database.');
});
db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS task(\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      todo TEXT,\n      last_updated TEXT,\n      completed INTEGER\n    )");
});
var todosRouter = express_1.Router();
/**
 * Basic router, just states hello world
 */
todosRouter.get("/", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, response.json("Hello world")];
    });
}); });
/**
 * Creates a new todo item. Automatically sets to not completed (0) and provides time updated.
 * Needs a
 * 1. title (String)
 * 2. text (String)
 */
todosRouter.post("/createTodo", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var todo, time;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                todo = request.body.todo;
                time = Date.now().toString();
                return [4 /*yield*/, db.run("INSERT INTO task VALUES(?, ?, ?, ?)", [null, todo, time, 0], function (err) {
                        if (err) {
                            console.error(response.status(400).json({ "error": err.message }));
                            return response.status(400).json({ "error": err.message });
                        }
                        response.status(200).json({ id: this.lastID });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
/**
 * Deletes the todo based off the id.
 */
todosRouter.delete("/deleteTodo", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.query.id;
                console.log(id);
                return [4 /*yield*/, db.run("DELETE FROM task WHERE id=" + id, function (err) {
                        if (err) {
                            response.status(400).json({ "error": err.message });
                            return;
                        }
                        response.status(200).json({ success: true });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
/**
 * Gets list of non-completed todos
 */
todosRouter.get("/getTodoList", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var ans;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                    db.all("SELECT * FROM task where completed = 0", function (err, rows) {
                        resolve(rows);
                    });
                })];
            case 1:
                ans = _a.sent();
                return [2 /*return*/, response.json(ans)];
        }
    });
}); });
/**
 * Gets list of completed todos
 */
todosRouter.get("/getCompletedTodoList", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var ans;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                    db.all("SELECT * FROM task where completed = 1", function (err, rows) {
                        resolve(rows);
                    });
                })];
            case 1:
                ans = _a.sent();
                return [2 /*return*/, response.json(ans)];
        }
    });
}); });
/**
 * Updates the todo
 * Passes in id, title, text, completed
 */
todosRouter.put("/updateTodo", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, todo, completed, updatedTime, ans;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, id = _a.id, todo = _a.todo, completed = _a.completed;
                updatedTime = Date.now().toString();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        db.all("UPDATE task SET todo = ?, \n            last_updated=?, completed=? where id=?", [todo, updatedTime, completed, id], function (err) {
                            if (err) {
                                console.error(response.status(400).json({ "error": err.message }));
                                return response.status(400).json({ "error": err.message });
                            }
                            response.status(200).json({ id: id });
                        });
                    })];
            case 1:
                ans = _b.sent();
                return [2 /*return*/, response.json(ans)];
        }
    });
}); });
/**
 * Gets a todo based off the id
 */
todosRouter.get("/getTodo", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, ans;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.query.id;
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        db.all("SELECT * FROM task where id = " + id, function (err, rows) {
                            resolve(rows);
                        });
                    })];
            case 1:
                ans = _a.sent();
                return [2 /*return*/, response.json(ans)];
        }
    });
}); });
exports.default = todosRouter;
