<template>
  <div page-home class="h-full w-full grid grid-cols-3 gap-4">

    <SnippetFingerprint
      v-if="fingerprint.int"
      :fingerprint="fingerprint"
      :factor="2"
      class="p-4"
    />

    <SnippetText
      v-if="fingerprint.int"
      :fingerprint="fingerprint"
      class="p-4 h-full"
      @setTextIsDone="textIsDone = true"
    />

    <SnippetArchive
      v-if="fingerprint.int && fingerprints.length > 0 && textIsDone"
      :fingerprint="fingerprint"
      :fingerprints="fingerprints"
      class="overflow-y-auto p-4"
    />
  </div>
</template>

<script>

import SnippetFingerprint from '@/components/snippets/SnippetFingerprint.vue'
import SnippetArchive from '@/components/snippets/SnippetArchive.vue'
import SnippetText from '@/components/snippets/SnippetText.vue'
import BasicText from '@/components/basic/BasicText.vue'

export default {
  name: 'PageHome',
  data() {
    return {
      textIsDone: false
    }
  },
  components: {
    SnippetFingerprint,
    BasicText,
    SnippetArchive,
    SnippetText
  },
  computed: {
    fingerprint() {
      return this.$store.state.fingerprint
    },
    fingerprints() {
      return this.$store.state.fingerprints
    },
  },
}
</script>


<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .slide-right-enter-active {
    animation: slide-right-in 1s ease-out;
  }
  .slide-right-leave-active {
    animation: slide-right-in 1s ease-out reverse;
  }

  @keyframes slide-right-in {
    0% {
      left: 100%;
    }
    100% {
      left: 50%;
    }
  }

  .slide-top-enter-active {
    animation: slide-top-in 1s ease-out;
  }
  .slide-top-leave-active {
    animation: slide-top-in 1s ease-out reverse;
  }

  @keyframes slide-top-in {
    0% {
      top: 100%;
    }
    100% {
      top: 0%;
    }
  }

</style>
