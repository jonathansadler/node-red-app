/* eslint-disable camelcase */ /* eslint-disable camelcase */ /* eslint-disable
eqeqeq */
<template>
  <div class="q-pa-md">
    <q-card
      class="my-card bg-amber-3"
      v-if="this.$q.localStorage.getItem('tracking_status') === null"
    >
      <q-card-section>
        Location tracking wont start until
        <q-btn size="sm" color="green" href="#" to="/location"
          ><q-icon left name="my_location" />Location setting saved</q-btn
        >
      </q-card-section>
    </q-card>
    <br />
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
          to="/location"
          size="xl"
          round
          color="amber-4"
          icon="location_on"
        />
        <br />Location Setting
      </div>
      <div>
        <q-btn to="/help" size="xl" round color="purple" icon="help" />
        <br />Help
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import location from "../location";
import trackLocation from "../track-location";

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {}

export default {
  data() {
    return {
      myDash: "",
      allow_alert: true,
      location,
      myAdmin: ""
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
    loadAdmin: function() {
      var nrAdmin = cordova.InAppBrowser.open(
        this.$q.localStorage.getItem("admin_url"),
        "_blank",
        "location=no,hidenavigationbuttons=yes,zoom=no,enableViewportScale=no,clearcache=yes"
      );

      this.myAdmin = nrAdmin;

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
          nrAdmin.hide();
        }
        if (data.data.location == "location") {
          console.log("home");
          this.allow_alert = "red";
          navigator.geolocation.getCurrentPosition(sendLocation, errorLocation);
        }
      });
    },

    loadDashBoard: function() {
      var url = this.$q.localStorage.getItem("dashboard_url");
      var username = this.$q.localStorage.getItem("dashboard_user");
      var password = this.$q.localStorage.getItem("dashboard_password");
      // var nrdashUrl =
      //   this.$q.localStorage.getItem("dashboard_url") +
      //   "/?username=" +
      //   this.$q.localStorage.getItem("dashboard_user") +
      //   "&token=" +
      //   this.$q.localStorage.getItem("dashboard_password");
      var nrdash = cordova.InAppBrowser.open(
        url,
        "_blank",
        "location=no,hidenavigationbuttons=yes,zoom=no,enableViewportScale=no"
      );
      this.myDash = nrdash;
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
      if (this.myDash !== "") {
        this.myDash.show();
      } else {
        this.loadDashBoard();
      }
    },

    showAdmin: function() {
      console.log(this.myAdmin);
      if (this.myAdmin !== "") {
        this.myAdmin.show();
      } else {
        this.loadAdmin();
      }
    }
  }, // end method
  name: "PageIndex"
};
</script>
