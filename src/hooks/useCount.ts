import { ref } from 'vue'

export default function useCount(initCount: number = 0, step: number = 1) {
  const count = ref(initCount)

  const addCount = () => {
    count.value += step
  }
  const subCount = () => {
    count.value -= step
  }
  return { count, addCount, subCount }
}
