import { onMounted, onUnmounted } from 'vue'

type UseIntervalType = (
  handler: TimerHandler,
  timeout?: number | undefined,
  ...args: any
) => void

const useInterval: UseIntervalType = (handler, timeout, ...args) => {
  let timer = 0

  onMounted(() => (timer = setInterval(handler, timeout, ...args)))
  onUnmounted(() => clearInterval(timer))
}

export default useInterval
