<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          <q-btn flat to="/">Node-RED App</q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script>
export default {};
/*
export default {
  mounted () {
    console.log(this.mydash);
    if (typeof this.mydash !== 'undefined') {
    }else{
      this.loadDashBoard();
    }     
    
  }, //end mount 
  methods: {
    loadDashBoard: function(){
      var nrdash = cordova.InAppBrowser.open("http://192.168.1.100:1880/ui/?username=user&token=123456", '_blank', 'location=no,hidenavigationbuttons=yes,zoom=no,enableViewportScale=no');
      this.mydash = nrdash
      nrdash.addEventListener('loadstop', function() {
        nrdash.executeScript({file: "http://192.168.1.100/node-red/myscript.js"});	
      });	

      nrdash.addEventListener('message', function(data) {

        if(data.data.home == "home"){
          nrdash.hide();
          this.$q.localStorage.set('nrdash', nrdash);
          // this.$q.localStorage.set('nrdashVisible', false);
          
        }   
        
      });	
    },

    showDashBoard: function() {

      if (typeof this.mydash !== 'undefined') {
        this.mydash.show();
      }else{
        this.loadDashBoard();
      }     
      
    }
  },//end method
}
*/
</script>
