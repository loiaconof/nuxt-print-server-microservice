<script lang="ts" setup>
import { usePdf } from '~/composables/pdf'

const { loading, error, download } = usePdf()
</script>

<template>
  <div>
    <button @click="download('/api/pdf/example')">
      Download
    </button>
    <hr>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="error">
      Error: {{ error }}
    </div>
  </div>
</template>
