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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testController = void 0;
const axios_1 = __importDefault(require("axios"));
exports.testController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const encodedUri = encodeURI(`http://store.naver.com/sogum/api/businesses?start=1&display=100&query=공릉동+맛집&sortingOrder=reviewCount`);
    console.log(encodedUri);
    try {
        const please = yield axios_1.default.get(encodedUri);
        // @ts-ignore
        const datas = please.data.items;
        datas.map((data) => {
            console.log(data);
        });
        res.json({
            ok: true,
        });
    }
    catch (err) {
        res.json({
            ok: true,
        });
    }
});
