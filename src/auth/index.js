const LOGGED_IN = 'app/auth/LOGGED_IN'
const LOGGED_OUT = 'app/auth/LOGGED_OUT'

export const loggedIn = (user) => ({ type: LOGGED_IN, payload: user })
export const loggedOut = () => ({ type: LOGGED_OUT })

export const authEpics = [
]

export default function reducer(
  state = {
    user: null
  },
  action = {}
) {
  switch (action.type) {
    case LOGGED_IN: {
      const {
        displayName,
        email,
        photoURL,
        uid
      } = action.payload
      return {
        ...state,
        user: {
          displayName,
          email,
          photoURL,
          uid
        }
      }
    }

    case LOGGED_OUT:
      return {
        ...state,
        user: null
      }

    default:
      return state
  }
}
