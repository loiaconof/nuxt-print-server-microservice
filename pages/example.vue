<script setup>
defineProps({
  title: String,
  message: String,
})
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
  </div>
</template>

<style>
h1 {
  color: blue;
}
</style>
