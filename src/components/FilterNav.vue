<template>
  <div class="filter-nav">
    <button @click="updateFilter('all')" :class="{ active: current === 'all'}">All</button>
    <button @click="updateFilter('completed')" :class="{ active: current === 'completed'}">Completed</button>
    <button @click="updateFilter('ongoing')" :class="{ active: current === 'ongoing'}">Ongoing</button>
  </div>
</template>

<script>
export default {
  props: ["current"],
  name: "FilterNav",
  methods: {
    updateFilter(status) {
      this.$emit("status", status);
    }
  }
}
</script>

<style scoped>
  .filter-nav button {
    background: none;
    border: none;
    color: #bbb;
    outline: none;
    font-size: 12px;
    text-transform: uppercase;
    margin-right: 10px;
    cursor: pointer;
  }
  .filter-nav button.active {
    color: #555;
  }
</style>
