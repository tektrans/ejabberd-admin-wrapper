import 'dotenv/config';
import { simpleGit } from 'simple-git';

const webuiListenPort = Number(process.env.WEBUI_LISTEN_PORT) || 11280;

const constants = {
  appTitle: 'eJabberd Admin Wrapper',
  version: (await simpleGit().raw('describe'))?.trim(),
  copyright: '(c) PT TEKNOLOGI TRANSAKSI DIGITAL (TEKTRANS) 2025',
  webuiListenPort,
  webuiBaseUrl: process.env.WEBUI_BASE_URL || `http://localhost:${webuiListenPort}`
};

export default constants;
