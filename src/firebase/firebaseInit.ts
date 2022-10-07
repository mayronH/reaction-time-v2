import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDU7PMA1Ggyuwhv1bu3MsgQZ8ejLEf0PlI',
  authDomain: 'reaction-time-30ef7.firebaseapp.com',
  projectId: 'reaction-time-30ef7',
  storageBucket: 'reaction-time-30ef7.appspot.com',
  messagingSenderId: '737735531405',
  appId: '1:737735531405:web:98ce4ffeb0483253117bc4',
}

const firebaseApp = initializeApp(firebaseConfig)

export const messaging = getMessaging(firebaseApp)

function allowNotifications() {
  Notification.requestPermission().then((result) => {
    if (result === 'granted') {
      getToken(messaging, {
        vapidKey:
          'BNybwE9l5mimHE_57oWXRAJF9K3h2jzDNNrRYG7Gmh-i1jl1SJdCFSzU6rGAfonSzs9rdFKCV2DIX0Nru7Qv7xQ',
      }).then((token) => {
        console.log(token)
      })
    }
  })
}
allowNotifications()

export const auth = getAuth()

export default firebaseApp
