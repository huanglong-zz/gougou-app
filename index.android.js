import './app'

/**
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


**/
