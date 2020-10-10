<template>
<div class="q-pa-md">

</div>
</template>

<script>

document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() { 
  
  // Cordova is now initialized. Have fun!

  // console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
  // var nrdash = cordova.InAppBrowser.open("http://192.168.1.100:1880/ui/?username=user&token=123456", '_blank', 'location=no,hidenavigationbuttons=yes,zoom=no,enableViewportScale=no');
  // nrdash.addEventListener('loadstop', function() {
  //   nrdash.executeScript({file: "http://192.168.1.100/node-red/myscript.js"});	
  // });	

  // nrdash.addEventListener('message', function(data) {

    

  //   console.log(data) 
  //   if(data.data.home == "home"){
  //     nrdash.hide();
  //   }
     
    
  // });	


}


export default {
  mounted () {

    var nrdash = cordova.InAppBrowser.open("http://192.168.1.100:1880/ui/?username=user&token=123456", '_blank', 'location=no,hidenavigationbuttons=yes,zoom=no,enableViewportScale=no');
    this.mydash = nrdash
    nrdash.addEventListener('loadstop', function() {
      nrdash.executeScript({file: "http://192.168.1.100/node-red/myscript.js"});	
    });	

    nrdash.addEventListener('message', function(data) {

      if(data.data.home == "home"){
        nrdash.hide();
        
      }   
      
    });	
    
    
  },  
  methods: {
    showDashBoard: function() {
      this.mydash.show();
    }
  }
}

</script>
