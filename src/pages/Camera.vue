<template>
  <q-page class="flex flex-center">
    camera
  </q-page>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  // created() {
  // we register the event like on plugin's doc page
  // },
  mounted() {
    // libVLCPlayer.play("rtsp://admin:kh0ngaica@192.168.1.12/onvif1");
    // window.VideoPlayerVLC.play(
    //   "rtsp://admin:kh0ngaica@192.168.1.12/onvif1",
    //   done => {},
    //   error => {}
    // );
  }, //end mount
  beforeDestroy() {
    // we do some cleanup;
    // we need to remove the event listener
  }
};
</script>
