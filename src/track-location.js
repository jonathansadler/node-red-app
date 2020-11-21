// src/auth.js
import axios from 'axios'

import {
  LocalStorage
} from 'quasar'

export default {

  trackLocation () {

    var location_url = LocalStorage.getItem('location_url')
    var admin_url = LocalStorage.getItem('admin_url')
    var location_security = LocalStorage.getItem('location_security')
    var username = LocalStorage.getItem('dashboard_user')
    var password = LocalStorage.getItem('dashboard_password')
    var call_url = null
    var authorization = null
    //Setting for Location

    if (location_url !== '') {
      call_url = location_url
    } else {
      call_url = admin_url + '/location'
    }
    var authorization = 'Basic ' + window.btoa(username + ':' + password)

    console.log(`${call_url}. ${authorization}. `)

    BackgroundGeolocation.configure({
      locationProvider: LocalStorage.getItem('locationProvider'),
      desiredAccuracy: LocalStorage.getItem('desiredAccuracy'),
      stationaryRadius: LocalStorage.getItem('stationaryRadius'),
      distanceFilter: LocalStorage.getItem('distanceFilter'),
      notificationTitle: 'Node_RED Background tracking',
      notificationText: 'Enabled',
      debug: false, //MUST BE FALSE ON OFFICICAL BUILD, OR ERROR ON SECOND RUN
      stopOnTerminate: LocalStorage.getItem('stopOnTerminate'),
      startOnBoot: LocalStorage.getItem('startOnBoot'),
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      url: call_url,
      httpHeaders: {
        Authorization: authorization // window.btoa('YOUR_USERNAME:YOUR_PASSWORD')
      },
      // customize post properties
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
        time: this.convertTimeStamp(),
        timeStamp: '@time',
        name: LocalStorage.getItem('deviceName'),
        icon: LocalStorage.getItem('locationIcon'),
        iconColor: LocalStorage.getItem('locationIconColor'),
        lineColor: LocalStorage.getItem('locationIconColor'),
      // foo: "bar" // you can also add your own properties
      }
    })


    BackgroundGeolocation.on('location', function (location) {
      console.log(location)
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      BackgroundGeolocation.startTask(function (taskKey) {
      // execute long running task
      // eg. ajax post location
      // IMPORTANT: task has to be ended by endTask
        BackgroundGeolocation.endTask(taskKey)
      })
    })

    BackgroundGeolocation.on('stationary', function (stationaryLocation) {
    // handle stationary locations here
    })

    BackgroundGeolocation.on('error', function (error) {
      console.log(
        '[ERROR] BackgroundGeolocation error:',
        error.code,
        error.message
      )
    })

    BackgroundGeolocation.on('start', function () {
      console.log('[INFO] BackgroundGeolocation service has been started')
    })

    BackgroundGeolocation.on('stop', function () {
      console.log('[INFO] BackgroundGeolocation service has been stopped')
    })

    BackgroundGeolocation.on('authorization', function (status) {
      console.log('[INFO] BackgroundGeolocation authorization status: ' + status)
      if (status !== BackgroundGeolocation.AUTHORIZED) {
      // we need to set delay or otherwise alert may not be shown
        setTimeout(function () {
          var showSettings = confirm(
            'App requires location tracking permission. Would you like to open app settings?'
          )
          if (showSettings) {
            return BackgroundGeolocation.showAppSettings()
          }
        }, 1000)
      }
    })

    BackgroundGeolocation.on('background', function () {
      console.log('[INFO] App is in background')
      // you can also reconfigure service (changes will be applied immediately)
      BackgroundGeolocation.configure({ debug: true })
    })

    BackgroundGeolocation.on('foreground', function () {
      console.log('[INFO] App is in foreground')
      BackgroundGeolocation.configure({ debug: false })
    })

    BackgroundGeolocation.on('abort_requested', function () {
      console.log('[INFO] Server responded with 285 Updates Not Required')

    // Here we can decide whether we want stop the updates or not.
    // If you've configured the server to return 285, then it means the server does not require further update.
    // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
    // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    })

    BackgroundGeolocation.on('http_authorization', () => {
      console.log('[INFO] App needs to authorize the http requests')
    })

    BackgroundGeolocation.checkStatus(function (status) {
      console.log(
        '[INFO] BackgroundGeolocation service is running',
        status.isRunning
      )
      console.log(
        '[INFO] BackgroundGeolocation services enabled',
        status.locationServicesEnabled
      )
      console.log(
        '[INFO] BackgroundGeolocation auth status: ' + status.authorization
      )

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        BackgroundGeolocation.start() // triggers start on start event
      }
    })

    // you can also just start without checking for status
    // BackgroundGeolocation.start();

  // Don't forget to remove listeners at some point!
  // BackgroundGeolocation.removeAllListeners();
  },

  convertTimeStamp() {

    var date = new Date();
    var timestamp = date.getTime();    
    // convert unix timestamp to milliseconds
    var ts_ms = timestamp * 1000;

    // initialize new Date object
    var date_ob = new Date(ts_ms);

    // year as 4 digits (YYYY)
    var year = date_ob.getFullYear();

    // month as 2 digits (MM)
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // date as 2 digits (DD)
    var date = ("0" + date_ob.getDate()).slice(-2);

    // hours as 2 digits (hh)
    var hours = ("0" + date_ob.getHours()).slice(-2);

    // minutes as 2 digits (mm)
    var minutes = ("0" + date_ob.getMinutes()).slice(-2);

    // seconds as 2 digits (ss)
    var seconds = ("0" + date_ob.getSeconds()).slice(-2);

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`

  }

}
