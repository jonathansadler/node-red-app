<template>
  <q-page>
    <q-form ref="loginForm" id="loginForm">
      <div class="q-pa-md">
        <div class="q-gutter-md">
          <h5 class="text-weight-bold text-blue">
            App Setting (saved on Phone)
          </h5>
          <q-separator />
          <q-card class="my-card bg-amber-3">
            <!--
          <q-card-section>
            By default, NR Dashboard use basic authentication, that impossible
            to embed in mobile app. For testing, you must remove basic
            authentication by comment out "httpNodeAuth" in NR settings.js
            <br /><b
              >For production, please add authentication by using middle ware in
              ui settings</b
            ><br />
            ui: { path: "ui", middleware: require("./dashboard-auth.js") },<br />
            Visit project github for guideline to install middleware
          </q-card-section>
          -->
            <q-card-section>
              Dasboard URL, username and password for Dashboard enabled in
              'httpNodeAuth:'
            </q-card-section>
          </q-card>
          <q-input
            ref="dashboard_url"
            :rules="[
              value => value.includes('http') || 'Must contain http or https'
            ]"
            v-model="dashboard_url"
            outlined
            type="url"
            label="Dashboard URL"
          >
          </q-input>
          <q-input
            ref="dashboard_user"
            v-model="dashboard_user"
            outlined
            type="text"
            label="Dashboard Username"
          >
          </q-input>
          <q-input
            ref="dashboard_password"
            v-model="dashboard_password"
            outlined
            type="text"
            label="Dashboard password"
          >
          </q-input>
          <q-separator />
          <q-card class="my-card bg-light-blue-2 ">
            <q-card-section>
              Setting for Admin URL, username and password for automatically
              login
            </q-card-section>
          </q-card>
          <q-input
            ref="admin_url"
            :rules="[
              value => value.includes('http') || 'Must contain http or https'
            ]"
            v-model="admin_url"
            outlined
            type="url"
            label="Admin URL"
          >
          </q-input>
          <q-input
            ref="admin_user"
            v-model="admin_user"
            outlined
            type="text"
            label="Admin username"
          >
          </q-input>
          <q-input
            ref="admin_password"
            v-model="admin_password"
            outlined
            type="text"
            size="xl"
            label="Admin password"
          >
          </q-input>
          <q-separator />
          <q-card class="my-card bg-light-blue-2 text-left">
            <q-card-section>
              Setting for Location Tracking. App has button to quickly create
              endpoint http-in node to get location.<br />
              <span v-if="location_url">
                App will uses
                <a href="#ff"
                  >{{ location_url }}/location?lat=lat_data&lon=lon_data'</a
                >
                as default to send location data. Make sure this url works
                (contain http or https)
              </span>
              <span v-else
                >No Location URL specified, app uses
                <a href="#ff"
                  >{{ admin_url }}/location?lat=lat_data&lon=lon_data'</a
                >
                as default to send location data.
              </span>
              <ul>
                <li>
                  Location URL security: BasicAuth mean App will use username
                  and password from Dashboard setting to authenticate location
                  url
                </li>
                <li>Timeout: Maximum time (in milliseconds) request call</li>
                <li>
                  Max age: Maximum age in milliseconds of a possible cached
                  position that is acceptable to return
                </li>
              </ul>
            </q-card-section>
          </q-card>
          <div class="row">
            <q-toggle
              ref="tracking_status"
              v-model="tracking_status"
              label="Location tracking"
              left-label
            />
          </div>
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

          <q-input
            ref="location_timeout"
            v-model="location_timeout"
            outlined
            type="text"
            label="Timeout (ms)"
            :rules="[val => !!val || 'Required (number)']"
          >
          </q-input>
          <q-input
            ref="location_maxage"
            v-model="location_maxage"
            outlined
            type="text"
            label="Maximum Age"
            :rules="[val => !!val || 'Required (number)']"
          >
          </q-input>

          <q-separator />
          <q-card class="my-card bg-light-green-3">
            <q-card-section>
              Path for JS file to inject "Mobile buttons", Automatic Login,
              Editor... By default, app use JS files from github website
              (https://linhtranvu.github.io/node-red/). <br />If your Node-RED
              does not connect to internet or you want to host, download JS file
              and put in a location where your Node-RED could reach.
            </q-card-section>
          </q-card>
          <q-input
            ref="js_admin"
            v-model="js_admin"
            outlined
            :rules="[
              value => value.includes('http') || 'Must contain http or https'
            ]"
            type="text"
            label="JS to inject to Admin"
          >
          </q-input>
          <q-input
            ref="js_dashboard"
            v-model="js_dashboard"
            outlined
            :rules="[
              value => value.includes('http') || 'Must contain http or https'
            ]"
            type="text"
            label="JS to inject to Dashboard"
          >
          </q-input>
          <q-input
            ref="js_editor"
            v-model="js_editor"
            outlined
            :rules="[
              value => value.includes('http') || 'Must contain http or https'
            ]"
            type="text"
            label="JS to create Editor"
          >
          </q-input>
          <div
            class="q-pa-md q-gutter-sm items-center content-center justify-center text-left"
          >
            <q-btn color="green" icon="reply" to="/" label="Back" />
            <q-btn color="orange" icon="save" @click="save" label="Save" />
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  mounted() {
    this.js_admin =
      this.$q.localStorage.getItem("js_admin") === null
        ? process.env.js_admin
        : this.$q.localStorage.getItem("js_admin");
    this.js_dashboard =
      this.$q.localStorage.getItem("js_dashboard") === null
        ? process.env.js_dashboard
        : this.$q.localStorage.getItem("js_dashboard");
    this.js_editor =
      this.$q.localStorage.getItem("js_editor") === null
        ? process.env.js_editor
        : this.$q.localStorage.getItem("js_editor");
    this.dashboard_url =
      this.$q.localStorage.getItem("dashboard_url") === null
        ? process.env.dashboard_url
        : this.$q.localStorage.getItem("dashboard_url");
    this.dashboard_user =
      this.$q.localStorage.getItem("dashboard_user") === null
        ? process.env.dashboard_username
        : this.$q.localStorage.getItem("dashboard_user");
    this.dashboard_password =
      this.$q.localStorage.getItem("dashboard_password") === null
        ? process.env.dashboard_password
        : this.$q.localStorage.getItem("dashboard_password");
    this.admin_url =
      this.$q.localStorage.getItem("admin_url") === null
        ? process.env.admin_url // Admin Dev URL
        : this.$q.localStorage.getItem("admin_url");
    this.admin_user =
      this.$q.localStorage.getItem("admin_user") === null
        ? process.env.admin_username // Admin Dev Username URL
        : this.$q.localStorage.getItem("admin_user");
    this.admin_password =
      this.$q.localStorage.getItem("admin_password") === null
        ? process.env.admin_password // Admin Password Username URL
        : this.$q.localStorage.getItem("admin_password");
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
  },
  methods: {
    save() {
      // Quasar allows us to add loading spinners to our buttons
      // so we bind the loading property to the attribute on q-btn.
      this.loading = true;
      // The login method returns a promise.

      this.$refs.loginForm.validate().then(success => {
        if (success) {
          this.loading = false;
          this.$q.localStorage.set("dashboard_url", this.dashboard_url);
          this.$q.localStorage.set("dashboard_user", this.dashboard_user);
          this.$q.localStorage.set(
            "dashboard_password",
            this.dashboard_password
          );
          this.$q.localStorage.set("admin_url", this.admin_url);
          this.$q.localStorage.set("admin_user", this.admin_user);
          this.$q.localStorage.set("admin_password", this.admin_password);
          this.$q.localStorage.set("js_admin", this.js_admin);
          this.$q.localStorage.set("js_dashboard", this.js_dashboard);
          this.$q.localStorage.set("js_editor", this.js_editor);
          this.$q.localStorage.set("tracking_status", this.tracking_status);
          this.$q.localStorage.set("location_url", this.location_url);
          this.$q.localStorage.set("location_timeout", this.location_timeout);
          this.$q.localStorage.set("location_maxage", this.location_maxage);
          this.$q.localStorage.set("location_security", this.location_security);
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
      admin_url: "",
      dashboard_url: "",
      admin_user: "",
      admin_password: "",
      dashboard_user: "",
      dashboard_password: "",
      js_admin: "",
      js_dashboard: "",
      js_editor: "",
      tracking_status: true,
      location_url: "",
      location_timeout: "",
      location_maxage: "",
      location_sec_options: ["None", "BasicAuth"],
      location_security: null
    };
  },
  name: "PageConfig"
};
</script>
