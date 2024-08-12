<script lang="ts" setup>
async function print() {
  downloadPdf('/api/pdf/example')
}
</script>

<template>
  <div>
    <button @click="print">
      Print
    </button>
  </div>
</template>
