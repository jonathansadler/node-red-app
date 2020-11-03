// src/auth.js
import axios from 'axios'

import {
  LocalStorage
} from 'quasar'

export default {

function trackLocation() {
  // 1.  Listen to events
  var bgGeo = window.BackgroundGeolocation;

  bgGeo.onLocation(function(location) {
    console.log('[location] -', location);
  });

  bgGeo.onMotionChange(function(event) {
    console.log('[motionchange] -', event.isMoving, event.location);
  });

  bgGeo.onHttp(function(response) {
    console.log('[http] - ', response.success, response.status, response.responseText);
  });

  bgGeo.onProviderChange(function(event) {
    console.log('[providerchange] -', event.status, event.enabled, event.gps, event.network);
  });

  // 2. Execute #ready method:
  bgGeo.ready({
    reset: true,
    debug: true,
    logLevel: bgGeo.LOG_LEVEL_VERBOSE,
    desiredAccuracy: bgGeo.DESIRED_ACCURACY_HIGH,
    distanceFilter: 10,
    url: 'http://192.168.1.100:1880/location',
    autoSync: true,
    stopOnTerminate: false,
    startOnBoot: true
  }, function(state) {    // <-- Current state provided to #configure callback
    // 3.  Start tracking
    console.log('BackgroundGeolocation is configured and ready to use');
    if (!state.enabled) {
      bgGeo.start().then(function() {
        console.log('- BackgroundGeolocation tracking started');
      });
    }
  });

  // NOTE:  Do NOT execute any API methods which will access location-services
  // until the callback to #ready executes!
  //
  // For example, DO NOT do this here:
  //
  // bgGeo.getCurrentPosition();   // <-- NO!
  // bgGeo.start();                // <-- NO!
}

}
