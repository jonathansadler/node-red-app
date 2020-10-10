<template>



    <q-page class="flex flex-center">
        camera
    </q-page>

</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods: {
    
  },
  created () {
    // we register the event like on plugin's doc page

  },
  mounted () {
    // window.VideoPlayerVLC.play(
    //     "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
    //     done => {},
    //     error => {}
    // );      
  },
  beforeDestroy () {
    // we do some cleanup;
    // we need to remove the event listener
  }
}

</script>
