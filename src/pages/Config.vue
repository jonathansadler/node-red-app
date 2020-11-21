<template>
  <q-page>
    <q-form ref="loginForm" id="loginForm">
      <div class="q-pa-md">
        <div class="q-gutter-md">
          <div class="text-h6 text-blue">
            App Setting (saved on Phone)
          </div>
          <q-separator />
          <q-input
            ref="deviceName"
            :rules="[val => !!val || 'Required']"
            v-model="deviceName"
            outlined
            type="url"
            label="Device Alias Name"
          >
          </q-input>
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
          <q-toggle
            ref="auto_start_dashboard"
            v-model="auto_start_dashboard"
            label="Dashboard starts when open app"
            left-label
          />
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
          this.$q.localStorage.set("deviceName", this.deviceName);
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
          this.$q.localStorage.set(
            "auto_start_dashboard",
            this.auto_start_dashboard
          );
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
      auto_start_dashboard:
        this.$q.localStorage.getItem("auto_start_dashboard") === null
          ? false
          : this.$q.localStorage.getItem("auto_start_dashboard"),
      deviceName:
        this.$q.localStorage.getItem("deviceName") === null
          ? "My Device"
          : this.$q.localStorage.getItem("deviceName"),
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
