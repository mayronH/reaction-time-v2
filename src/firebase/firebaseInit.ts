import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDU7PMA1Ggyuwhv1bu3MsgQZ8ejLEf0PlI',
  authDomain: 'reaction-time-30ef7.firebaseapp.com',
  projectId: 'reaction-time-30ef7',
  storageBucket: 'reaction-time-30ef7.appspot.com',
  messagingSenderId: '737735531405',
  appId: '1:737735531405:web:98ce4ffeb0483253117bc4',
}

const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
