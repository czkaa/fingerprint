<template>

  <div layout-menu
  v-if="fingerprint.hex !== null"
  :class="[
    'layout-nav',
    'fixed top-0',
    'w-full h-full',
    'z-10',
    'pointer-events-none'
  ]">

    <SnippetMenuItem
    :isRight="false"
    :viewName="' '"
    class="top-0 left-0"
    />

    <SnippetMenuItem
    :isRight="true"
    :viewName="'archive'"
    class="top-0 right-0"
    />

    <SnippetMenuItem
    :isRight="false"
    :viewName="'print'"
    class="bottom-0 left-0"
    />

    <SnippetMenuItem
    :isRight="true"
    :viewName="'information'"
    class="bottom-0 right-0"
    />

  </div>

</template>

<script>

import SnippetMenuItem from '@/components/snippets/SnippetMenuItem.vue'


  export default {
    name: 'LayoutMenu',
    components: {
      SnippetMenuItem
    },
    data() {
      return {
      }
    },
    methods: {
      postData() {
      }
    },
    computed: {
      fingerprint(){
        return this.$store.state.fingerprint
      },
    },

    mounted() {


    }

  }

</script>

<style lang="scss">


</style>
