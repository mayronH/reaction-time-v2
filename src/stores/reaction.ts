import { defineStore } from 'pinia'
import app from '../firebase/firebaseInit'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { ReactionData } from '../types'
import { useUserStore } from './auth'

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
    emptyReaction() {
      this.reactionData = []
    },
  },
})
