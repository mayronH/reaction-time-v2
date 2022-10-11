<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue'
import FooterComponent from './components/FooterComponent.vue'
import { useUserStore } from './stores/auth'
import { onBeforeMount } from 'vue'

import { onMessage, MessagePayload } from 'firebase/messaging'
import { messaging } from '../src/firebase/firebaseInit'

const userStore = useUserStore()

onBeforeMount(() => {
  userStore.autoLogin()
})

onMessage(messaging, (payload: MessagePayload) => {
  console.log('Message received. ', payload)
  const notificationOptions = {
    body: payload.notification?.body,
    icon: 'favicon.ico',
  }
  self.registration.showNotification(
    payload.notification?.title,
    notificationOptions
  )
})
</script>

<template>
  <NavigationBar />
  <router-view />

  <FooterComponent />
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 100vh;
}
main.content {
  display: grid;
  place-items: center;

  margin-block: var(--small-size-fluid);
  padding-inline: var(--medium-size-fluid);

  height: 100%;
}
.btn {
  color: var(--text);
  font-weight: 700;
  font-size: var(--small-size-fluid);

  background-color: var(--accent);

  border: none;
  border-radius: var(--border-radius);

  padding: var(--extra-small-size-fluid);

  box-shadow: var(--box-shadow);
}

@media (min-width: 768px) {
  main.content {
    margin-block: 0;
  }
}
</style>
