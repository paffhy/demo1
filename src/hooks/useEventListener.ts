import { onMounted, onUnmounted } from 'vue'

type UseEventListener = (
  target: EventTarget,
  event: string,
  callback: EventListenerOrEventListenerObject | null,
  options?: boolean | AddEventListenerOptions | undefined
) => void
const useEventListener: UseEventListener = (
  target,
  event,
  callback,
  options
) => {
  onMounted(() => {
    target.addEventListener(event, callback, options)
  })
  onUnmounted(() => {
    target.removeEventListener(event, callback, options)
  })
}

export default useEventListener
