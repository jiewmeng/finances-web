const ADD_TOAST = 'app/ADD_TOAST'
const REMOVE_TOAST = 'app/REMOVE_TOAST'

export const addToast = (message, status = 'ok') => ({ type: ADD_TOAST, payload: { message, status } })
export const removeToast = (toastId) => ({ type: REMOVE_TOAST, payload: { toastId } })

export default function (state = {
  nextToastId: 0,
  toasts: []
}, action) {
  switch (action.type) {
    case ADD_TOAST: {
      return {
        ...state,
        toasts: [
          ...state.toasts,
          {
            message: action.payload.message,
            status: action.payload.status,
            id: state.nextToastId
          }
        ],
        nextToastId: state.nextToastId + 1
      }
    }

    case REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(t => t.id !== action.payload.toastId)
      }

    default:
      return state
  }
}
