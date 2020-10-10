# Node-RED app (node-red-app)

A mobile app for node-RED

## Change user authentication to middleware for Dashboard

In `.node-red/settings.js`, comment out `httpNodeAuth` to remove basic authentication

Uncomment `ui`, change  to:

    ui: { 
    	path: "ui",
    	middleware: require("./dashboard-auth.js")
    },
Download [dashboard-auth.js](https://linhtranvu.github.io/node-red/dashboard-auth.js) , put in your `.node-red` folder (so `settings.js` and `dashboard-auth.js` in the same folder). Open file, change username and password to what you want

Credit to [librae8226](https://github.com/node-red/node-red-dashboard/pull/209 ) 

## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
