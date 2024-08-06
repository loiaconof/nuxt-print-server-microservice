<template>
  <div>
    <table>
      <thead>
        <th>
          <td v-for="(column, index) in columns" :key="index">{{ column }}</td>
        </th>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td v-for="element in Object.values(row)">{{ element }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  columns: string[],
  rows: {[key: string]: string}[],
}>()
</script>

<style>

</style>
