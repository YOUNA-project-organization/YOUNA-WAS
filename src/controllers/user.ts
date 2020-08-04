import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { writeErrorLogs } from "../utils/Utils";

export const makeNewUserAccount = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({
      ok: false,
      status: 400,
      error: "클라이언트로 부터 변수를 제대로 전달받지 못하였습니다.",
    });
  }

  try {
    const existingUser = await UserModel.find({
      name,
    });

    if (existingUser.length !== 0) {
      // 유저가 이미 존재할때
      return res.status(202).json({
        ok: true,
        status: 202,
        error: "이미 존재하는 유저입니다. 다른 유저명으로 등록해주세요",
      });
    } else {
      // 유저가 존재하지 않을때
      const newUser = new UserModel({
        name,
        password,
      });
      await newUser.save();
      return res.status(200).json({
        ok: true,
        status: 200,
        error: null,
        token: "준비중",
      });
    }
  } catch (err) {
    writeErrorLogs(err.message);
    return res.status(500).json({
      ok: false,
      status: 500,
      error: "데이터베이스 오류",
    });
  }
};