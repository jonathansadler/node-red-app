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
import axios from "axios";
import Vue from "vue";

export default {
  mounted() {
    var comp = this;
    this.getToken();
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
    }
  }, // end method
  data() {
    return {
      fcmToken: "",
      isHidden: false
    };
  }
};
</script>
