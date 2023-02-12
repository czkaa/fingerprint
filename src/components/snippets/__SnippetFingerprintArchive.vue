<template>
  <div snippet-fingerprint class="relative group border-black border rounded-full">
    <div class="bg-black mix-blend-difference flex justify-center items-center group-hover:opacity-60 transition-all duration-800">
      <div :style="{filter: 'contrast(100) saturate(0)'}">
        <div
          class="w-full h-full flex relative justify-center items-center "
          :style="{width: '40rem', filter: `blur(${calculatedInt(0.35)}rem)`}"
        >
          <div v-for="(i, int) in fingerprint.int.slice(0,fingerprint.int[0] + 2)"
            class="absolute border-black-500 rounded-full mix-blend-difference"
            :style="{
              transform: `rotate(${i * (180/(fingerprint.int[0] + 2))}deg)`,
              width: `${calculatedInt(fingerprint.int[1] * 3 )}rem`,
              height: `${Math.max(5, calculatedInt((fingerprint.int[2] * 2 )))}rem`,
              top:  `${calculatedInt(8 - int * 2 + 20)}rem`,
              borderWidth: `${calculatedInt(2)}rem`,
            }"
          />

          <div v-for="(i, int) in fingerprint.int.slice(0,fingerprint.int[2] + 2)"
            class="absolute border-black-500 rounded-full mix-blend-difference"
            :style="{
              transform: `rotate(${i * (180/(fingerprint.int[0] + 2))}deg)`,
              width: `${calculatedInt(fingerprint.int[1] * 3 )}rem`,
              height: `${calculatedInt(fingerprint.int[2] * 2 )}rem`,
              top:  `${calculatedInt(8 - int * 2 + 20)}rem`,
              borderWidth: `${calculatedInt(1.5)}rem`
            }"
          />
        </div>
      </div>
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
    props: {
      fingerprint: Object,
      factor: {
        type: Number,
        default: 1
      }
    },
    computed: {

    },
    methods: {
      calculatedInt(int) {
        return int* this.factor;
      },
    //   onMouseMove: _throttle(function (ev) {
    //
    //     this.x = ev.clientX
    //     this.y = ev.clientY
    //     this.xPercent = this.x/this.viewportWidth * 60
    //     this.yPercent = 60-this.y/this.viewportHeight * 60
    //     console.log('_throttle')
    //     console.log(this.xPercent)
    //     console.log(this.xPercent)
    //
    //   }, 50),
    //
    //   updateViewportSize: _throttle(function () {
    //     this.viewportHeight = window.innerHeight
    //     this.viewportWidth = window.innerWidth
    //   }, 100),
    //
    //   rotate() {
    //     let yIncrement = true
    //     let xIncrement = true
    //     setInterval(()=>{
    //       if (this.yPercent < 60 && yIncrement) {
    //         this.yPercent ++
    //       } else if (this.yPercent < 1) {
    //         yIncrement = true
    //       } else {
    //         yIncrement = false
    //         this.yPercent--
    //       }
    //
    //       if (this.xPercent < 60 && xIncrement) {
    //         this.xPercent ++
    //       } else if (this.xPercent < 1) {
    //         xIncrement = true
    //       } else {
    //         xIncrement = false
    //         this.xPercent--
    //       }
    //     }, 100)
    //   }
    // },
    // created () {
    //   this.updateViewportSize()
    },
    unmounted () {
      window.removeEventListener('resize', this.updateViewportSize)
    },
  }

</script>

<style lang="scss">

</style>
