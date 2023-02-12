<template>
  <div snippet-text class="w-full relative overflow-y-auto">
    <div class="h-full flex flex-col justify-between">
      <BasicText class="opacity-70" size="md" :text="textDisplay" />

      <BasicText class="opacity-70" size="xs" :text="notes" />

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
    props: {
      fingerprint: Object
    },
    data() {
      return {
        textDisplay: '',
        transform: {x: 10, y: 0, z: 0, scaleY: 1, scaleX: 1},
        sleep: (ms) => new Promise((res) => setTimeout(res, ms)),
        textContent: [
          'This is your fingerprint.',
          'It is unique for the device through which you access this website.',
          'It is a representation of a 16-characters string, obtained through an analysis of your gpu and monitor resolution.',
          'It is a digital representation of a physical object, specific to your machine.',
          'While it makes your device identifiable and trackable, it also constitutes a space of familiarity.',
          'The browser you use, the location from which you enter or the ip address assigned to your machine might change.',
          'This fingerprint remains the same accross browsers, coordinates and time.',
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,'
        ],
        notes: '( 1 ) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam <i>nonumy eirmod tempor invidunt</i> ut labore et dolore magna aliquyam erat, sed diam voluptua.'
      }
    },
    methods: {
      async writeText() {
        for (let line of this.textContent) {
          // this.textDisplay = ''
          for (let letter of line) {
            this.textDisplay += letter
            await this.sleep(10)
          }
          await this.sleep(1000)
          this.transform = {x: Math.floor(Math.random() * 20),
                           y: Math.floor(Math.random() * 20),
                           z: Math.floor(Math.random() * 10),
                           scaleX: Math.random() * 1.5 + 1,
                           scaleY: Math.random() * 1.5 + 1
                         }
          console.log(this.transform)
          this.textDisplay += '<br>'
        }
        this.transform = {x: 10, y: 0, z: 0, scaleY: 1, scaleX: 1};
        await this.sleep(5000)
        // this.textDisplay = ''
        this.$emit('setTextIsDone')
      }
    },
    mounted() {
      this.writeText()
    }
  }

</script>

<style lang="scss">


</style>
