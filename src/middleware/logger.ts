import path from "path";
import fs from "fs";
import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}\n`);
 
  const log = `[${new Date().toISOString()}] ${req.method} ${req.path}\n`;
  fs.writeFile(path.join(process.cwd(), 'server.log'), log, {flag: 'a'}, (err) => {
    if(err) {
      console.log(err.message);
    }
  });
  // to proceed the next part
  next();
}

export default logger;