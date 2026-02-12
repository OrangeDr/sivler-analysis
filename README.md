# 白银价格分析 - 交互式网页

## 部署步骤

### 1. 创建 GitLab 仓库
在公司 GitLab 上创建新项目，例如 `silver-analysis`

### 2. 上传代码
```bash
cd gitlab-deploy
git init
git add .
git commit -m "Initial commit: 白银价格分析网页"
git remote add origin https://你的gitlab地址/你的用户名/silver-analysis.git
git push -u origin main
```

### 3. 等待部署
- 进入 GitLab 项目 → Build → Pipelines
- 等待流水线变成绿色 ✅

### 4. 获取访问链接
- 进入 Deploy → Pages
- 获取链接：`https://你的用户名.gitlab.io/silver-analysis/`

## 文件结构
```
├── .gitlab-ci.yml    # GitLab CI/CD 配置
├── README.md         # 本文件
└── web/
    ├── index.html    # 主页面
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

## 功能
- 📊 关键数据卡片（价格、供需缺口、金银比、库存）
- 📈 4个交互式图表（Chart.js）
- ⚔️ 多空辩论对比
- 📄 完整分析报告
