<template>
  <div
    basic-text
    lang="en"
    :class="[
    {
      'text-lg font-diatype ': size ===  'lg',
      'text-md font-diatype ': size ===  'md',
      'text-sm font-diatype ': size === undefined || size === 'sm',
      'text-xs font-diatype ': size === 'xs',
    }]"
    v-html="text"/>
</template>

<script>

export default {
  components: {
  },
  props: {
    text: String,
    size: String,
  },
}
</script>

<style lang="scss" scoped>

  .text-sm:deep() {
  }

</style>
