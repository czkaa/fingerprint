<template>
  <div snippet-fingerprint class="flex justify-center items-center">
    <div class="bg-black mix-blend-difference" :style="{filter: 'contrast(1000) saturate(0)'}">
      <div
        class="w-full h-full flex relative justify-center items-center"
        :style="{width: '40rem', filter: `blur(${calculatedInt(0.35)}rem)`}"
      >
        <div v-for="(i, int) in fingerprint.int.slice(0,fingerprint.int[0] + 2)"
          class="absolute border-black-500 rounded-full mix-blend-difference"
          :style="{
            transform: `rotate(${90 - i * (180/(fingerprint.int[0] + 2))}deg)`,
            width: `${calculatedInt(Math.max(10, fingerprint.int[1] * 3))}rem`,
            height: `${calculatedInt(Math.min(5, (fingerprint.int[2] * 2 )))}rem`,
            top:  `calc(${calculatedInt(2 - Math.min(6, int * 2))}rem)`,
            borderWidth: `${calculatedInt(2)}rem`,
          }"
        />

        <div v-for="(i, int) in fingerprint.int.slice(0,fingerprint.int[2] + 2)"
          class="absolute border-black-500 rounded-full mix-blend-difference"
          :style="{
            transform: `rotate(${90 - i * (180/(fingerprint.int[0] + 2))}deg)`,
            width: `${Math.max(15, calculatedInt(fingerprint.int[1] * 3 ))}rem`,
            height: `${calculatedInt(Math.min(5, (fingerprint.int[2] * 2 )))}rem`,
            top:  `calc(${calculatedInt(2 - Math.min(6, int * 2))}rem)`,
            borderWidth: `${calculatedInt(1)}rem`
          }"
        />
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
    },
  }

</script>

<style lang="scss">

</style>
