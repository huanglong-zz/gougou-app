# gougouApp

降级到 RN 0.22.0

1. 锁定版本

- `nvm use v6.10.0 && nvm alias default v6.10.0`
- `npm i react-native-cli@0.1.10 -g`

2. 重装依赖

```
rm -rf node_modules && npm i
```

3. 升级模板

react-native upgrade

针对不同选项，输入 Y/n

```
Overwrite .gitignore? n
Overwrite ios/imoocApp/Base.lproj/LaunchScreen.xib? n
Overwrite ios/imoocApp/Images.xcassets/AppIcon.appiconset
/Contents.json n
Overwrite ios/imoocApp/Info.plist? n
Overwrite ios/imoocApp.xcodeproj/project.pbxproj? n
Overwrite android/settings.gradle? Y
Overwrite android/app/build.gradle? Y
Overwrite android/app/src/main/java/com/imoocapp/MainActi
vity.java? Y
```

4. 链接依赖

```
rnpm link
```

之后，手动添加 ART：

- xcode 中打开项目
- 右键 **Libraries**，添加 `ART.xcodeproj` (位置： `node_modules/react-native/Libraries/ART`)
- 切换到 **Build Phases** 下的 **Link Binary With Libraries**，点击 **+** 添加二进制文件 `libART.a`

5. 修复报警

xcode 打开项目，command+b 编译，会报错：

- RCTWebSocket
  - Semantic Issue Group
    - Ignoring return value of function declared with 'warn_unused_result' attribute
    - Ignoring return value of function declared with 'warn_unused_result' attribute

点击 RCTWebSocket，配置面板切换到 Build Settings，下面找到 

- Apple LLVM 8.1 - Custom Compiler Flags
  - other Warning Flags

双击右侧： -Werror-Wall

弹窗内:

- 选中 -Werror 点击减号 -
- 选中 -Wall 点击减号 -

然后重新 command+b 编译，会看到第二个报警：

- React Group
 - Semantic Issue Group
  - Use of undeclared identifier '_refreshControl'; did you mean 'refreshControl'?
  - Unknown receiver '_refreshControl'; did you mean 'UIRefreshControl'?

选中 `Use of undeclared...` 这行（带有 _refreshControl 的报警行都可以），右侧代码中，找到：

```
- (void)setRefreshControl:(RCTRefreshControl *)refreshControl
{
  if (_refreshControl) {
    [_refreshControl removeFromSuperview];
  }
  _refreshControl = refreshControl;
  [self addSubview:_refreshControl];
}
```

把 _refreshControl 全部改为 refreshControl 保存，再次 command+b 编译

这里 十有八九 还会有报错，如果还有报错，那么可以放弃测试这个版本了，太浪费青春了，用高版本吧。

6. 启动项目

``
sudo mongod
cd imoocServer && node app
cd imoocApp && react-native run-ios
```