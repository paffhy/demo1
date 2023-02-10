import { type Ref, onMounted, onUnmounted, isRef } from 'vue'

export default function useToBottom(
  element: Ref<HTMLElement> | HTMLElement,
  callback: (...args: any) => any
) {
  let el: HTMLElement
  let toBottom: (...args: any) => any
  onMounted(() => {
    el = isRef(element) ? element.value : element
    toBottom = () => {
      if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {
        callback()
      }
    }
    el.addEventListener('scroll', toBottom)
  })
  onUnmounted(() => {
    el.removeEventListener('scroll', toBottom)
  })
}
