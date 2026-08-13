# 在 GitHub 新增或修改 News

一篇 `.md` 文件就是一篇 News。提交文件后，网站会自动更新下面三处：

- 首页的 **News** 版块
- `/news` 页面（标题为 **News**，副标题 **Articles and Updates**）
- 该文章自己的详情页 `/news/文件名`

## 新增 News

1. 打开 `public/news/`，选择 **Add file → Upload files**，上传新闻图片。
2. 打开 `_template.md`，复制全部内容。
3. 回到 `content/news/`，选择 **Add file → Create new file**。
4. 使用简单的英文文件名，例如 `new-project-announcement.md`。
5. 粘贴模板，只填写下面 5 项和正文，然后提交。

```md
---
title: 新闻标题
date: 2026-08-05
image: /news/图片文件名.jpg
summary: 一到两句话的简介
about: 原始来源或转载说明
---

完整文章正文
```

## 只需要注意三点

- 日期使用 `YYYY-MM-DD`，例如 `2026-08-05`。
- 图片先上传到 `public/news/`，文件中只填写 `/news/图片文件名.jpg`。
- 不要删除模板中的两条 `---`；正文段落之间留一个空行。

文件名会自动成为网页地址，例如：

`new-project-announcement.md` → `/news/new-project-announcement`

网站会按日期从新到旧排序，并自动生成编号。单个文件填写错误时，网站会跳过该文件，不会影响其他 News。

## 在网站上对应的位置

| 你改的地方 | 显示在哪里 |
| --- | --- |
| `title` | 首页 News 列表、`/news` 卡片、详情页大标题 |
| `date` | 三处的日期，同时决定排序 |
| `image` | `/news` 卡片配图、详情页主图 |
| `summary` | `/news` 卡片的简介 |
| `about` | 详情页的来源说明 |
| 正文 | 详情页文章内容 |

## 修改已有 News

打开对应的 `.md` 文件，点击铅笔图标，修改内容并提交即可。无需修改任何页面代码。
