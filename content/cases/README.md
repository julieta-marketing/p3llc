# 在 GitHub 新增或修改 Case

一个 `.md` 文件就是一个 Case。只需要修改这一份文件，首页 Case Studies、Case Library 和 Case Detail 会一起更新。

## 新增 Case

1. 打开 `public/case-studies/`，选择 **Add file → Upload files**，上传案例图片。
2. 打开 `content/cases/_template.md`，复制全部内容。
3. 回到 `content/cases/`，选择 **Add file → Create new file**。
4. 文件名使用“下一个编号 + 简单英文名称”，例如 `07-new-civic-project.md`。
5. 粘贴模板，替换内容并提交。

文件名会自动生成网页地址：

`07-new-civic-project.md` → `/case-studies/new-civic-project`

编号只负责排列顺序，不会出现在网址中。

## 文件顶部只填写 4 项

```md
---
title: Case 名称
image: /case-studies/图片文件名.jpg
summary: 一句话简介
categories: Alternative Delivery
---
```

- `title`：Library、首页和详情页共用的 Case 名称。
- `image`：先把图片上传到 `public/case-studies/`，这里填写 `/case-studies/图片文件名.jpg`。
- `summary`：Library、首页和详情页标题下方共用的一句话简介。
- `categories`：从下面 4 个现有分类中选择，可填写一个或多个；多个分类用英文逗号隔开。

可用分类：

- `Alternative Financing`
- `Alternative Delivery`
- `Expert Network`
- `Economic Development Implementation`

## 详情页填写 5 个小节

不要修改小节标题，只替换标题下方的文字：

```md
## Project Overview

项目概述

## Our Role

我们的角色

## Challenge

项目挑战

## Approach

解决方式

## Results

- 第一项成果
- 第二项成果
```

`Results` 的每一项前面保留 `- `。第一项成果也会显示在详情页主图下方的 Selected Outcome 区域。

## 修改已有 Case

打开 `content/cases/` 中对应的 `.md` 文件，点击铅笔图标，修改并提交即可。无需修改任何页面代码。

## 避免格式错误

- 不要删除文件顶部的两条 `---`。
- 不要修改 `## Project Overview` 等 5 个小节标题。
- 图片路径以 `/case-studies/` 开头，并与上传的图片文件名完全一致。
- 单个文件填写错误时，网站会跳过该文件，不会影响其他 Case。
