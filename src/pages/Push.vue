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
              <span>
                <q-btn
                  color="blue"
                  @click="isHidden = !isHidden"
                  label="More Info"
              /></span>
              <div v-if="!isHidden">
                <div v-if="platformID === 'ios'">
                  <span class="wrap"
                    ><b>Debug:</b>If this data is blank, you cannot send push.
                    APNs is: {{ apnToken }}</span
                  >
                  <q-btn
                    color="orange"
                    icon="save"
                    @click="getApnToken"
                    label="Get APN"
                  />
                </div>
                <div v-else>
                  Android is simple, just send message to Device Token and you
                  get push
                </div>
              </div>
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
import axios from "axios";
import Vue from "vue";

export default {
  mounted() {
    FirebasePlugin.grantPermission(function(hasPermission) {
      console.log("Permission was " + (hasPermission ? "granted" : "denied"));
    });

    var comp = this;
    this.getToken();
    if (cordova.platformId === "ios") {
      this.getApnToken();
    }
    this.platformID = cordova.platformId;
    // this.onApnsTokenReceived()
  },
  methods: {
    getToken() {
      var comp = this;
      FirebasePlugin.getToken(
        function(fcmToken) {
          comp.fcmToken = fcmToken;
        },
        function(error) {
          console.error(error);
        }
      );
    },
    onApnsTokenReceived() {
      var comp = this;

      // if (cordova.platformId === 'ios') {
      FirebasePlugin.onApnsTokenReceived(
        function(token) {
          comp.apnToken = token;
        },
        function(error) {
          comp.apnToken = "Error:" + error;
        }
      );
      // }
    },
    getApnToken() {
      var comp = this;
      FirebasePlugin.getAPNSToken(
        function(token) {
          // alert(token);
          comp.apnToken = token;
        },
        function(error) {
          comp.apnToken = "Error:" + error;
        }
      );
    }
  }, // end method
  data() {
    return {
      fcmToken: "",
      apnToken: "",
      isHidden: true,
      platformID: ""
    };
  }
};
</script>
