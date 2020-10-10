<template>
  <div class="q-pa-md">
    <div
      class="row q-gutter-xl  text-bold items-center content-center justify-center text-center  text-grey-9 "
    >
      <div>
        <q-btn
          @click="showDashBoard"
          size="xl"
          round
          color="orange"
          icon="domain"
        /><br />
        Dashboard
      </div>
      <div>
        <q-btn
          @click="showAdmin"
          size="xl"
          round
          color="blue"
          icon="admin_panel_settings"
        /><br />
        Dashboard
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
      <div>
        <q-btn to="/camera" size="xl" round color="red" icon="person" />
        <br />Camera
      </div>
      <div>
        <q-btn to="/help" size="xl" round color="purple" icon="help" />
        <br />About
      </div>
    </div>
  </div>
</template>

<script>
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  // Cordova is now initialized. Have fun!
  // console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
  // var nrdash = cordova.InAppBrowser.open("http://192.168.1.100:1880/ui/?username=user&token=123456", '_blank', 'location=no,hidenavigationbuttons=yes,zoom=no,enableViewportScale=no');
  // nrdash.addEventListener('loadstop', function() {
  //   nrdash.executeScript({file: "http://192.168.1.100/node-red/myscript.js"});
  // });
  // nrdash.addEventListener('message', function(data) {
  //   console.log(data)
  //   if(data.data.home == "home"){
  //     nrdash.hide();
  //   }
  // });
}

export default {
  mounted() {
    var dashboard_url = this.$q.localStorage.getItem("dashboard_url");
    console.log("dashboard_url:" + dashboard_url);

    if (dashboard_url === null) {
      this.$router.push("/config");
    } else {
      this.loadDashBoard();
    }

    // if (typeof dashboard_url !== "undefined") {
    //   console.log(this.mydash);
    //   if (typeof this.mydash !== "undefined") {
    //   } else {
    //     this.loadDashBoard();
    //   }
    // } else {
    //   this.$router.push("/config");
    // }
  }, //end mount
  methods: {
    showAdmin: function() {},
    loadDashBoard: function() {
      var nrdashUrl =
        this.$q.localStorage.getItem("dashboard_url") +
        "/?user=" +
        this.$q.localStorage.getItem("dashboard_user") +
        "&token=" +
        this.$q.localStorage.getItem("dashboard_password");
      var nrdash = cordova.InAppBrowser.open(
        nrdashUrl,
        "_blank",
        "location=no,hidenavigationbuttons=yes,zoom=no,enableViewportScale=no"
      );
      this.mydash = nrdash;
      nrdash.addEventListener("loadstop", function() {
        nrdash.executeScript({
          file: this.$q.localStorage.getItem("js_url")
        });
      });
      var localStorage = this.$q.localStorage;

      nrdash.addEventListener("message", function(data) {
        if (data.data.home == "home") {
          nrdash.hide();
          localStorage.set("nrdash", nrdash);
        }
      });
    },

    showDashBoard: function() {
      nrdash = this.$q.sessionStorage.getItem("nrdash");
      console.log(nrdash);
      if (nrdash !== "undefined") {
        // if (typeof this.mydash !== 'undefined') {
        this.mydash.show();
      } else {
        this.loadDashBoard();
      }
    }
  }, //end method
  name: "PageIndex"
};
</script>
