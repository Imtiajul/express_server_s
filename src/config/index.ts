import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(process.cwd(), '.env')})

const config  = {
   CONNECTION_STRING : 'postgresql://neondb_owner:npg_fbAKZCp7mOD0@ep-green-cake-a1o0lfdt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
   PORT : 5000,
}

export default config;