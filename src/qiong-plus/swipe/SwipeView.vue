<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    defaultActiveIndex: {
      type: Number,
      default: 1,
    },
    swipeWidth: {
      type: String,
      default: '600px',
    },
    swipeHeight: {
      type: String,
      default: '200px',
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    circleSize: {
      type: String,
      default: '6px',
    },
    circleColor: {
      type: String,
      default: '#d1eaf4',
    },
    circleActiveColor: {
      type: String,
      default: 'rgb(209 120 113)',
    },
    circleInterval: {
      type: String,
      default: '10px',
    },
    circleDistanceBottom: {
      type: String,
      default: '10%',
    },
    transitionTime: {
      type: Number,
      default: 2000,
    },
  },
  data() {
    return {
      swipeItemLen: 0,
      swipePracticalLen: 0,
      activeIndex: this.defaultActiveIndex,
      trans: '',
      openTransition: true,
      width: parseFloat(
        (this.swipeWidth.match(/\d+.?\d*/g) as RegExpMatchArray)[0]
      ),
      unit: (this.swipeWidth.match(/[^\d.]+/g) as RegExpMatchArray)[0],
      timer: 0,
      transitionContent: `all ${this.transitionTime}ms`,
      startX: 0,
      startY: 0,
    }
  },
  computed: {
    clothWidth() {
      return this.width * this.swipePracticalLen + this.unit
    },
    translateDis() {
      return -this.activeIndex * this.width + this.unit
    },
  },
  methods: {
    startMove(e: MouseEvent) {
      this.startX = e.x
      this.startY = e.y
    },
  },
  watch: {
    activeIndex(newval) {
      const circleElement = this.$refs.circle as HTMLDivElement
      if (newval === this.swipePracticalLen - 1) {
        circleElement.children[0].classList.add('circle-active')
      }
      if (newval === this.swipePracticalLen) {
        circleElement.children[0].classList.add('circle-active')
        this.openTransition = false
        this.activeIndex = 1
        this.$nextTick(() => {
          this.activeIndex = 2
          this.openTransition = true
        })
      }
      if (newval === 0) {
        circleElement.children[0].classList.add('circle-active')
        this.activeIndex = this.swipePracticalLen - 1
      }
    },
  },
  mounted() {
    const swipeElement = this.$refs.swipe as HTMLDivElement
    this.swipeItemLen = swipeElement.children.length
    this.swipePracticalLen = this.swipeItemLen + 2

    const old_first = swipeElement.children[0]
    const old_last = swipeElement.children[this.swipeItemLen - 1]
    swipeElement.appendChild(old_first.cloneNode(true))
    swipeElement.insertBefore(old_last.cloneNode(true), old_first)
    this.timer = setInterval(() => {
      this.activeIndex++
    }, this.transitionTime)
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
})
</script>

<template>
  <div class="swipe-root">
    <div class="swipe-container">
      <div class="swipe-cloth" ref="swipe" :class="{ trans: openTransition }">
        <slot></slot>
      </div>
    </div>
    <div class="circle-container" ref="circle">
      <div
        class="circle-box"
        :class="{ 'circle-active': activeIndex === index }"
        v-for="index in swipeItemLen"
        :key="index"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.swipe-root {
  position: relative;
  width: v-bind(swipeWidth);
}
.swipe-container {
  width: v-bind(swipeWidth);
  height: v-bind(swipeHeight);
  overflow: hidden;
  .swipe-cloth {
    display: flex;
    width: v-bind(clothWidth);
    height: 100%;
    transform: translate(v-bind(translateDis));
    :deep(.swipe-item-box) {
      width: v-bind(swipeWidth);
    }
  }
  .trans {
    transition: v-bind(transitionContent);
  }
}
.circle-container {
  position: absolute;
  left: 50%;
  bottom: v-bind(circleDistanceBottom);
  display: flex;
  justify-content: space-evenly;
  padding: 10px 0;
  transform: translate(-50%);
  .alternate-play {
    transform: translate();
  }
  .circle-box {
    width: v-bind(circleSize);
    height: v-bind(circleSize);
    border-radius: 50%;
    background-color: v-bind(circleColor);
    margin: 0 v-bind(circleInterval);
  }
  .circle-active {
    background-color: v-bind(circleActiveColor);
  }
}
</style>
