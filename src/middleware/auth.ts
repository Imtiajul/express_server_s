import { NextFunction, Request, Response } from "express"
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../config/db";

const auth = (...roles: ("admin" | "user")[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization; // 'bearer njksd;kfbsk;df;ksd'  ['bearer','jkasndknf']
    if (!token) {
      throw new Error("You are not authorized");
    }
    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    // console.log(decoded);
    const user = await pool.query(
      `
      SELECT * FROM users WHERE email=$1
      `,
      [decoded.email]
    );
    if (user.rows.length === 0) {
      throw new Error("User not found!");
    }
    // console.log(roles.length)
    req.user = decoded;
    if (!roles.length && !roles.includes(decoded.role)) {
      throw new Error("You are not authorized");
    }
    next();
  };
}
export default auth;