<template>

  <div snippet-fingerprint
    :style="{filter: 'contrast(40)'}"
    class="p-10 bg-black mix-blend-difference flex justify-center items-center"
  >
    <div
      class="w-full justify-center items-center"
      :style="{filter: 'blur(0.5rem)'}"
    >
      <div v-for="(i, int) in fingerprint.int.slice(0,fingerprint.int[0] + 2)"
        class="absolute border-black-500 rounded-full"
        :style="{
          transform: `rotate(${i * (180/(fingerprint.int[0] + 2))}deg)`,
          width: `${fingerprint.int[1] * 3 }rem`,
          height: `${fingerprint.int[2] * 2 }rem`,
          top:  `${int * 2 }rem`,
          borderWidth: '1rem'
        }"
      />
    </div>
  </div>

</template>

<script>

  import BasicText from '@/components/basic/BasicText.vue'
  import _throttle from 'lodash.throttle'

  export default {
    name: 'SnippetFingerprint',
    components: {
      BasicText
    },
    data() {
      return {
        y: 0,
        x: 0,
        hover: false,
        yPercent: Math.floor(Math.random() * (30 - 0)) + 0,
        xPercent:  Math.floor(Math.random() * (30 - 0)) + 0,
        viewportHeight: 1,
        viewportWidth: 1
      }
    },
    props: {
      fingerprint: Object,
      blur: String,
      autorotate: {
        type: Boolean,
        default: false
      },
      isOwn: Boolean,
      index: Number
    },
    methods: {
      onMouseMove: _throttle(function (ev) {

        this.x = ev.clientX
        this.y = ev.clientY
        this.xPercent = this.x/this.viewportWidth * 60
        this.yPercent = 60-this.y/this.viewportHeight * 60
        console.log('_throttle')
        console.log(this.xPercent)
        console.log(this.xPercent)

      }, 50),

      updateViewportSize: _throttle(function () {
        this.viewportHeight = window.innerHeight
        this.viewportWidth = window.innerWidth
      }, 100),

      rotate() {
        let yIncrement = true
        let xIncrement = true
        setInterval(()=>{
          if (this.yPercent < 60 && yIncrement) {
            this.yPercent ++
          } else if (this.yPercent < 1) {
            yIncrement = true
          } else {
            yIncrement = false
            this.yPercent--
          }

          if (this.xPercent < 60 && xIncrement) {
            this.xPercent ++
          } else if (this.xPercent < 1) {
            xIncrement = true
          } else {
            xIncrement = false
            this.xPercent--
          }
        }, 100)
      }
    },
    created () {
      this.updateViewportSize()
    },
    unmounted () {
      window.removeEventListener('resize', this.updateViewportSize)
    },
    mounted() {
      this.rotate()
    }
  }

</script>

<style lang="scss">

</style>
