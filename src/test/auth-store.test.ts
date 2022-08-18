import { describe, it, expect, beforeEach, beforeAll, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../stores/auth'
import { IdTokenResult } from 'firebase/auth'

beforeAll(() => {
  setActivePinia(createPinia())
})

describe('User Store Test', () => {
  let userStore: ReturnType<typeof useUserStore>

  const user = {
    createdAt: '1211321321322',
    emailVerified: false,
    isAnonymous: false,
    lastLoginAt: '1211321321322',
    displayName: 'Wah',
    email: 'wah@mail.com',
    phoneNumber: null,
    photoURL: null,
    providerId: 'github.com',
    providerData: [
      {
        displayName: 'Wah',
        email: 'wah@mail.com',
        phoneNumber: null,
        photoURL: null,
        providerId: 'github.com',
        uid: '12312323123',
      },
    ],
    accessToken: 'wah',
    expirationTime: 1660825786976,
    refreshToken: 'wah',
    metadata: {},
    tenantId: '',
    delete: (): Promise<void> => {
      return new Promise(() => {
        console.log('wah')
      })
    },
    getIdToken: (): Promise<string> => {
      return new Promise(() => {
        console.log('wah')
      })
    },
    getIdTokenResult: (): Promise<IdTokenResult> => {
      return new Promise(() => {
        console.log('wah')
      })
    },
    reload: (): Promise<void> => {
      return new Promise(() => {
        console.log('wah')
      })
    },
    toJSON: (): object => {
      return {}
    },
    uid: 'rNEhU2kVfPWCgILHGdVu9HCstbC3',
  }

  beforeEach(() => {
    userStore = useUserStore()
  })

  afterEach(() => {
    userStore.$reset()
  })

  it('initialize with no user', () => {
    expect(userStore.user).toBeNull()
  })

  it('initialize with LoggedIn false', () => {
    expect(userStore.isLoggedIn).toBeFalsy()
  })

  it('set user', () => {
    userStore.setUser(user)

    expect(userStore.user).toStrictEqual(user)
  })

  it('logout', async () => {
    userStore.setUser(user)

    await userStore.handleLogout()

    expect(userStore.user).toBeNull()
    expect(userStore.isLoggedIn).toBe(false)
  })

  it('loginWithGit', async () => {
    await userStore.loginWithGit()

    expect(userStore.user).toBeNull()
    expect(userStore.isLoggedIn).toBe(false)
  })
})
