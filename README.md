# Node-RED Client Editor

A mobile app client for Node-RED

## User manual

Please visit [User Manual](https://linhtranvu.github.io/node-red/)

## Developement

App is written in Quasar Framework (Vue.js and Cordova). Please visit [Quasar Homepage](https://quasar.dev /)  for more information about development

### Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc. directly on mobile)
```bash
quasar dev -m android
quasar dev -m ios
```

### Lint the files
```bash
npm run lint
```

### Build the app for production

Run below command, open Android Studio or XCode and build yourself. Rememeber to change package name 

```bash
quasar build -m android --ide
quasar build -m ios --ide
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
