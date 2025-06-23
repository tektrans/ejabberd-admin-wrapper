import 'dotenv/config';
import { simpleGit } from 'simple-git';

const constants = {
  appTitle: 'eJabberd Admin Wrapper',
  version: await simpleGit().raw('describe'),
  copyright: '(c) PT TEKNOLOGI TRANSAKSI DIGITAL (TEKTRANS) 2025',
  webuiListenPort: Number(process.env.WEBUI_LISTEN_PORT) || 11280
};

export default constants;
