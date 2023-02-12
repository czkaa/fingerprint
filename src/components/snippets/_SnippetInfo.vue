<template>

  <div snippet-info
  :class="[
    'w-full',
    'flex flex-col items-center',
    'p-12'
  ]">
    <div class="md:w-3/4 sm:w-full">

      <div class="flex w-full">
        <BasicText :color="'white'" :size="'md'" :text="`Date of Initialization`" class="w-100"/>
        <BasicText :color="'white'" :size="'md'" :text="`${fingerprint.date}`"/>
      </div>
      <div class="flex w-full">
        <BasicText :color="'white'" :size="'md'" :text="`Time of Initialization`" class="w-100"/>
        <BasicText :color="'white'" :size="'md'" :text="`${fingerprint.time}`"/>
      </div>
      <div class="flex w-full mb-10">
        <BasicText :color="'white'" :size="'md'" :text="`Location of Initialization`" class="w-100"/>
        <BasicText :color="'white'" :size="'md'" :text="`${fingerprint.location}`"/>
      </div>

      <div lang="en" class="flex-shrink-0 text-justify mt-20">
        <BasicText :color="'white'" :size="'md'" class="indent" :text="'This is your fingerprint. It is unique for the device through which you access this website. It is a representation of a 16-characters string, obtained through an analysis of your gpu, the fonts which you have installed, and your monitor resolution.</br> It is a digital representation of a physical object, specific to your machine. While it makes your device identifiable and trackable, it also constitutes a space of familiarity. The browser you use, the location from which you enter or the ip address assigned to your machine might change. This fingerprint remains the same accross browsers, coordinates and time.'"/>
      </div>

    </div>

  </div>


</template>

<script>

import BasicText from '@/components/basic/BasicText.vue'


  export default {
    name: 'SnippetInfo',
    components: {
      BasicText
    },
    data() {
      return {
      }
    },
    methods: {

    },
    computed: {
      fingerprint() {
        return this.$store.state.fingerprint
      }
    },

  }

</script>

<style lang="scss">


</style>
