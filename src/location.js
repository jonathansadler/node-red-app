// src/auth.js
import axios from 'axios'

import {
  LocalStorage
} from 'quasar'

export default {
  myAdmin: null,
  myAlert: null,
  sendLocation (formData) {
    var location_url = LocalStorage.getItem('location_url')
    var admin_url = LocalStorage.getItem('admin_url')
    var location_security = LocalStorage.getItem('location_security')
    var call_url = ''
    var allow_alert = formData.allow_alert
    // var nrAdmin = formData.nrAdmin

    // this.myAlert = formData.allow_alert
    // this.myAdmin = formData.nrAdmin

    if (location_url !== '') {
      call_url = location_url
    } else {
      call_url = admin_url + '/location'
    }
    call_url = `${call_url}`
    axios.post(call_url, {
      lat: formData.lat,
      lon: formData.lon
    }, {
      auth: {
        username: LocalStorage.getItem('dashboard_user'),
        password: LocalStorage.getItem('dashboard_password')
      }
    })
      .then(res => {
        if (allow_alert === 'app') {
          alert(`Success: ${call_url}; lat=${formData.lat};lon=${formData.lon}`)
        }
        if (allow_alert === 'red') {
          // nrAdmin.executeScript({
            // code: `alert('Success: ${call_url}; lat=${formData.lat};lon=${formData.lon}')`
          // })
        }
        return null
      }) // parses JSON response into native JavaScript objects
      .catch(error => {
        if (allow_alert === 'app') {
          console.log(error)
          alert(error + ' ' + call_url)
        }
        if (allow_alert === 'red') {
          // nrAdmin.executeScript({
          //   code: `alert('${error}. ${call_url}')`
          // })
        }
      })
  },
  errorLocation (error) {
    if (myAlert === 'app') {
      alert('Error code: ' + error.code + '\n' + 'Message: ' + error.message + '\n')
    }
    if (myAlert === 'red') {
      // nrAdmin.executeScript({
      //   code: `alert('${error}. ${call_url}')`
      // })
    }
  }
}
