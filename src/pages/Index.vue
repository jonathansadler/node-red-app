/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
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
        <q-btn to="/camera" size="xl" round color="red" icon="videocam" />
        <br />Camera
      </div>
      <div>
        <q-btn to="/device" size="xl" round color="lime-14" icon="router" />
        <br />Device
      </div>
      <div>
        <q-btn to="/help" size="xl" round color="purple" icon="help" />
        <br />About
      </div>
      <!-- <div>
        <q-btn @click="sendLocation(1111)" size="xl" round color="purple" icon="location" />
        <br />Send Location
      </div> -->
    </div>
  </div>
</template>
<script>
import axios from 'axios'

var sendUrl = ''
var nrAdmin = ''

document.addEventListener('deviceready', onDeviceReady, false)
function onDeviceReady () {

}

export default {
  mounted () {
    var dashboard_url = this.$q.localStorage.getItem('dashboard_url')
    console.log('dashboard_url:' + dashboard_url)

    if (dashboard_url === null) {
      this.$router.push('/config')
    } else { // If config saved
      // Send Location data
      navigator.geolocation.getCurrentPosition(this.sendLocation, this.errorLocation)
      var watchID = navigator.geolocation.watchPosition(
        this.sendLocation,
        this.errorLocation,
        { timeout: 30000, maximumAge: 20000 }
      )

      this.loadDashBoard()
    }
    console.log(navigator.geolocation)
  }, // end mount
  methods: {
    loadAdmin: function () {
      nrAdmin = cordova.InAppBrowser.open(
        this.$q.localStorage.getItem('admin_url'),
        '_blank',
        'location=no,hidenavigationbuttons=yes,zoom=no,enableViewportScale=no'
      )

      var MylocalStorage = this.$q.localStorage

      nrAdmin.addEventListener('loadstop', function () {
        var admin_user = MylocalStorage.getItem('admin_user') // LOOIX O DAY DEO BIET TAI SAO
        var admin_password = MylocalStorage.getItem('admin_password')
        var admin_url = MylocalStorage.getItem('admin_url')
        var params_dashboard = {
          url: MylocalStorage.getItem('dashboard_url'),
          username: MylocalStorage.getItem('dashboard_user'),
          password: MylocalStorage.getItem('dashboard_password')
        }

        nrAdmin.executeScript(
          {
            file: MylocalStorage.getItem('js_url')
          },
          function () {
            console.log(admin_url)

            // var params_dashboard = {

            // };
            // console.log(params_dashboard);
            nrAdmin.executeScript({
              code: `loginAdmin('${admin_user}','${admin_password}','${admin_url}','${params_dashboard}')`
            })
          }
        )
      })
      var sendLocation = this.sendLocation
      var errorLocation = this.errorLocation
      nrAdmin.addEventListener('message', function (data) {
        if (data.data.home == 'home') {
          nrAdmin.close()
        }
        if (data.data.location == 'location') {
          console.log('home')
          navigator.geolocation.getCurrentPosition(sendLocation, errorLocation)
        }
      })
    },

    loadDashBoard: function () {
      var nrdashUrl =
        this.$q.localStorage.getItem('dashboard_url') +
        '/?username=' +
        this.$q.localStorage.getItem('dashboard_user') +
        '&token=' +
        this.$q.localStorage.getItem('dashboard_password')
      console.log(nrdashUrl)
      var nrdash = cordova.InAppBrowser.open(
        nrdashUrl,
        '_blank',
        'location=no,hidenavigationbuttons=yes,zoom=no,enableViewportScale=no'
      )
      this.mydash = nrdash
      var localStorage = this.$q.localStorage
      nrdash.addEventListener('loadstop', function () {
        nrdash.executeScript({
          file: localStorage.getItem('js_url')
        })
      })

      nrdash.addEventListener('message', function (data) {
        if (data.data.home == 'home') {
          nrdash.close()
          localStorage.set('nrdash', nrdash)
        }
      })
    },

    showDashBoard: function () {
      var nrdash = this.$q.localStorage.getItem('nrdash')
      // console.log(nrdash);
      if (nrdash !== 'undefined') {
        // if (typeof this.mydash !== 'undefined') {
        this.mydash.show()
      } else {
        this.loadDashBoard()
      }
    },

    sendLocation: function (position) {
      // console.log(nrAdmin)
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

      var sendLocationUrl = `${this.$q.localStorage.getItem('admin_url')}/location?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
      // alert(`Call URL: ${sendLocationUrl}. If dont receive data in Debug, enter URL in browser to test`)
      axios
        .get(
      `${sendLocationUrl}`
      // `${sendLocationUrl}?lat=1&lon=2`
        )
        .then(response => {})
        .catch(() => {
          alert(`Call URL Fail: ${sendLocationUrl}. Enter URL in browser to test`)
        })
    },

    // onError Callback receives a PositionError object
    //
    errorLocation: function (error) {
      console.log(error)
      alert('Error code: ' + error.code + '\n' + 'Message: ' + error.message + '\n')
    }

  }, // end method
  name: 'PageIndex'
}
</script>
