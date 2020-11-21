<template>
  <q-page>
    <q-form ref="locationTestForm" id="locationTestForm">
      <div class="q-pa-md">
        <div
          v-if="this.$q.localStorage.getItem('tracking_status') === true"
          class="q-gutter-md"
        >
          <q-btn
            color="green"
            icon="reply"
            @click="sendLocation"
            label="Send Location"
          />
          <q-card class="my-card bg-amber-3">
            <q-card-section>
              Send test data to Node-RED. Should use app Admin Location Tool or
              Import Flows to create nodes for receiving and display data on
              Map. More info on Help tab<br />
              If you modified anything below (except lat,lon), should update
              back to app setting (device name) and location setting (icon
              setting)
            </q-card-section>
          </q-card>
          <q-input
            ref="lat"
            :rules="[val => !!val || 'Required']"
            v-model="lat"
            outlined
            type="url"
            label="Latitude"
          >
          </q-input>
          <q-input
            ref="lon"
            v-model="lon"
            outlined
            :rules="[val => !!val || 'Required']"
            type="text"
            label="Longitude"
          >
          </q-input>
          <q-input
            ref="call_url"
            :rules="[
              value => value.includes('http') || 'Must contain http or https'
            ]"
            v-model="call_url"
            outlined
            type="url"
            label="Location URL"
          >
          </q-input>
          <q-input
            ref="dashboard_user"
            v-model="dashboard_user"
            outlined
            type="text"
            label="NodeAuth Username"
          >
          </q-input>
          <q-input
            ref="dashboard_password"
            v-model="dashboard_password"
            outlined
            type="text"
            label="NodeAuth password"
          >
          </q-input>
          <q-input
            ref="deviceName"
            :rules="[val => !!val || 'Required']"
            v-model="deviceName"
            outlined
            label="Device name"
          >
          </q-input>
          <q-input
            ref="icon"
            v-model="icon"
            outlined
            :rules="[val => !!val || 'Required']"
            type="text"
            label="Location icon"
          >
          </q-input>
          <q-input
            ref="iconColor"
            v-model="iconColor"
            outlined
            :rules="[val => !!val || 'Required']"
            type="text"
            size="xl"
            label="Location icon color"
          >
          </q-input>
        </div>
        <div v-else class="q-gutter-md">
          Save Location setting before using this feature
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import axios from "axios";
import trackLocation from "../track-location";


export default {
  mounted() {
    if (this.location_url !== "") {
      this.call_url = this.location_url;
    } else {
      this.call_url = this.admin_url + "/location";
    }

    var component = this;

    BackgroundGeolocation.getCurrentLocation(
      function(data) {
        console.log(data);
        component.lat = data.latitude;
        component.lon = data.longitude;
        // postTemplate = {
        //   lat: data.latitude,
        //   lon: data.longitude,
        //   time: data.time,
        //   name: this.deviceName,
        //   icon: this.icon,
        //   iconColor: this.iconColor
        // };
      },
      function(error) {
        alert(error);
      }
    );
  },
  methods: {
    sendLocation() {
      // Quasar allows us to add loading spinners to our buttons
      // so we bind the loading property to the attribute on q-btn.
      this.loading = true;
      // The login method returns a promise.
      var comp = this;
      this.$refs.locationTestForm.validate().then(success => {
        if (success) {
          axios
            .post(
              comp.call_url,
              [
                {
                  lat: comp.lat,
                  lon: comp.lon,
                  icon: comp.icon,
                  iconColor: comp.iconColor,
                  name: comp.deviceName,
                  time: trackLocation.convertTimeStamp(),
                  timeStamp: comp.time,
                  lineColor: comp.iconColor
                }
              ],
              {
                auth: {
                  username: comp.dashboard_user,
                  password: comp.dashboard_password
                }
              }
            )
            .then(res => {
              alert(
                `Success: ${comp.call_url}; lat=${comp.lat};lon=${comp.lon}`
              );
            }) // parses JSON response into native JavaScript objects
            .catch(error => {
              console.log(error);
              alert(error + " " + comp.call_url);
            });
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
      deviceName: this.$q.localStorage.getItem("deviceName"),
      icon: this.$q.localStorage.getItem("locationIcon"),
      iconColor: this.$q.localStorage.getItem("locationIconColor"),
      location_url: this.$q.localStorage.getItem("location_url"),
      admin_url: this.$q.localStorage.getItem("admin_url"),
      dashboard_user: this.$q.localStorage.getItem("dashboard_user"),
      dashboard_password: this.$q.localStorage.getItem("dashboard_password"),
      tracking_status: this.$q.localStorage.getItem("tracking_status"),
      call_url: "",
      lat: "",
      lon: ""
    };
  }
  //   name: "PageConfig"
};
</script>
