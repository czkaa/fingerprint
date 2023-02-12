<template>

  <transition name="fade">
    <div snippet-menu-item
    @click="setView"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    :class="[
    'absolute ',
    'transition-all duration-500',
    'pointer-events-auto',
    'p-2',
    'flex text-black',
    isRight ? 'flex-row-reverse' : ''
    ]">
      <button
      :class="[
        'rounded-100 w-11 h-8',
        'border-black border',
        'transition-all duration-500',
      ]"/>

      <BasicText
      :text="viewName"
      :size="'md'"
      :class="[
        'leading-none mx-1 uppercase',
        'transition-all duration-500',
      ]"/>

    </div>
  </transition>

</template>

<script>

  import BasicText from '@/components/basic/BasicText.vue'


  export default {
    name: 'SnippetMenuItem',
    components: {
      BasicText
    },
    props: {
      viewName: String,
      isRight: Boolean
    },
    data() {
      return {
        hover: false
      }
    },
    methods: {
      setView() {
        if (this.view !== this.viewName) {
          this.$store.commit('setView', this.viewName.toLowerCase())
        }
        if (this.viewName === 'print') {
          setTimeout(()=>{
            window.print()
          }, 1000)
          setTimeout(()=>{
            this.$store.commit('setView', 'fingerprint')
          }, 1500)

        }
      }
    },
    computed: {
      fingerprint() {
        return this.$store.state.fingerprint
      },
      view() {
        return this.$store.state.view
      }
    },

  }

</script>

<style lang="scss">

</style>
