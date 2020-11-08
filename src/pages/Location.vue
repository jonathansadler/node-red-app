<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-gutter-md">
        <q-tabs
          v-model="tab"
          no-caps
          outside-arrows
          mobile-arrows
          class="bg-orange text-white shadow-2"
        >
          <q-tab name="setting" label="Setting"> </q-tab>
          <q-tab name="test" label="Test"> </q-tab>
          <!-- <q-tab name="log" label="Log" /> -->
          <q-tab name="help" label="Help" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="setting">
            <q-form ref="loginForm" id="loginForm">
              <q-card class="my-card">
                <q-card-actions align="left">
                  <q-chip
                    v-if="
                      this.$q.localStorage.getItem('tracking_status') === null
                    "
                    square
                    color="orange"
                    text-color="white"
                    icon-right="star"
                  >
                    Save setting to Start Tracking
                  </q-chip>

                  <q-btn
                    v-else
                    color="blue"
                    icon="reply"
                    @click="startTracking()"
                    label="ON/OFF Tracking"
                  />

                  <q-chip
                    :color="trackingColor"
                    text-color="white"
                    icon="bookmark"
                  >
                    Tracking Status: {{ trackingStatus }}
                  </q-chip>
                </q-card-actions>
              </q-card>
              <q-card class="my-card bg-amber-3">
                <q-card-section>
                  App will run in Background Mode, POST location data to URL
                  with basicAuth (user, password from Dashboard Setting). If no
                  URL specify, Admin URL will be used. App Admin has feature to
                  quickly create node and display on map
                  <br />
                  Location URL:
                  <span v-if="location_url">
                    <a href="#ff">{{ location_url }}/location</a>
                  </span>
                  <span v-else>
                    <a href="#ff">{{ admin_url }}/location</a>
                  </span>
                  <ul>
                    <li>
                      Stationary Radius: (in meters) When stopped, the minimum
                      distance the device must move beyond the stationary
                      location for aggressive background-tracking to engage.
                    </li>
                    <li>
                      Distance Filter: The minimum distance (meters) a device
                      must move horizontally before location update
                    </li>
                    <li>
                      POST Data: Return in an ARRAY with: lon,lat,device
                      name,time
                    </li>
                  </ul>
                </q-card-section>
              </q-card>
              <br />
              <q-toggle
                ref="tracking_status"
                v-model="tracking_status"
                label="Tracking when app start (ON will automatically start tracking when App starts)"
                left-label
              />
              <q-input
                ref="location_url"
                v-model="location_url"
                outlined
                type="text"
                label="Location URL"
              >
              </q-input>
              <q-select
                ref="location_security"
                outlined
                v-model="location_security"
                :options="location_sec_options"
                label="Location URL security"
                :rules="[val => !!val || 'Required']"
              />
              <q-select
                ref="locationProvider"
                outlined
                v-model="locationProvider"
                :options="locationProviderOptions"
                label="Location Provider"
                :rules="[val => !!val || 'Required']"
              />
              <q-select
                ref="desiredAccuracy"
                outlined
                v-model="desiredAccuracy"
                :options="desiredAccuracyOptions"
                label="Desired accuracy"
                :rules="[val => !!val || 'Required']"
              />
              <q-input
                ref="stationaryRadius"
                v-model="stationaryRadius"
                outlined
                type="text"
                label="Stationary radius (in meter)"
                :rules="[val => !!val || 'Required (number)']"
              >
              </q-input>
              <q-input
                ref="distanceFilter"
                v-model="distanceFilter"
                outlined
                type="text"
                label="Distance Filter (in meter)"
                :rules="[val => !!val || 'Required (number)']"
              >
              </q-input>
              <q-toggle
                ref="stopOnTerminate"
                v-model="stopOnTerminate"
                label="Stop on Terminate"
                left-label
              />
              <q-toggle
                ref="startOnBoot"
                v-model="startOnBoot"
                label="Start on Boot (Android)"
                left-label
              />
              <q-separator />
              <q-card class="my-card bg-amber-3">
                <q-card-section>
                  Setting for
                  <a
                    href="https://flows.nodered.org/node/node-red-contrib-web-worldmap"
                    >node-red-contrib-web-worldmap</a
                  >, a node to display map and location.
                </q-card-section>
              </q-card>
              <q-input
                ref="locationIcon"
                v-model="locationIcon"
                outlined
                type="text"
                label="Icon on map (Font awesome or Image URL)"
                :rules="[val => !!val || 'Required']"
              >
              </q-input>
              <q-input
                ref="locationIconColor"
                v-model="locationIconColor"
                outlined
                type="text"
                label="Icon color. Text color (green) or #rrggbb"
                :rules="[val => !!val || 'Required']"
              >
              </q-input>
              <div
                class="q-pa-md q-gutter-sm items-center content-center justify-center text-left"
              >
                <q-btn color="green" icon="reply" to="/" label="Back" />
                <q-btn color="orange" icon="save" @click="save" label="Save" />
              </div>
            </q-form>
          </q-tab-panel>
          <q-tab-panel name="test">
            <LocationTest></LocationTest>
          </q-tab-panel>
          <q-tab-panel name="log">
            Log data of Location tracking for Debugging
          </q-tab-panel>

          <q-tab-panel name="help">
            <iframe
              style="border:none;"
              src="https://linhtranvu.github.io/node-red/location-help.htm"
              width="100%"
              height="1500px"
            ></iframe>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import location from "../location";
import Vue from "vue";
Vue.component("LocationTest", () => import("./LocationTest.vue"));

export default {
  mounted() {
    var comp = this;
    this.tracking_status =
      this.$q.localStorage.getItem("tracking_status") === null
        ? process.env.tracking_status
        : this.$q.localStorage.getItem("tracking_status");
    this.location_timeout =
      this.$q.localStorage.getItem("location_timeout") === null
        ? "30000"
        : this.$q.localStorage.getItem("location_timeout");
    this.location_maxage =
      this.$q.localStorage.getItem("location_maxage") === null
        ? "30000"
        : this.$q.localStorage.getItem("location_maxage");
    this.location_security =
      this.$q.localStorage.getItem("location_security") === null
        ? "BasicAuth"
        : this.$q.localStorage.getItem("location_security");
    //Check run status

    BackgroundGeolocation.checkStatus(function(status) {
      if (!status.isRunning) {
        BackgroundGeolocation.start(); // triggers start on start event
        comp.trackingStatus = "Running...";
        comp.trackingColor = "green";
      } else {
        BackgroundGeolocation.stop(); // triggers start on start event
        comp.trackingStatus = "Stopped";
        comp.trackingColor = "red";
      }
    });
  },
  methods: {
    startTracking() {
      var comp = this;
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
          BackgroundGeolocation.start(); // triggers start on start event
          comp.trackingStatus = "Running...";
          comp.trackingColor = "green";
        } else {
          BackgroundGeolocation.stop(); // triggers start on start event
          comp.trackingStatus = "Stopped";
          comp.trackingColor = "red";
        }
      });
    },
    save() {
      // Quasar allows us to add loading spinners to our buttons
      // so we bind the loading property to the attribute on q-btn.
      this.loading = true;
      // The login method returns a promise.

      this.$refs.loginForm.validate().then(success => {
        if (success) {
          this.loading = false;

          this.$q.localStorage.set("tracking_status", this.tracking_status);
          this.$q.localStorage.set("location_url", this.location_url);
          this.$q.localStorage.set("location_timeout", this.location_timeout);
          this.$q.localStorage.set("location_maxage", this.location_maxage);
          this.$q.localStorage.set("location_security", this.location_security);

          this.$q.localStorage.set("locationProvider", this.locationProvider);
          this.$q.localStorage.set("stationaryRadius", this.stationaryRadius);
          this.$q.localStorage.set("distanceFilter", this.distanceFilter);
          this.$q.localStorage.set("desiredAccuracy", this.desiredAccuracy);
          this.$q.localStorage.set("stopOnTerminate", this.stopOnTerminate);
          this.$q.localStorage.set("startOnBoot", this.startOnBoot);
          this.$q.localStorage.set("locationIcon", this.locationIcon);
          this.$q.localStorage.set("locationIconColor", this.locationIconColor);
          // Otherwise we let the user know they've been logged in...
          this.$q.notify({
            color: "positive",
            message: "Save successful!"
          });
          // ...and redirect them to the index.
          // this.$router.push("/");
        } else {
          // oh no, user has filled in
          this.$q.notify({
            color: "orange",
            message: "Please input all required field!"
          });
        }
      });
    }
  }, // end method
  data() {
    return {
      tab: "setting",
      trackingColor: "",
      trackingStatus: "",
      tracking_status:
        this.$q.localStorage.getItem("tracking_status") === null
          ? "true"
          : this.$q.localStorage.getItem("tracking_status"),
      location_url: "",
      location_sec_options: ["None", "BasicAuth"],
      locationProvider:
        this.$q.localStorage.getItem("locationProvider") === null
          ? "DISTANCE_FILTER_PROVIDER"
          : this.$q.localStorage.getItem("locationProvider"),
      locationProviderOptions: [
        "DISTANCE_FILTER_PROVIDER",
        "ACTIVITY_PROVIDER"
      ],
      desiredAccuracy:
        this.$q.localStorage.getItem("desiredAccuracy") === null
          ? "MEDIUM_ACCURACY"
          : this.$q.localStorage.getItem("desiredAccuracy"),
      desiredAccuracyOptions: [
        "HIGH_ACCURACY",
        "MEDIUM_ACCURACY",
        "LOW_ACCURACY"
      ],
      location_security: null,
      stationaryRadius:
        this.$q.localStorage.getItem("stationaryRadius") === null
          ? "50"
          : this.$q.localStorage.getItem("stationaryRadius"),
      distanceFilter:
        this.$q.localStorage.getItem("distanceFilter") === null
          ? "100"
          : this.$q.localStorage.getItem("distanceFilter"),
      stopOnTerminate:
        this.$q.localStorage.getItem("stopOnTerminate") === null
          ? false
          : this.$q.localStorage.getItem("stopOnTerminate"),
      startOnBoot:
        this.$q.localStorage.getItem("startOnBoot") === null
          ? false
          : this.$q.localStorage.getItem("startOnBoot"),
      admin_url: this.$q.localStorage.getItem("admin_url"),
      locationIcon:
        this.$q.localStorage.getItem("locationIcon") === null
          ? "fa-user-circle"
          : this.$q.localStorage.getItem("locationIcon"),
      locationIconColor:
        this.$q.localStorage.getItem("locationIconColor") === null
          ? "red"
          : this.$q.localStorage.getItem("locationIconColor")
    };
  }
};
</script>
