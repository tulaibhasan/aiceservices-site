import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';
import worker from './src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. Load .dev.vars if exists
const env = { ...process.env };
const devVarsPath = path.join(__dirname, '.dev.vars');

if (fs.existsSync(devVarsPath)) {
  const content = fs.readFileSync(devVarsPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      env[key] = val;
    }
  }
}

const PORT = process.env.PORT || 8787;

// 2. Create lightweight local server mapping Node HTTP to Worker fetch API
const server = http.createServer(async (nodeReq, nodeRes) => {
  try {
    const origin = nodeReq.headers.host ? `http://${nodeReq.headers.host}` : `http://localhost:${PORT}`;
    const fullUrl = new URL(nodeReq.url, origin).href;

    const headers = new Headers();
    for (const [key, value] of Object.entries(nodeReq.headers)) {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach(v => headers.append(key, v));
        } else {
          headers.set(key, value);
        }
      }
    }

    let body = null;
    if (nodeReq.method !== 'GET' && nodeReq.method !== 'HEAD') {
      const chunks = [];
      for await (const chunk of nodeReq) {
        chunks.push(chunk);
      }
      body = Buffer.concat(chunks);
    }

    const request = new Request(fullUrl, {
      method: nodeReq.method,
      headers: headers,
      body: body,
    });

    const response = await worker.fetch(request, env, {});

    nodeRes.statusCode = response.status;
    response.headers.forEach((val, key) => {
      nodeRes.setHeader(key, val);
    });

    if (response.body) {
      Readable.fromWeb(response.body).pipe(nodeRes);
    } else {
      nodeRes.end();
    }
  } catch (err) {
    console.error('Server error processing request:', err);
    nodeRes.statusCode = 500;
    nodeRes.setHeader('Content-Type', 'application/json');
    nodeRes.end(JSON.stringify({ error: 'Internal Server Error', message: err.message }));
  }
});

import botConfig from './chatbot.config.json' with { type: 'json' };

server.listen(PORT, () => {
  const name = botConfig.business?.name || 'AI';
  console.log(`> ${name} Assistant Cloudflare Worker (Node dev server) running at: http://localhost:${PORT}`);
  console.log(`> Health check: http://localhost:${PORT}/health`);
  console.log(`> Mint token endpoint: POST http://localhost:${PORT}/get-token`);
});
