import { defineStore } from 'pinia'
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth'
import router from '../router'
import { useReactionStore } from './reaction'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    isLoggedIn: false,
  }),

  actions: {
    setUser(user: User | null) {
      this.user = user
    },
    async loginWithGit() {
      const provider = new GithubAuthProvider()
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          const credential = GithubAuthProvider.credentialFromResult(result)
          const token = credential?.accessToken
          if (token) {
            this.setUser(result.user)
            this.isLoggedIn = true
            router.push('/')
          }
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          // The email of the user's account used.
          const email = error.email
          // The AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error)

          console.log(`${errorCode} - ${errorMessage}`)
          console.log(email, credential)
        })
    },
    async handleLogout() {
      await signOut(getAuth())
      this.setUser(null)
      this.isLoggedIn = false

      const reactionStore = useReactionStore()
      reactionStore.emptyReaction()

      // router.push('/')
    },
  },
})
