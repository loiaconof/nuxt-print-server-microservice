<script setup>
const columns = ['student', 'grade']
const rows = [
  { student: 'Alice', grade: 'A' },
  { student: 'Bob', grade: 'B' },
  { student: 'Charlie', grade: 'C' },
]
</script>

<template>
  <div>
    <pdf-table :columns="columns" :rows="rows" />
  </div>
</template>

<style>
h1 {
  color: blue;
}
</style>
