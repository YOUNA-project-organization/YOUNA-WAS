"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const morgan_2 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
require("./database/mongoose");
const constants_1 = require("./constants/constants");
// 현재 서버가 개발 모드인지 프로덕션 모드인지 구분하는 변수를 담는다
const PORT = constants_1.env === "production" ? 9041 : 5000;
const app = express_1.default();
// Cross-Origin Resource Sharing, CORS
// 추가 HTTP 헤더를 사용하여, 한 출처에서 실행 중인 웹 어플리케이션이 다른 출처의 선택한 자원에
// 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제
app.use(cors_1.default());
// POST에서 json 데이터를 받아올 수 있게 해주는 미들웨어
app.use(express_1.default.json());
if (constants_1.env == "production") {
    // 배포모드라면 서버에 찍히는 로그들을 access_production.log 라는 이름의 파일에다가 담아주고
    app.use(morgan_1.default("common", {
        stream: fs_1.default.createWriteStream("./access_production.log", { flags: "a" }),
    }));
}
else {
    // 개발모드라면 서버에 찍히는 로그들을 access_development.log 라는 이름의 파일에다가 담아준다
    app.use(morgan_1.default("common", {
        stream: fs_1.default.createWriteStream("./access_development.log", { flags: "a" }),
    }));
    // 개발모드일때 서버에 찍히는 로그들을 간단하게 터미널에 찍어준다.
    app.use(morgan_2.default("dev"));
}
app.use("/", routes_1.default);
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
