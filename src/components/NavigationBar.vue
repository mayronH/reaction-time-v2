<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '../stores/auth'
import { useThemeStore } from '../stores/theme'

const navBtn = ref()
const userStore = useUserStore()
const themeStore = useThemeStore()

onMounted(() => {
  themeStore.setBasedInPreferredMedia()

  // navbar burger script
  if (navBtn.value) {
    navBtn.value.addEventListener('click', () => {
      const isExpanded = navBtn.value.getAttribute('aria-expanded')
      if (isExpanded == 'true') {
        navBtn.value.setAttribute('aria-expanded', 'false')
      }
      if (isExpanded == 'false') {
        navBtn.value.setAttribute('aria-expanded', 'true')
      }
    })
  }
})
</script>
<template>
  <header>
    <nav class="header">
      <div class="nav-wrapper">
        <div class="logo">
          <router-link to="/" aria-label="link to home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </router-link>
        </div>

        <button
          ref="navBtn"
          class="btn-menu"
          type="button"
          aria-expanded="false"
          aria-controls="menu"
          aria-label="open mobile nav"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <ul id="menu" class="nav-links" role="menubar">
          <li role="none">
            <router-link to="/" role="menuitem" class="nav-link"
              >Home</router-link
            >
          </li>

          <li role="none">
            <router-link to="/dashboard" role="menuitem" class="nav-link"
              >Your Data</router-link
            >
          </li>

          <li role="none">
            <button
              role="switch"
              class="theme-switch"
              aria-label="toggle dark/light theme"
              aria-checked="mixed"
              @click="themeStore.toggleTheme()"
            >
              <svg
                v-if="themeStore.userTheme === 'dark'"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
          </li>

          <li v-if="userStore.isLoggedIn" role="none">
            <a
              href="#"
              role="menuitem"
              class="nav-link"
              @click="userStore.handleLogout"
            >
              Logout</a
            >
          </li>
          <li v-else role="none">
            <a
              href="#"
              role="menuitem"
              class="nav-link github"
              @click="userStore.loginWithGit"
            >
              <svg width="24" height="24" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
                ></path>
              </svg>
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<style scoped>
.header {
  padding: 0.8rem 1.25rem;

  background-color: var(--bg-medium);

  width: 100%;
}
.logo svg {
  height: 50px;
  width: 50px;

  color: var(--accent);
}
.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: var(--extra-small-size-fluid) var(--medium-size-fluid);
}
.nav-links {
  position: absolute;
  top: calc(50px + 2 * var(--extra-small-size-fluid));
  left: 0;
  right: 0;
  z-index: 20;

  background-color: var(--bg-medium);

  padding: 1.5rem;

  border-bottom: 2px solid var(--accent);

  transform: translate3d(0, -200%, 0);

  transition: transform 0.2s cubic-bezier(0.64, 0.04, 0.26, 0.87);

  list-style: none;

  text-align: center;
}
.nav-link.github {
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--accent);

  color: var(--bg-dark);
  font-weight: 600;

  padding: 0.25rem var(--extra-small-size-fluid);

  border-radius: var(--border-radius);
}
.btn-menu {
  cursor: pointer;

  color: var(--accent);

  background-color: transparent;
  border: none;

  display: grid;
  place-items: center;

  padding-inline: 1rem;
}
.btn-menu[aria-expanded='true'] + .nav-links {
  transform: translate3d(0, 0, 0);
}
.nav-links li {
  display: block;

  padding: 5px 0px;
}
.nav-link {
  color: var(--text);
  text-decoration: none;
}

.theme-switch {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.8rem;
  margin: auto;

  background-color: var(--bg-lighter);

  color: var(--text);

  border: none;

  border-radius: 50%;
}

.theme-switch svg {
  width: 1rem;
  height: 1rem;
}

@media (min-width: 768px) {
  .header {
    padding: 0.8rem 1rem;
  }
  .nav-wrapper {
    justify-content: space-between;
  }
  .btn-menu {
    display: none;
  }
  .nav-links {
    position: static;

    display: flex;
    align-items: center;

    transform: translate3d(0, 0, 0);

    border-bottom: 0;

    z-index: 0;
    padding: 0;
    inset: 0;

    background-color: transparent;
  }
  .nav-links li {
    display: inline;

    padding: 0px 5px;
  }
  li,
  .nav-link {
    width: initial;
  }
}
</style>
