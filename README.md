# gougouApp

升级到 RN 0.36.0

1. 锁定版本

- `nvm use v6.10.0 && nvm alias default v6.10.0`
- `npm i react-native-cli@1.0.0 -g`

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

4. 升级倒计时

修改 node_modules/react-native-sk-countdown/CountDownText.js

```
import React,{Component} from 'react'

import {
  StyleSheet,
  Text,
} from 'react-native';

var update = require('react-addons-update')
var countDown = require('./countDown')
```

5. 链接依赖

```
rnpm link
```

之后，手动添加 ART：

- xcode 中打开项目
- 右键 **Libraries**，添加 `ART.xcodeproj` (位置： `node_modules/react-native/Libraries/ART`)
- 切换到 **Build Phases** 下的 **Link Binary With Libraries**，点击 **+** 添加二进制文件 `libART.a`

6. 启动项目

``
sudo mongod
cd imoocServer && node app
cd imoocApp && react-native run-ios
```