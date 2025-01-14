> _Read this in another language: [English](README.md)_

## 概览

| 支持场景 | 代码入口 | 功能描述 |
| --- | --- | --- |
| 1 对 1 互动教学 | [one-to-one.tsx](https://github.com/AgoraIO-Usecase/eEducation/blob/master/education_web/src/pages/classroom/one-to-one.tsx) | 1 个主持人和 1 个观众默认以主播角色进入会议 |
| 1 对 N 在线小班课 | [small-class.tsx](https://github.com/AgoraIO-Usecase/eEducation/blob/master/education_web/src/pages/classroom/small-class.tsx) | 1 个主持人和最多 16 个观众默认以主播角色进入会议 |
| 互动直播大班课 | [big-class.tsx](https://github.com/AgoraIO-Usecase/eEducation/blob/master/education_web/src/pages/classroom/big-class.tsx) | 1 个主持人默认以主播角色进入会议，观众默认以观众角色进入会议，观众人数无限制 |

### 在线体验

[web demo](https://solutions.agora.io/education/web_v2/)

### 使用的 SDK

- agora-rtc-sdk（声网 RTC Web SDK）
- agora-rtm-sdk（声网实时消息 Web SDK）
- agora-electron-sdk（声网官方 electron sdk）
- white-web-sdk（Netless 官方白板 sdk）
- ali-oss（可替换成你自己的 oss client）
- 声网云录制 （建议在服务端集成）

### 使用的技术

- typescript 4.4.4
- react & react hooks & mobx
- electron 12.0.0 & electron-builder
- ui-kit & storybook
- Agora Edu 云服务

## 准备工作

- 请确保你已经完成 Agora e-Education 项目指南中的[前提条件](../README.zh.md#prerequisites)。
- 配置阿里云 OSS，详见[阿里云 OSS 配置指南](https://github.com/AgoraIO-Usecase/eEducation/wiki/%E9%98%BF%E9%87%8C%E4%BA%91OSS%E9%85%8D%E7%BD%AE%E6%8C%87%E5%8D%97)。
- 重命名 `.env.example` 为 `.env`，并配置以下参数：

  - **（必填）你获取到的声网 App ID**

  ```bash
  # 声网的 App ID
  REACT_APP_AGORA_APP_ID=agora appId
  REACT_APP_AGORA_APP_CERTIFICATE=agora app certificate
  ```

- 中国区客户推荐使用以下方式安装 npm 依赖包和 electron & node-sass 加速

  > 我们建议使用 npm 而非 yarn 或 cnpm

  ```
  # 仅适用于中国区客户
  # macOS
  export ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
  export ELECTRON_CUSTOM_DIR="7.1.14"
  export SASS_BINARY_SITE="https://npm.taobao.org/mirrors/node-sass/"
  export ELECTRON_BUILDER_BINARIES_MIRROR="https://npm.taobao.org/mirrors/electron-builder-binaries/"

  # Windows
  set ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
  set ELECTRON_CUSTOM_DIR=7.1.14
  set ELECTRON_BUILDER_BINARIES_MIRROR=https://npm.taobao.org/mirrors/electron-builder-binaries/
  set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/

  npm install --registry=https://registry.npm.taobao.org
  ```

- 安装 Node.js LTS

## 运行和发布 Web demo

1. 安装 npm

   ```
   npm install
   ```

2. 本地运行 Web demo

   ```
   npm run dev
   ```

   如果在运行中出现 hooks 的报错，删除 packages/agora-scenario-ui-kit/node_modules/react 即可 mac 电脑直接运行 `npm run removeCache`

3. 发布 Web demo。发布前需要修改 `package.json` 中的 "homepage": "你的域名/地址"。例如，`https://solutions.agora.io/education/web` 需修改为 `"homepage": "https://solutions.agora.io/education/web"`

   ```
   npm run build:demo
   ```

## 运行和发布 Electron demo

### macOS

1. 安装 npm

   ```
   npm install
   ```

2. 本地运行 Electron demo

   ```
   npm run dev:electron
   ```

3. 发布 Electron demo

   ```
   npm run pack:electron:mac
   ```

成功运行结束后会生成一个 release 目录，里面包含一个 dmg 安装文件，正常打开移动到 Application 目录即可完成安装，然后可以执行程序。

### Windows

1. 安装 electron 12.0.0: 先找到 `package.json` 里的 `agora_electron` 按照如下结构替换
   ```
   "agora_electron": {
     "electron_version": "12.0.0",
     "prebuilt": true,
     "platform": "win32",
     "arch": "ia32"
   },
   ```
   再手动安装 electron 12.0.0
   ```
   npm install electron@12.0.0 --arch=ia32 --save-dev
   ```
2. 安装 npm

   ```
   npm install
   ```

3. 本地运行 Electron demo

   ```
   npm run dev:electron
   ```

4. 发布 Electron demo

   ```
   npm run pack:electron:win
   ```

成功运行结束后会生成一个 release 目录，里面包含一个 exe 安装程序，请使用 Windows 管理员身份打开，即可完成安装，然后可以执行程序。

## 常见问题

- 如果你在运行 Electron 时发现 localhost:3000 端口被占用，可以在 `package.json` 里找到 `ELECTRON_START_URL=http://localhost:3000` 修改成你本地可以使用的端口号。
- 如果打包时遇到 `Error: Can't resolve '../../build/Release/agora_node_ext'` 异常，需要在 Webpack 打包配置中加入：`externals: { 'agora-electron-sdk': 'commonjs2 agora-electron-sdk' }`
- 在 Linux 环境下构建报错：`Error:unsupported platform!`，需要修改 agora-classroom-sdk/package.json 文件配置：`"agora_electron": {"electron_version": "12.0.0","prebuilt": true}` 修改为 `"agora_electron": {"electron_version": "12.0.0","prebuilt": true,"platform":"win32" | "darwin",}`
