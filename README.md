# Node-RED Client Editor

> Node-RED is great and I use for my smart home. However, the lacking  of mobile app is a big disadvantage, and most of people like to use Home Assisstant for its mobile support
>
> I decide to develope a mobile app for Node RED, support automatically login Dashboard and Admin, custom buttons on Admin, native features like background location tracking (finished), voice  command, mqtt client, wysiwyg editor (in dev)...

Now could be downloaded from App store and Google Play

[![play icon](https://linhtranvu.github.io/node-red/images/play icon.jpg)](https://play.google.com/store/apps/details?id=org.nodered.linhtranvu.app)

[![app store icon](https://aws1.discourse-cdn.com/business6/uploads/nodered/original/3X/8/8/885839638289f9d382d213b253161593302a2f75.jpeg)](https://apps.apple.com/us/app/node-red-client-editor/id1539323696)

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

### Build the app for production

Run below command, open Android Studio or XCode and build yourself. Rememeber to change package name 

```bash
quasar build -m android --ide
quasar build -m ios --ide
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
