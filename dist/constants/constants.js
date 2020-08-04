"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
// 현재 서버가 개발 모드인지 프로덕션 모드인지 구분하는 변수를 담는다
exports.env = process.env.NODE_ENV &&
    process.env.NODE_ENV.trim().toLowerCase() == "production"
    ? "production"
    : "development";
