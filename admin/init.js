import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set the AdminJS tmp dir to a local folder in the project root
// this MUST be done before AdminJS is imported
process.env.ADMIN_JS_TMP_DIR = path.resolve(__dirname, '../adminjs_assets');
console.log('ADMIN_JS_TMP_DIR set to:', process.env.ADMIN_JS_TMP_DIR);
