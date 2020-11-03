// src/auth.js
import axios from 'axios'

import {
  LocalStorage
} from 'quasar'

export default {

  configLocation() {
    var location_url = LocalStorage.getItem('location_url')
    var admin_url = LocalStorage.getItem('admin_url')
    var location_security = LocalStorage.getItem('location_security')
    var username = LocalStorage.getItem('dashboard_user')
    var password = LocalStorage.getItem('dashboard_password')
    var call_url = null
    var authorization = null

    if (location_url !== '') {
      call_url = location_url
    } else {
      call_url = admin_url + '/location'
    }
    var authorization = 'Basic ' + window.btoa(username + ':' + password)

    console.log(`${call_url}. ${authorization}. `)

    BackgroundGeolocation.configure({
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      stopOnTerminate: false,
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
        lon: '@longitude'
      // foo: "bar" // you can also add your own properties
      }
    })
  },
  trackLocation () {
  // alert(1111);
  
    var location_url = LocalStorage.getItem('location_url')
    var admin_url = LocalStorage.getItem('admin_url')
    var location_security = LocalStorage.getItem('location_security')
    var username = LocalStorage.getItem('dashboard_user')
    var password = LocalStorage.getItem('dashboard_password')
    var call_url = null
    var authorization = null

    if (location_url !== '') {
      call_url = location_url
    } else {
      call_url = admin_url + '/location'
    }
    var authorization = 'Basic ' + window.btoa(username + ':' + password)

    console.log(`${call_url}. ${authorization}. `)

    BackgroundGeolocation.configure({
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      stopOnTerminate: false,
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
        lon: '@longitude'
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
  }

}
