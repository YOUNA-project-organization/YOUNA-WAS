import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { writeErrorLogs, generateJwtToken } from "../utils/Utils";

export const loginUser = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({
      ok: false,
      status: 400,
      error: "클라이언트로 부터 변수를 제대로 전달받지 못하였습니다.",
    });
  }
  const existingUser = await UserModel.find({
    name,
  });
  if (existingUser.length !== 1) {
    return res.status(404).json({
      ok: true,
      status: 404,
      error: "존재하지 않는 유저입니다. 유저명을 다시 한 번 확인해주세요.",
    });
  }

  if (password === existingUser[0].password) {
    const token = generateJwtToken(existingUser[0].id);

    return res.json({
      ok: true,
      status: 200,
      error: null,
      token,
    });
  } else {
    return res.status(401).json({
      ok: true,
      status: 401,
      error: "비밀번호가 일치하지 않습니다.",
    });
  }
};

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
      return res.status(409).json({
        ok: true,
        status: 409,
        error: "이미 존재하는 유저입니다. 다른 유저명으로 등록해주세요",
      });
    } else {
      // 유저가 존재하지 않을때
      const newUser = new UserModel({
        name,
        password,
      });
      await newUser.save();
      const jwtToken = generateJwtToken(newUser.id);
      return res.status(200).json({
        ok: true,
        status: 200,
        error: null,
        token: jwtToken,
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
