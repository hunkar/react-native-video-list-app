# react-native-video-list-app

You can see live expo demo from [this link](https://expo.dev/@hunkar/xite-expo-app)

Install npm packages with **--legacy-peer-deps** for dependency issues.
```bash
npm install --legacy-peer-deps
```
# Start Metro Server
You can run metro server with following command.

```bash
yarn start
```

# Build For Android
You need to create local.properties file under android directory. Add following line with your SDK path.
```
sdk.dir=C\:\\Users\\User\\AppData\\Local\\Android\\Sdk
```
>**Be careful**: If you have trouble with **Java Home**, please check **org.gradle.java.home** value in **./android/gradle.properties** file

Run this command line at project directory for create bundle to Android 
```bash
yarn bundle:android
```

Run this command line at project directory for create build debug apk to Android 
```bash
yarn build:android
```

Run this command line at project directory for installing apk to Android device 
```bash
yarn install:android
```

## Test

You can run test with following command.

```bash
yarn test
```


## License
[MIT](https://choosealicense.com/licenses/mit/)