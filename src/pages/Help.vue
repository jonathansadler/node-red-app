<template>
  <q-page>
    <div
      class="q-pa-md q-gutter-md items-center content-center justify-center text-center"
    >
      <div class="row">
        This is a mobile app for Node-RED. Hope you guys like it.
        <ul>
          <li>
            Project Github:
          </li>
          <li>
            Author: Linh Tran Vu. Email: linhtranvu@gmail.com
          </li>
        </ul>

        <br />
      </div>
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
