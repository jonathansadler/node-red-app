/* eslint-disable vue/valid-template-root */
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/node-red-hexagon.png" />
          </q-avatar>
          <q-btn flat to="/">Node-RED App</q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script>
import location from "../location";
import axios from "axios";
import { LocalStorage } from "quasar";

function jsonp(url, callback) {
  var callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());
  window[callbackName] = function(data) {
    delete window[callbackName];
    document.body.removeChild(script);
    callback(data);
  };

  var script = document.createElement("script");
  script.src =
    url + (url.indexOf("?") >= 0 ? "&" : "?") + "callback=" + callbackName;
  document.body.appendChild(script);
}

jsonp("https://linhtranvu.github.io/node-red/version.js", function(data) {
  alert(data);
});

//BACKGROUND GEOLOCATION

// var myBackGroundSendLocation = null;
// var myBackGroundErrorLocation = null;
// var myTest = null;

function onDeviceReady() {
  alert(1111);
  // myTest();
  BackgroundGeolocation.configure({
    locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
    desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    stationaryRadius: 50,
    distanceFilter: 50,
    notificationTitle: "Background tracking",
    notificationText: "enabled",
    debug: true,
    interval: 10000,
    fastestInterval: 5000,
    activitiesInterval: 10000,
    url: "http://linhtranvu.mooo.com:1880/location",
    httpHeaders: {
      "X-FOO": "bar",
      Authorization: "Basic dXNlcjpnYXVtaWFuZ3U=" // window.btoa('YOUR_USERNAME:YOUR_PASSWORD')
    },
    // customize post properties
    postTemplate: {
      lat: "@latitude",
      lon: "@longitude",
      foo: "bar" // you can also add your own properties
    }
  });

  BackgroundGeolocation.on("location", function(location) {
    // handle your locations here
    // to perform long running operation on iOS
    // you need to create background task
    BackgroundGeolocation.startTask(function(taskKey) {
      // execute long running task
      // eg. ajax post location
      // IMPORTANT: task has to be ended by endTask
      BackgroundGeolocation.endTask(taskKey);
    });
  });

  BackgroundGeolocation.on("stationary", function(stationaryLocation) {
    // handle stationary locations here
  });

  BackgroundGeolocation.on("error", function(error) {
    console.log(
      "[ERROR] BackgroundGeolocation error:",
      error.code,
      error.message
    );
  });

  BackgroundGeolocation.on("start", function() {
    console.log("[INFO] BackgroundGeolocation service has been started");
  });

  BackgroundGeolocation.on("stop", function() {
    console.log("[INFO] BackgroundGeolocation service has been stopped");
  });

  BackgroundGeolocation.on("authorization", function(status) {
    console.log("[INFO] BackgroundGeolocation authorization status: " + status);
    if (status !== BackgroundGeolocation.AUTHORIZED) {
      // we need to set delay or otherwise alert may not be shown
      setTimeout(function() {
        var showSettings = confirm(
          "App requires location tracking permission. Would you like to open app settings?"
        );
        if (showSettings) {
          return BackgroundGeolocation.showAppSettings();
        }
      }, 1000);
    }
  });

  BackgroundGeolocation.on("background", function() {
    console.log("[INFO] App is in background");
    // you can also reconfigure service (changes will be applied immediately)
    BackgroundGeolocation.configure({ debug: true });
  });

  BackgroundGeolocation.on("foreground", function() {
    console.log("[INFO] App is in foreground");
    BackgroundGeolocation.configure({ debug: false });
  });

  BackgroundGeolocation.on("abort_requested", function() {
    console.log("[INFO] Server responded with 285 Updates Not Required");

    // Here we can decide whether we want stop the updates or not.
    // If you've configured the server to return 285, then it means the server does not require further update.
    // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
    // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
  });

  BackgroundGeolocation.on("http_authorization", () => {
    console.log("[INFO] App needs to authorize the http requests");
  });

  BackgroundGeolocation.checkStatus(function(status) {
    console.log(
      "[INFO] BackgroundGeolocation service is running",
      status.isRunning
    );
    console.log(
      "[INFO] BackgroundGeolocation services enabled",
      status.locationServicesEnabled
    );
    console.log(
      "[INFO] BackgroundGeolocation auth status: " + status.authorization
    );

    // you don't need to check status before start (this is just the example)
    if (!status.isRunning) {
      BackgroundGeolocation.start(); //triggers start on start event
    }
  });

  // you can also just start without checking for status
  // BackgroundGeolocation.start();

  // Don't forget to remove listeners at some point!
  // BackgroundGeolocation.removeAllListeners();
}

document.addEventListener("deviceready", onDeviceReady, false);

//END BACKGROUND GEOLOCATION

export default {
  methods: {
    test() {
      alert(11111);
    },
    sendLocation(position) {
      // alert(
      //   "Latitude: " +
      //     position.coords.latitude +
      //     "\n" +
      //     "Longitude: " +
      //     position.coords.longitude +
      //     "\n" +
      //     "Altitude: " +
      //     position.coords.altitude +
      //     "\n" +
      //     "Accuracy: " +
      //     position.coords.accuracy +
      //     "\n" +
      //     "Altitude Accuracy: " +
      //     position.coords.altitudeAccuracy +
      //     "\n" +
      //     "Heading: " +
      //     position.coords.heading +
      //     "\n" +
      //     "Speed: " +
      //     position.coords.speed +
      //     "\n" +
      //     "Timestamp: " +
      //     position.timestamp +
      //     "\n"
      // );
      var formData = [];
      formData.lat = position.coords.latitude;
      formData.lon = position.coords.longitude;
      formData.allow_alert = this.allow_alert;
      // formData.nrAdmin = null;
      location.sendLocation(formData);
    },
    errorLocation(error) {
      console.log(error);
      if (this.alert === true) {
        alert(
          "Error code: " +
            error.code +
            "\n" +
            "Message: " +
            error.message +
            "\n"
        );
      }
    }
    // watchLocation() {
    //   alert("device ready");
    //   var watchID = navigator.geolocation.watchPosition(
    //     this.sendLocation,
    //     this.errorLocation,
    //     {
    //       timeout: this.$q.localStorage.getItem("timeout"),
    //       maximumAge: this.$q.localStorage.getItem("maxage")
    //     }
    //   );
    // }
  },
  created() {
    // myBackGroundSendLocation = this.sendLocation;
    // myBackGroundErrorLocation = this.errorLocation;
    // myTest = this.test();
  },
  mounted() {
    // Watch Location''
    if (
      this.$q.localStorage.getItem("admin_url") !== null &&
      this.$q.localStorage.getItem("tracking_status") == true
    ) {
      var mySendLocation = this.sendLocation;
      var myErrorLocation = this.errorLocation;
      var myTimeout = this.$q.localStorage.getItem("timeout");
      var myMaxage = this.$q.localStorage.getItem("maxage");
      setTimeout(function() {
        // alert("device ready watch");
        var watchID = navigator.geolocation.watchPosition(
          mySendLocation,
          myErrorLocation,
          {
            timeout: myTimeout,
            maximumAge: myMaxage
          }
        );
      }, 10000);
      // window.addEventListener("deviceready", this.watchLocation, false);
      // this.watchLocation() //enable to debug
    }

    // Check version
    var Notify = this.$q.notify;
    var script_storage_version = this.$q.localStorage.getItem("script_version");
    var myStorage = this.$q.localStorage;
    var checkExist = setInterval(function() {
      if (typeof newest_version !== "undefined") {
        clearInterval(checkExist);
        // Check app version
        cordova.getAppVersion.getVersionNumber().then(function(version) {
          if (newest_version !== version) {
            Notify({
              message:
                "New version found, please update to use new features! " +
                newest_info,
              color: "orange",
              multiLine: true,
              timeout: 10000,
              avatar: "https://cdn.quasar.dev/img/boy-avatar.png"
            });
          }
        }); // end check app version

        // Check script version
        if (typeof script_storage_version !== "undefined") {
          if (script_storage_version !== script_version) {
            Notify({
              message: "New script version updated. " + script_info,
              color: "orange",
              multiLine: true,
              timeout: 10000,
              position: "top",
              avatar: "https://cdn.quasar.dev/img/boy-avatar.png"
            });
            myStorage.set("script_version", script_version);
          }
        } else {
          myStorage.set("script_version", script_version);
        }
      }
    }, 2000); // check every 500ms
  },
  data() {
    return {
      allow_alert: "false", // app to turn on alert Debug with location Watch
      location
    };
  }
};
</script>
