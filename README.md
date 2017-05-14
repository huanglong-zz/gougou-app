1. Modal not showing in rn 42~43

https://github.com/facebook/react-native/issues/12515

upgrade to v42.3

2. video still fire onProgress

change 188 line in react-native-video/ios/RCTVideo.m

```
if( currentTimeSecs >= 0 && self.onVideoProgress) {
```

to

```
if( currentTimeSecs >= 0 && self.onVideoProgress && currentTimeSecs <= duration) {
```

3. 'RCTBridgeModule.h' file not found

https://github.com/weflex/react-native-wechat/issues/33

4. A problem occurred configuring project ':app'. SDK location not found

http://stackoverflow.com/questions/32634352/react-native-android-build-failed-sdk-location-not-found

5. TypeError: Network request failed

adb reverse tcp:3001 tcp:3001

6. RN debugger Notes

https://github.com/crazycodeboy/RNStudyNotes