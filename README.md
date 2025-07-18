# LXScale - 开源心理健康评估平台


## 项目概述

### 什么是 LXScale？

LXScale 是一个完全免费的心理健康评估平台，致力于提供专业、可靠的心理健康筛查工具。目前已实现 SCL-90 问卷演示版，计划整合更多开源心理评估工具，并提供 AI 驱动的分析结果与专业建议。

**项目演示：** [https://www.lxscale.xyz/](https://www.lxscale.xyz/)

### 核心功能

- **零门槛评估：** 完全免费的问卷填写体验
- **AI 分析：** 智能解读评估结果并提供个性化建议
- **专业来源：** 基于学术研究和临床实践的评估工具

## 项目初衷

当前市场存在大量付费心理评估服务，这些服务通过 SEO 技术占据搜索结果前列，但实际上许多评估问卷本身是开源且免费的。这种商业模式对正在寻求心理健康支持的人群造成了不必要的经济负担（特别是填完了才发现要付费获取结果真的会把人气晕掉）。

LXScale 旨在打破这一壁垒，提供真正免费、无隐藏收费的心理评估服务，让每个人都能获得基本的心理健康评估资源。

本项目完全符合 LX 精神，通过技术赋能心理健康领域，虽然和目前看来区块链没什么关系，但还是有很大想象空间的，也十分吸引开发者。

## 解决方案

- **整合优质资源：** 系统性收集并整合开源心理评估问卷（如 SCL-90 等）
- **无障碍体验：** 提供直观、友好的在线评估界面，预期每个问卷的作答和结果页面都会单独进行设计
- **AI 赋能：** 运用先进 AI 技术提供专业的结果分析和初步建议
- **SEO 优化：** 提升平台可见度，与付费服务形成良性竞争
- **持续迭代：** 逐步扩展评估工具库和功能模块

## 技术架构

### 核心技术栈

- **Next.js 15**: App Router + 国际化支持，提供现代化的 React 应用框架
- **TypeScript**: 全栈类型安全保障，提高代码质量和开发效率
- **Tailwind CSS 4**: 高效的实用优先 CSS 框架，快速构建响应式界面
- **Shadcn/ui**: 基于 Radix UI 的高质量组件库，提供可访问的用户界面
- **Next-international**: 完整的国际化解决方案，支持中英双语
- **AI 集成**: DeepSeek API 驱动的智能结果分析与个性化建议
- **RainbowKit**: Web3 集成支持，为未来区块链功能和捐赠机制做准备

### 架构设计理念

#### 问卷系统设计
- **模块化架构**: 每个评估工具独立设计，包含专属的问卷数据、计算逻辑和结果组件
- **渐进式体验**: 智能进度跟踪，支持中途保存和断点续答
- **多维度分析**: 不仅提供总分，还包含因子分析、维度评估和个性化建议
- **响应式适配**: 针对移动端和桌面端优化的不同交互体验

#### 国际化与可访问性
- **双语支持**: 基于 Next-international 的完整中英文本地化
- **文化适配**: 问卷内容和结果解读符合不同文化背景的理解习惯
- **无障碍优化**: 基于 Radix UI 构建，支持键盘导航和屏幕阅读器（持续优化中）
- **语义化结构**: 清晰的 HTML 语义，提升可访问性和 SEO 效果

### 技术优势与成本效益

#### 高效开发架构
- **静态生成优化**: 利用 Next.js SSG 实现极致的页面加载性能
- **组件库集成**: 基于 Shadcn/ui + Radix UI 的企业级组件体系
- **类型安全**: TypeScript 全栈覆盖，减少运行时错误和维护成本
- **智能缓存**: 本地存储 + 浏览器缓存策略，减少网络请求

#### 可持续运营
- **零服务器成本**: 纯前端部署，支持 Vercel/Netlify 等免费托管平台
- **API 成本控制**: DeepSeek API 低成本调用，支持社区众筹或个人配置
- **扩展性设计**: 新增评估工具只需 4 步，开发者友好的贡献流程
- **Web3 就绪**: 预留 RainbowKit 集成，未来支持去中心化捐赠和治理

## 开始使用

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看项目。

## 贡献指南

我们欢迎所有形式的贡献，无论是新功能、问卷资源整合、文档改进还是问题报告。

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系我们

如有任何问题或建议，请通过 [GitHub Issues](https://github.com/yourusername/lxscale/issues) 联系我们。

---

<p align="center">由 <a href="https://lxdao.io/">LXDAO</a> 支持</p>
