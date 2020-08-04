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
exports.makeNewUserAccount = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const Utils_1 = require("../utils/Utils");
exports.makeNewUserAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({
            ok: false,
            status: 400,
            error: "클라이언트로 부터 변수를 제대로 전달받지 못하였습니다.",
        });
    }
    try {
        const existingUser = yield UserModel_1.default.find({
            name,
        });
        if (existingUser.length !== 0) {
            // 유저가 이미 존재할때
            return res.status(202).json({
                ok: true,
                status: 202,
                error: "이미 존재하는 유저입니다. 다른 유저명으로 등록해주세요",
            });
        }
        else {
            // 유저가 존재하지 않을때
            const newUser = new UserModel_1.default({
                name,
                password,
            });
            yield newUser.save();
            const jwtToken = Utils_1.generateJwtToken(newUser.id);
            return res.status(200).json({
                ok: true,
                status: 200,
                error: null,
                token: jwtToken,
            });
        }
    }
    catch (err) {
        Utils_1.writeErrorLogs(err.message);
        return res.status(500).json({
            ok: false,
            status: 500,
            error: "데이터베이스 오류",
        });
    }
});
