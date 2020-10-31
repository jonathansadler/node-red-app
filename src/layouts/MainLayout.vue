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

jsonp("http://192.168.1.100/linhtranvu.github.io/node-red/version.js", function(
  data
) {
  alert(data);
});

import location from "../location";
import axios from "axios";
export default {
  methods: {
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
    },
    watchLocation() {
      var watchID = navigator.geolocation.watchPosition(
        this.sendLocation,
        this.errorLocation,
        {
          timeout: this.$q.localStorage.getItem("timeout"),
          maximumAge: this.$q.localStorage.getItem("maxage")
        }
      );
    }
  },
  created() {
    // Watch Location''
    if (
      this.$q.localStorage.getItem("admin_url") !== null &&
      this.$q.localStorage.getItem("tracking_status") == true
    ) {
      window.addEventListener("deviceready", this.watchLocation, false);
      // this.watchLocation() //enable to debug
    }
  },
  mounted() {
    // Check version
    var Notify = this.$q.notify;
    var script_storage_version = this.$q.localStorage.getItem("script_version");
    var myStorage = this.$q.localStorage;
    var checkExist = setInterval(function() {
      if (typeof newest_version !== "undefined") {
        clearInterval(checkExist);
        //Check app version
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
        }); //end check app version

        //Check script version
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
      allow_alert: false, // True to turn on alert Debug with location Watch
      location
    };
  }
};
</script>
