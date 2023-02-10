import { ref } from 'vue'
import useEventListener from './useEventListener'

export default function useMouse() {
  const x = ref(0)
  const y = ref(0)

  const update = (e: Event) => {
    const event = e as MouseEvent
    x.value = event.clientX
    y.value = event.clientY
  }

  useEventListener(window, 'mousemove', update)

  return { x, y }
}
