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
  }, //end mount
  methods: {
    loadAdmin: function() {
      var nrAdmin = cordova.InAppBrowser.open(
        this.$q.localStorage.getItem("admin_url"),
        "_blank",
        "location=no,hidenavigationbuttons=yes,zoom=no,enableViewportScale=no"
      );
      var localStorage = this.$q.localStorage;
      // console.log(localStorage);
      nrAdmin.addEventListener("loadstop", function() {
        nrAdmin.executeScript({
          code:
            'jQuery("html").prepend("<h3>PLEASE WAIT 3S FOR AUTOMATICALLY LOGIN TO PROCEED</h3>")'
        });

        nrAdmin.executeScript(
          {
            file: localStorage.getItem("js_url")
          },
          function() {
            var admin_user = localStorage.getItem("admin_user");
            var admin_password = localStorage.getItem("admin_password");
            nrAdmin.executeScript({
              code: "loginAdmin('" + admin_user + "','" + admin_password + "')"
              // code: "loginAdmin('admin','gaumiangu')"
            });
          }
        );
      });
      nrAdmin.addEventListener("message", function(data) {
        if (data.data.home == "home") {
          nrAdmin.close();
        }
      });
    },

    loadDashBoard: function() {
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
        nrdash.executeScript({
          file: localStorage.getItem("js_url")
        });
      });

      nrdash.addEventListener("message", function(data) {
        if (data.data.home == "home") {
          nrdash.close();
          this.$q.localStorage.set("nrdash", nrdash);
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
  }, //end method
  name: "PageIndex"
};
</script>
