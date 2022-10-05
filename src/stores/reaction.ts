import { defineStore } from 'pinia'
import app from '../firebase/firebaseInit'
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore'
import { ReactionData } from '../types'
import { useUserStore } from './auth'
import { v4 as uuidv4 } from 'uuid'

export const useReactionStore = defineStore('reaction', {
  state: () => ({
    reactionData: [] as Array<ReactionData>,
    reactionsLoaded: false,
  }),
  actions: {
    async getReactions() {
      const db = getFirestore(app)

      const userStore = useUserStore()

      const docSnap = await getDocs(collection(db, 'reactions'))
      docSnap.forEach((doc) => {
        if (!this.reactionData.some((reaction) => reaction.docId === doc.id)) {
          if (doc.data().user === userStore.user?.uid) {
            const data = {
              docId: doc.id,
              id: doc.data().id,
              score: doc.data().score,
              dateUnix: doc.data().dateUnix,
              date: doc.data().date,
            }

            this.reactionData.push(data)
          }
        }
      })

      this.reactionsLoaded = true
    },
    async createReaction(score: number) {
      this.reactionsLoaded = true

      const db = getFirestore(app)
      const userStore = useUserStore()

      await addDoc(collection(db, 'reactions'), {
        id: uuidv4(),
        score: score,
        dateUnix: new Date(),
        date: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }),
        user: userStore.user?.uid,
      })
      this.reactionsLoaded = false
    },

    emptyReaction() {
      this.reactionData = []
    },
  },
})
