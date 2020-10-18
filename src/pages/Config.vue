<template>
  <q-page>
    <q-form ref="loginForm" id="loginForm">
      <div
        class="q-pa-md q-gutter-md items-center content-center justify-center text-center"
      >
        <div class="row">
          <h5 class="text-weight-bold text-blue">Node-RED App Setting</h5>
        </div>
        <q-separator />
        <q-card class="my-card bg-amber-3">
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
        </q-card>
        <div class=" row">
          <q-input
            ref="dashboard_url"
            :rules="[
              val =>
                !!val ||
                'Required, must be a valid url with http or https. Eg: http://mydomain.com:1880/ui '
            ]"
            v-model="dashboard_url"
            dense
            outlined
            type="text"
            label="Dashboard URL"
          >
          </q-input>
        </div>
        <div class=" row">
          <q-input
            ref="dashboard_user"
            v-model="dashboard_user"
            dense
            outlined
            type="text"
            label="Dashboard Username"
          >
          </q-input>
        </div>
        <div class=" row">
          <q-input
            ref="dashboard_password"
            v-model="dashboard_password"
            dense
            outlined
            type="text"
            label="Dashboard password"
          >
          </q-input>
        </div>
        <q-separator />
        <q-card class="my-card bg-light-blue-2 ">
          <q-card-section>
            Setting for Admin URL, username and password. App will use this info
            to automatically login. No data sent out, everything saved on your
            phone.
          </q-card-section>
        </q-card>
        <div class=" row">
          <q-input
            ref="admin_url"
            :rules="[
              val =>
                !!val ||
                'Required, must be a valid url with http or https. Eg: http://mydomain.com:1880 '
            ]"
            v-model="admin_url"
            dense
            outlined
            type="text"
            label="Admin URL"
          >
          </q-input>
        </div>
        <div class=" row">
          <q-input
            ref="admin_user"
            v-model="admin_user"
            dense
            outlined
            type="text"
            label="Admin username"
          >
          </q-input>
        </div>
        <div class=" row">
          <q-input
            ref="admin_password"
            v-model="admin_password"
            dense
            outlined
            type="text"
            label="Admin password"
          >
          </q-input>
        </div>
        <q-separator />
        <q-card class="my-card bg-light-green-3">
          <q-card-section>
            Path for JS file to inject "Home button", Automatic Login. By
            default, app use JS file from github website
            (https://linhtranvu.github.io/node-red/myscript.js). If your
            Node-RED does not connect to internet or you want to host, download
            JS file and put in a location where your Node-RED could reach. It
            must contain http://, not a relative URL
          </q-card-section>
        </q-card>
        <div class=" row">
          <q-input
            ref="js_url"
            :rules="[
              val => !!val || 'Url to javascript file to inject to Dashboard'
            ]"
            v-model="js_url"
            dense
            outlined
            type="text"
            label="JS path to inject to Dashboard"
          >
          </q-input>
        </div>
        <div
          class="q-pa-md q-gutter-sm items-center content-center justify-center text-left"
        >
          <q-btn color="green" icon="reply" to="/" label="Back" />
          <q-btn color="orange" icon="save" @click="save" label="Save" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  mounted () {
    if (this.$q.localStorage.getItem('js_url') === null) {
      this.js_url =
        process.env.js_url
    } else {
      this.js_url = this.$q.localStorage.getItem('js_url')
    }
    this.dashboard_url =
      this.$q.localStorage.getItem('dashboard_url') === null
        ? process.env.dashboard_url
        : this.$q.localStorage.getItem('dashboard_url')
    this.dashboard_user =
      this.$q.localStorage.getItem('dashboard_user') === null
        ? process.env.dashboard_username
        : this.$q.localStorage.getItem('dashboard_user')
    this.dashboard_password =
      this.$q.localStorage.getItem('dashboard_password') === null
        ? process.env.dashboard_password
        : this.$q.localStorage.getItem('dashboard_password')
    this.admin_url =
      this.$q.localStorage.getItem('admin_url') === null
        ? process.env.admin_url // Admin Dev URL
        : this.$q.localStorage.getItem('admin_url')
    this.admin_user =
      this.$q.localStorage.getItem('admin_user') === null
        ? process.env.admin_username // Admin Dev Username URL
        : this.$q.localStorage.getItem('admin_user')
    this.admin_password =
      this.$q.localStorage.getItem('admin_password') === null
        ? process.env.admin_password // Admin Password Username URL
        : this.$q.localStorage.getItem('admin_password')
  },
  methods: {
    save () {
      // Quasar allows us to add loading spinners to our buttons
      // so we bind the loading property to the attribute on q-btn.
      this.loading = true
      // The login method returns a promise.
      var loginData = new FormData()
      // loginData.append("dashboard_url", this.dashboard_url);
      // loginData.append("dashboard_user", this.dashboard_user);
      // loginData.append("dashboard_password", this.dashboard_password);
      // loginData.append("js_url", this.js_url);

      this.$refs.loginForm.validate().then(success => {
        if (success) {
          this.loading = false
          this.$q.localStorage.set('dashboard_url', this.dashboard_url)
          this.$q.localStorage.set('dashboard_user', this.dashboard_user)
          this.$q.localStorage.set(
            'dashboard_password',
            this.dashboard_password
          )
          this.$q.localStorage.set('admin_url', this.admin_url)
          this.$q.localStorage.set('admin_user', this.admin_user)
          this.$q.localStorage.set('admin_password', this.admin_password)
          this.$q.localStorage.set('js_url', this.js_url)
          // Otherwise we let the user know they've been logged in...
          this.$q.notify({
            color: 'positive',
            message: 'Save successful!'
          })
          // ...and redirect them to the index.
          // this.$router.push("/");
        } else {
          // oh no, user has filled in
          this.$q.notify({
            color: 'orange',
            message: 'Please input all required field!'
          })
        }
      })
    }
  }, // end method
  data () {
    return {
      admin_url: '',
      dashboard_url: '',
      admin_user: '',
      admin_password: '',
      dashboard_user: '',
      dashboard_password: '',
      js_url: ''
    }
  },
  name: 'PageConfig'
}
</script>
