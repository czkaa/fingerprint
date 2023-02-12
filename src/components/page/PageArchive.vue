<template>
  <div page-archive class="w-full h-full flex justify-between space-x-5 relative overflow-hidden sm:flex-wrap">
    <div class="w-1/3 h-full relative p-4 sm:w-full sm:bg-black md:bg-red-500">
      <div class="w-full h-3/4 flex-shrink-0 border-black border rounded-full overflow-hidden relative">
        <div class="h-full mix-blend-difference pb-10 flex items-center justify-center p-4">
          <SnippetFingerprint
            v-if="fingerprint.int"
            :fingerprint="fingerprint"
            :factor="1.5"
            class="transition-all duration-transform ease-in"
          />
        </div>
      </div>
      <BasicText size="md" text="001" class="absolute bottom-2 right-0 opacity-70" />
    </div>

    <div class="w-1/2 h-full overflow-y-auto p-4">
      <div
      :class="[
      'w-full h-full',
      'grid grid-cols-2 gap-4',
      ]">
        <div class="border-black border rounded-full relative"
          v-for="(fingerprint, index) in fingerprints"
        >
          <SnippetFingerprint
            :key="index"
            :fingerprint="fingerprint"
            :style="{height: '30rem'}"
          />

          <div
            :class="[
              'absolute w-full top-0 p-3',
              'grid grid-cols-2 gap-x-20 gap-y-0.5',
              'text-xs text-left auto-cols-min break-all leading-none opacity-70'
            ]"
            :style="{gridTemplateColumns: 'auto 1fr'}"
          >
          <p>date</p><p class="text-right">{{fingerprint.date}}</p>
          <p>location</p><p class="text-right">{{fingerprint.location}}</p>
          <p>hash</p><p class="text-right">{{fingerprint.string}}</p>
        </div>

        <p class="absolute bottom-0 left-0 opacity-70">huj{{(index + 1).toString().padStart(3, "0")}}</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BasicText from '@/components/basic/BasicText.vue'
import SnippetFingerprint from '@/components/snippets/SnippetFingerprint.vue'

export default {
  name: 'PageHome',
  components: {
    BasicText,
    SnippetFingerprint
  },
  computed: {
    fingerprints() {
      return this.$store.state.fingerprints
    },
    fingerprint() {
      return this.$store.state.fingerprint
    },
  },
}
</script>
