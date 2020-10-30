// src/auth.js
import axios from 'axios'
import {
  LocalStorage
} from 'quasar'

export default {
  user: null,

  sendLocation (formData) {
    var location_url = LocalStorage.getItem('location_url')
    var admin_url = LocalStorage.getItem('admin_url')
    var location_security = LocalStorage.getItem('location_security')
    var call_url = ''
    var allow_alert = formData.allow_alert
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

    // axios({
    //   method: 'post',
    //   url: call_url,
    //   // data: formData,
    //   config: {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     },
    //     auth: {
    //       username: 'user',
    //       password: '123456'
    //     }
    //   }
    // })
      .then(res => {
        if (allow_alert === true) {
          alert('Success sent: ' + call_url)
        }
        return null
      }) // parses JSON response into native JavaScript objects
      .catch(error => {
        console.log(allow_alert)
        if (allow_alert === true) {
          console.log(error)
          alert(error + ' ' + call_url)
        }
      })
  },
  errorLocation (error) {
    if (allow_alert === true) {
      alert('Error code: ' + error.code + '\n' + 'Message: ' + error.message + '\n')
    }
  }
}
