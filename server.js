const express = require('express');
const next = require('next');
const mongoose = require("mongoose");
const uri = require("./src/config/db.ts")

const dev = process.env.NODE_ENV !== 'production'; // 判断是否为开发模式
const app = next({ dev }); // 初始化 Next.js
const handle = app.getRequestHandler(); // 处理 Next.js 的页面请求
mongoose.connect(uri,{'dbName':'socialApp'});

app.prepare().then(() => {
  const server = express();

  // 在这里添加自定义 API 路由，例如：
  server.get('/api/custom', (req, res) => {
    res.json({ message: 'Hello from custom API' });
  });

  // 将所有其他请求交给 Next.js 处理
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // 监听端口
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
