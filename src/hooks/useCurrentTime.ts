import { ref, computed } from 'vue'
import useInterval from './useInterval'

export default function useCurrentTime() {
  const time = ref(Date.now())
  const t = new Date()
  const date = computed(() => {
    t.setTime(time.value)
    return t
  })
  useInterval(() => (time.value = Date.now()), 1000)

  return { date }
}
