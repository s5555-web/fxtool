# 分项记账 FXTool

Vue 3.5 + Vite 8 单机记账工具。浏览器版、Windows Electron 免安装版、Android WebView APK 共用同一套界面，离线安装包不需要连接服务器。

## 使用

首页创建命名模块，点击模块名称进入内容页。输入 `12.23.32.45.12.1各50`，立即预览六项金额，总计 300.00，点击保存记录。支持每行一组输入；重复号码逐项保留；金额最多两位小数，以整数分计算。

解析设置内分别配置号码连接符、金额分隔词，每行一个元素。默认连接符包括 `. 。 , ， 、 空格 / -`，金额分隔词包括 `各 每 每个 各个`。支持多字符元素，优先匹配较长分隔词。

内容记录默认筛选本机今天，可修改起止日期或查看全部。模块累计金额不受筛选影响，内容页另显示当前筛选金额。删除模块、记录、清除缓存均需确认。

数据保存在当前设备当前应用的 localStorage，无线上数据库、无埋点、无外部字体。网页不同浏览器、不同地址和安装包的数据互相独立，可通过 JSON 导出与恢复迁移。清浏览器数据或卸载应用可能丢失数据，请定期备份。

## 开发与打包

要求 Node.js 22.12+。

```sh
npm ci
npm run dev
npm test
npm run build
npm run pack:win
```

Windows 文件位于 `release/分项记账 1.0.0.exe`，x64 免安装，未配置商业代码签名。Windows 构建也可使用 GitHub Actions。

Android 要求 JDK 21、Android SDK 36：

```sh
npm run android:sync
cd android
./gradlew assembleDebug
```

APK 位于 `android/app/build/outputs/apk/debug/app-debug.apk`。这是可直接安装的调试签名包；正式发布需配置并保管独立签名密钥。仓库 Actions 支持手动生成两种离线包。

## 部署

将 `dist/` 上传到 Nginx 静态目录即可。808 只提供静态文件，所有记录仍在访问者本机保存。服务器目录 `/opt/fxtool/public`，源码目录 `/opt/fxtool/source`，旧 808 配置备份 `/opt/fxtool/backups/lingozi.before-fxtool`。

### 使用现有 SDK 35 快速构建

无需 Gradle 或在线依赖，使用原生 WebView 容器加载内置 Vue 资源；本地 HTTPS 虚拟地址由容器拦截，应用无需联网权限。支持原生文件选择与 JSON 导出。

```sh
npm run build
ANDROID_HOME=/path/to/android-sdk bash scripts/build-android-offline.sh
```

要求 JDK 17+、Android SDK platform 35、build-tools 35.0.0。输出 `release/fxtool-android.apk`（调试签名）。`android/` 另保留 Capacitor 方案供后续扩展。
