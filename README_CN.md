# 个人学术主页模板

一个简洁优雅的个人主页模板，适合学者和研究人员使用。

## ✨ 特性

- 🎨 简洁专业的设计
- 🌓 深色/浅色主题切换
- 📱 完全响应式
- ⚡ 快速轻量（无框架依赖）
- 🔧 通过JSON配置，简单易用
- 📦 长列表的展开/收起功能
- 🎯 板块可见性控制
- 🎭 专业图标库（Font Awesome）

## 🚀 快速开始

1. **下载**此模板
2. **编辑** `config.json` 填入你的信息
3. **替换** `assets/files/` 中的图片为你自己的
4. **打开** `index.html` 在浏览器中查看或部署到服务器

就这么简单！无需构建过程，无需安装依赖。

## 📝 配置指南

所有内容通过 `config.json` 配置。

### 基本信息

```json
{
  "name": "你的名字",
  "title": "你的职位/头衔",
  "avatar": "assets/files/avatar/avatar.jpg",
  "bio": "你的简介。支持 **粗体** 和 *斜体* markdown语法。"
}
```

### 社交链接

```json
"links": [
  {
    "icon": "github",
    "name": "GitHub",
    "url": "https://github.com/username"
  }
]
```

**可用图标**（来自 [Font Awesome](https://fontawesome.com/icons)）：
- `github`, `book-open`, `mail`, `linkedin`, `twitter`, `globe`, `file-text`, `youtube`, `instagram`, `facebook`

浏览全部图标：https://fontawesome.com/icons

### 板块配置

每个板块：

```json
"section_name": {
  "title": "板块标题",
  "visible": true,        // 显示/隐藏板块
  "initialShow": 3,       // 初始显示的条目数
  "items": [...]
}
```

#### 教育经历

```json
"education": {
  "visible": true,
  "items": [{
    "years": "2020 - 2024",
    "school": "大学名称",
    "schoolUrl": "https://university.edu",
    "dept": "院系名称",
    "degree": "学位名称",
    "logo": "assets/files/institute/logo.png"
  }]
}
```

#### 发表论文

```json
"publications": {
  "visible": true,
  "items": [{
    "title": "论文标题",
    "authors": "作者1, **你的名字**, 作者3",
    "venue": "会议/期刊名称",
    "type": "Conference",
    "links": [
      { "name": "Paper", "url": "https://..." }
    ],
    "award": "最佳论文奖"
  }]
}
```

#### 开源贡献

```json
"opensource": {
  "visible": true,
  "items": [{
    "title": "项目名称",
    "organization": "GitHub",
    "year": "2024",
    "description": "简短描述",
    "url": "https://github.com/..."
  }]
}
```

#### 获奖情况

```json
"awards": {
  "visible": true,
  "items": [{
    "title": "奖项名称",
    "organization": "颁奖机构",
    "year": "2024",
    "description": "简短描述"
  }]
}
```

#### 项目经历

```json
"projects": {
  "visible": true,
  "items": [{
    "title": "项目名称",
    "description": "项目描述",
    "url": "https://..."
  }]
}
```

## 🖼️ 图片指南

### 头像
- 位置：`assets/files/avatar/avatar.jpg`
- 尺寸：推荐 520x520px
- 格式：JPG 或 PNG

### 机构Logo
- 位置：`assets/files/institute/`
- 格式：推荐PNG透明背景
- 高度：60px（宽度自动缩放）

## 🚀 部署

### 本地测试
```bash
python3 -m http.server 8000
# 访问 http://localhost:8000
```

### GitHub Pages
1. 推送到GitHub
2. 设置 → Pages
3. 选择分支
4. 网站地址：`https://username.github.io/repo-name`

## 🐛 故障排除

**图片不显示？**
- 检查config.json中的文件路径
- 确保图片存在于assets/files/目录
- 使用浏览器开发工具（F12）→ Network标签查看

**图标不显示？**
- 检查网络连接（图标从CDN加载）
- 在 https://fontawesome.com/icons 验证图标名称

**板块不显示？**
- 确保config.json中设置了 `visible: true`
- 检查items数组不为空

## 📄 许可

可自由用于个人学术主页。

## 🙏 致谢

- 图标：[Font Awesome](https://fontawesome.com/)
- 字体：[Google Fonts](https://fonts.google.com/)
- 使用纯HTML、CSS和JavaScript构建
- 🤖 AI辅助开发（Claude）

---

**需要帮助？** 查看示例 `config.json`！
