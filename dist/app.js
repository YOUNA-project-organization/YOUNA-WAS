"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const morgan_2 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
require("./database/mongoose");
// 현재 서버가 개발 모드인지 프로덕션 모드인지 구분하는 변수를 담는다
exports.env = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'production' : 'development';
const PORT = 5000;
const app = express_1.default();
app.use(cors_1.default());
if (exports.env == 'production') {
    // 배포모드라면 서버에 찍히는 로그들을 access_production.log 라는 이름의 파일에다가 담아주고
    app.use(morgan_1.default('common', {
        stream: fs_1.default.createWriteStream('./access_production.log', { flags: 'a' })
    }));
}
else {
    // 개발모드라면 서버에 찍히는 로그들을 access_development.log 라는 이름의 파일에다가 담아준다
    app.use(morgan_1.default('common', {
        stream: fs_1.default.createWriteStream('./access_development.log', { flags: 'a' })
    }));
    // 개발모드일때 서버에 찍히는 로그들을 간단하게 터미널에 찍어준다. 
    app.use(morgan_2.default('dev'));
}
app.use('/', routes_1.default);
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
