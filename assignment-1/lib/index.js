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
var axios = require('axios');
var http = require('http');
var url = "https://randomuser.me/api";
var pageNum = "?page=";
/**
 * Function that calls the api: https://randomuser.me/api. This is grabs
 * a random user and we make it asynchronous so we don't lose data.
 */
function getNewUser() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("" + url + pageNum + 1)
                            .then(function (res) {
                            var person = res.data.results[0];
                            var newUser = {
                                "name": person.name.first + " " + person.name.last,
                                "age": person.dob.age,
                                "gender": person.gender,
                            };
                            /*
                            const newUser:User = <User>{
                                "gender": person.gender,
                                "name": person.name.first + " " + person.name.last,
                                "email": person.email,
                                "age": person.dob.age,
                                phone: person.phone,
                                cell: person.cell,
                                picture: person.picture
                            };
                            */
                            return newUser;
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Automatically generate 20 users
 * @param numUsers
 */
function generateUsers(numUsers) {
    return __awaiter(this, void 0, void 0, function () {
        var usersList, i, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    usersList = [];
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < numUsers)) return [3 /*break*/, 4];
                    _b = (_a = usersList).push;
                    return [4 /*yield*/, getNewUser()];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, usersList];
            }
        });
    });
}
/**
 * Provides a function to filter by age
 * @param usersList
 * @param lowerAge
 * @param upperAge
 */
function filterUsersByAge(usersList, lowerAge, upperAge) {
    var users = usersList.filter(function (user) {
        return user.age >= lowerAge && user.age <= upperAge;
    });
    return users;
}
/**
 * Function to find people that are 35 years and younger
 */
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var ans, under35;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, generateUsers(20)];
                case 1:
                    ans = _a.sent();
                    under35 = filterUsersByAge(ans, 0, 35);
                    console.log(under35);
                    return [2 /*return*/];
            }
        });
    });
}
main();
