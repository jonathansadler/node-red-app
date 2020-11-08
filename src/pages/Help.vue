<template>
  <q-page>
    <div class="q-pa-md q-gutter-md ">
      <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h6 text-blue">
            This is a mobile app client for Node-RED. Hope you guys like it.
          </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <ul>
            <li>
              Project Github:
              <a
                class="text-deep-orange "
                href="https://github.com/linhtranvu/node-red-app"
                >https://github.com/linhtranvu/node-red-app</a
              >
            </li>
            <li>
              Author: Linh Tran Vu. Email:
              <span class="text-deep-orange ">linhtranvu@gmail.com</span>
            </li>
            <li>
              Forum discussion:
              <a
                class="text-deep-orange "
                href="https://discourse.nodered.org/t/beta-testing-a-mobile-app-for-node-red-dashboard-and-admin-update-31oct/34063"
                >Thread on Node-RED forum</a
              >
            </li>
          </ul>
        </q-card-section>
      </q-card>
      <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h6 text-orange">
            Security and data storage
          </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          All data for setting (url, username, password) saved on local storage
          of phone. No external server involed except some JS hosting at
          https://linhtranvu.github.io/node-red.<br />
          Using app without internet: Download JS file aboves (path could be
          found in setting), store where your Node-RED could reach (with http or
          https)
        </q-card-section>
      </q-card>
      <iframe
        style="border:none;"
        src="https://linhtranvu.github.io/node-red/index.htm"
        width="100%"
        height="1500px"
      ></iframe>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {
    // we register the event like on plugin's doc page
  },
  mounted() {
    // window.VideoPlayerVLC.play(
    //     "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
    //     done => {},
    //     error => {}
    // );
  },
  beforeDestroy() {
    // we do some cleanup;
    // we need to remove the event listener
  }
};
</script>
