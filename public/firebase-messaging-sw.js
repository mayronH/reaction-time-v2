// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyDU7PMA1Ggyuwhv1bu3MsgQZ8ejLEf0PlI',
  authDomain: 'reaction-time-30ef7.firebaseapp.com',
  projectId: 'reaction-time-30ef7',
  storageBucket: 'reaction-time-30ef7.appspot.com',
  messagingSenderId: '737735531405',
  appId: '1:737735531405:web:98ce4ffeb0483253117bc4',
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  // Customize notification here
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'favicon.ico',
  }

  self.registration.showNotification(
    payload.notification.title,
    notificationOptions
  )
})
