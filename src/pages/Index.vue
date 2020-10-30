/* eslint-disable camelcase */ /* eslint-disable camelcase */ /* eslint-disable
eqeqeq */
<template>
  <div class="q-pa-md">
    <div
      class="row q-gutter-xl  text-bold items-center content-center justify-center text-center  text-grey-9 "
    >
      <div>
        <q-btn
          @click="loadDashBoard"
          size="xl"
          round
          color="orange"
          icon="domain"
        /><br />
        Dashboard
      </div>
      <div>
        <q-btn
          @click="loadAdmin"
          size="xl"
          round
          color="blue"
          icon="admin_panel_settings"
        /><br />
        Admin
      </div>
      <div class="items-center content-center">
        <q-btn
          to="/config"
          size="xl"
          round
          color="green"
          icon="settings"
        /><br />
        Configurations
      </div>
      <!--
      <div>
        <q-btn to="/camera" size="xl" round color="red" icon="videocam" />
        <br />Camera
      </div>
      -->
      <div>
        <q-btn to="/device" size="xl" round color="lime-14" icon="router" />
        <br />Device
      </div>
      <div>
        <q-btn
          @click="sendTestLocation()"
          size="xl"
          round
          color="amber-4"
          icon="location_on"
        />
        <br />Test Location
      </div>
      <div>
        <q-btn to="/help" size="xl" round color="purple" icon="help" />
        <br />About
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import location from "../location";

var sendUrl = "";
var nrAdmin = "";

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {}

export default {
  data() {
    return {
      allow_alert: true,
      location
    };
  },
  mounted() {
    var dashboard_url = this.$q.localStorage.getItem("dashboard_url");
    console.log("dashboard_url:" + dashboard_url);

    if (dashboard_url === null) {
      this.$router.push("/config");
    } else {
      // If config saved
      // Load dashboard
      // this.loadDashBoard()
    }
  }, // end mount
  methods: {
    sendTestLocation() {
      this.allow_alert = true;
      navigator.geolocation.getCurrentPosition(
        this.sendLocation,
        this.errorLocation
      );
    },
    loadAdmin: function() {
      nrAdmin = cordova.InAppBrowser.open(
        this.$q.localStorage.getItem("admin_url"),
        "_blank",
        "location=no,hidenavigationbuttons=yes,zoom=no,enableViewportScale=no,clearcache=yes"
      );

      var MylocalStorage = this.$q.localStorage;

      nrAdmin.addEventListener("loadstop", function() {
        var admin_user = MylocalStorage.getItem("admin_user");
        var admin_password = MylocalStorage.getItem("admin_password");
        var admin_url = MylocalStorage.getItem("admin_url");
        var dashboard_url = MylocalStorage.getItem("dashboard_url");
        var dashboard_username = MylocalStorage.getItem("dashboard_user");
        var dashboard_password = MylocalStorage.getItem("dashboard_password");

        var location_url = MylocalStorage.getItem("location_url");
        var call_url = "";
        if (location_url !== "") {
          call_url = location_url;
        } else {
          call_url = admin_url + "/location";
        }

        nrAdmin.executeScript(
          {
            file: MylocalStorage.getItem("js_admin")
          },
          function() {
            nrAdmin.executeScript({
              code: `loginAdmin('${admin_user}','${admin_password}','${admin_url}','${dashboard_url}','${dashboard_username}','${dashboard_password}','${call_url}')`
            });
          }
        );
      });
      var sendLocation = this.sendLocation;
      var errorLocation = this.errorLocation;
      nrAdmin.addEventListener("message", function(data) {
        if (data.data.home == "home") {
          nrAdmin.close();
        }
        if (data.data.location == "location") {
          console.log("home");
          this.allow_alert = true;
          navigator.geolocation.getCurrentPosition(sendLocation, errorLocation);
        }
      });
    },

    sendLocation: function(position) {
      console.log(position);
      var formData = [];
      formData.lat = position.coords.latitude;
      formData.lon = position.coords.longitude;
      formData.allow_alert = this.allow_alert;
      location.sendLocation(formData);
    },
    errorLocation: function() {
      if (this.allow_alert === true) {
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

    loadDashBoard: function() {
      var url = this.$q.localStorage.getItem("dashboard_url");
      var username = this.$q.localStorage.getItem("dashboard_user");
      var password = this.$q.localStorage.getItem("dashboard_password");
      var nrdashUrl =
        this.$q.localStorage.getItem("dashboard_url") +
        "/?username=" +
        this.$q.localStorage.getItem("dashboard_user") +
        "&token=" +
        this.$q.localStorage.getItem("dashboard_password");
      console.log(nrdashUrl);
      var nrdash = cordova.InAppBrowser.open(
        nrdashUrl,
        "_blank",
        "location=no,hidenavigationbuttons=yes,zoom=no,enableViewportScale=no"
      );
      this.mydash = nrdash;
      var localStorage = this.$q.localStorage;
      nrdash.addEventListener("loadstop", function() {
        nrdash.executeScript(
          {
            file: localStorage.getItem("js_dashboard")
          },
          function() {
            nrdash.executeScript({
              code: `login('${url}','${username}','${password}')`
            });
          }
        );
      });

      nrdash.addEventListener("message", function(data) {
        if (data.data.home == "home") {
          nrdash.close();
          localStorage.set("nrdash", nrdash);
        }
      });
    },

    showDashBoard: function() {
      var nrdash = this.$q.localStorage.getItem("nrdash");
      // console.log(nrdash);
      if (nrdash !== "undefined") {
        // if (typeof this.mydash !== 'undefined') {
        this.mydash.show();
      } else {
        this.loadDashBoard();
      }
    }
  }, // end method
  name: "PageIndex"
};
</script>
