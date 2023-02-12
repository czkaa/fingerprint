<template>
  <div snippet-archive class="w-full h-full flex justify-between relative grid grid-cols-2 gap-4">
    <template v-for="(fingerprintArr, index) in fingerprints">
      <div class="relative" :key="index" v-if="fingerprintArr.int !== fingerprint.int">
        <SnippetFingerprint
          :fingerprint="fingerprintArr"
          :style="{height: '25rem'}"
          :factor="0.9"
        />

        <div
          :class="[
            'absolute w-full top-0 p-3',
            'grid grid-cols-2 gap-x-20 gap-y-0.5',
            'text-xs text-left auto-cols-min break-all leading-none opacity-70'
          ]"
          :style="{gridTemplateColumns: 'auto 1fr'}"
        >
        <p>date</p><p class="text-right">{{fingerprintArr.date}}</p>
        <p>location</p><p class="text-right">{{fingerprintArr.location}}</p>
        <p>hash</p><p class="text-right">{{fingerprintArr.string}}</p>
      </div>

      <p class="absolute bottom-0 p-3 opacity-70">{{(index + 1).toString().padStart(3, "0")}}</p>

      </div>
    </template>
  </div>
</template>

<script>

import BasicText from '@/components/basic/BasicText.vue'
import SnippetFingerprint from '@/components/snippets/SnippetFingerprint.vue'

export default {
  components: {
    BasicText,
    SnippetFingerprint
  },
  props: {
    fingerprint: Object,
    fingerprints: Array
  }
}
</script>
