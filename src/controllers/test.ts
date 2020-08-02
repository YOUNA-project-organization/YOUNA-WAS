import { Request, Response, response } from "express";
import axios from "axios";
import cheerio from "cheerio";

export const testController = async (req: Request, res: Response) => {
  const encodedUri = encodeURI(
    `http://store.naver.com/sogum/api/businesses?start=1&display=100&query=공릉동+맛집&sortingOrder=reviewCount`
  );

  console.log(encodedUri);

  try {
    const please = await axios.get(encodedUri);
    // @ts-ignore
    const datas = please.data.items as [any];

    datas.map((data) => {
      console.log(data);
    });

    res.json({
      ok: true,
    });
  } catch (err) {
    res.json({
      ok: true,
    });
  }
};
