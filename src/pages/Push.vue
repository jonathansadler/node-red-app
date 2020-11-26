<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-gutter-md">
        <q-form ref="loginForm" id="loginForm">
          <q-card class="my-card bg-amber-3">
            <q-card-section>
              Device Token is used for Node-RED to known which device to send
              notification to. App Admin has feature to quickly create nodes for
              create push from Node-RED
              <!-- <q-btn
                color="blue"
                @click="isHidden = !isHidden"
                label="More Info"
              />
              <div v-if="!isHidden"></div> -->
            </q-card-section>
          </q-card>
          <br />
          <q-input
            ref="fcmToken"
            v-model="fcmToken"
            outlined
            type="textarea"
            label="Device Token"
          >
          </q-input>
          <q-input
            v-model="apnToken"
            outlined
            type="textarea"
            label="APN Token"
          >
          </q-input>
          <q-btn
            color="orange"
            icon="save"
            @click="getApnToken"
            label="Get APN"
          />
          <!-- <div
            class="q-pa-md q-gutter-sm items-center content-center justify-center text-left"
          >
            <q-btn color="green" icon="reply" to="/" label="Back" />
            <q-btn color="orange" icon="save" @click="save" label="Save" />
          </div> -->
        </q-form>
        <iframe
          style="border:none;"
          src="https://linhtranvu.github.io/node-red/push.htm"
          width="100%"
          height="1500px"
        ></iframe>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

function onDeviceReady () {
  FirebasePlugin.onTokenRefresh(
    function (token) {
      console.log('Token refreshed: ' + token)
    },
    function (error) {
      console.log('Failed to refresh token', error)
    }
  )

  checkNotificationPermission(false) // Check permission then get token

  // checkAutoInit()
  // isAnalyticsCollectionEnabled()
  // isPerformanceCollectionEnabled()
  // isCrashlyticsCollectionEnabled()
  // isUserSignedIn()

  // Platform-specific

  // if (cordova.platformId === "android") {
  //   initAndroid();
  // } else if (cordova.platformId === "ios") {
  initIos()
  // }
}

document.addEventListener('deviceready', onDeviceReady, false)

var initIos = function () {
  FirebasePlugin.onApnsTokenReceived(
    function (token) {
      alert('APNS token received: ' + token)
    },
    function (error) {
      alert('Failed to receive APNS token', error)
    }
  )
}

// Notifications
var checkNotificationPermission = function (requested) {
  FirebasePlugin.hasPermission(function (hasPermission) {
    if (hasPermission) {
      console.log('Remote notifications permission granted')
      // Granted
      getToken()
    } else if (!requested) {
      // Request permission
      console.log('Requesting remote notifications permission')
      FirebasePlugin.grantPermission(
        checkNotificationPermission.bind(this, true)
      )
    } else {
      // Denied
      console.log("Notifications won't be shown as permission is denied")
    }
  })
}

// GetToken
var getToken = function () {
  FirebasePlugin.getToken(
    function (token) {
      console.log('Got FCM token: ' + token)
    },
    function (error) {
      console.log('Failed to get FCM token', error)
    }
  )
}

export default {
  mounted () {
    var comp = this
    // this.getToken()
    // this.onApnsTokenReceived()
  },
  methods: {
    getToken () {
      var comp = this
      FirebasePlugin.getToken(
        function (fcmToken) {
          comp.fcmToken = fcmToken
        },
        function (error) {
          console.error(error)
        }
      )
    },
    onApnsTokenReceived () {
      var comp = this

      // if (cordova.platformId === 'ios') {
      FirebasePlugin.onApnsTokenReceived(
        function (token) {
          comp.apnToken = token
        },
        function (error) {
          comp.apnToken = 'Error:' + error
        }
      )
      // }
    },
    getApnToken () {
      var comp = this
      FirebasePlugin.getAPNSToken(
        function (token) {
          alert(token)
          comp.apnToken = token
        },
        function (error) {
          comp.apnToken = 'Error:' + error
        }
      )
    }
  }, // end method
  data () {
    return {
      fcmToken: '',
      apnToken: '',
      isHidden: false
    }
  }
}
</script>
