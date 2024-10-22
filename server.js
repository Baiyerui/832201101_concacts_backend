const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 初始化 Express 应用
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});

app.use(cors({
  origin: '*' // 允许所有来源访问，生产环境下可以设置为特定的前端地址
}));

// 使用中间件
app.use(cors());
app.use(express.json());

// 连接 MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// 联系人路由
const contactRoutes = require('./routes/contacts');
app.use('/api/contacts', contactRoutes);

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
