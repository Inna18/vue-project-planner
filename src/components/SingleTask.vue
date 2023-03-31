<template>
  <div class="task" :class="{'done': project.complete}">
    <div class="actions">
      <h3 @click="toggleProjectDetails">{{ project.title }}</h3>
      <div class="icons">
        <router-link :to="{ name: 'edit', params: { id: project.id } }">
          <span class="material-icons-outlined">edit</span>
        </router-link>
        <span @click="deleteProject" class="material-icons-outlined">delete</span>
        <span :class="{'done': project.complete}" @click="completeProject" class="material-icons-outlined">done</span>
      </div>
    </div>
    <div class="details">
      <p v-if="showDetails">{{ project.details }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleTask",
  props: ["project"],
  data() {
    return {
      showDetails: false
    }
  },
  methods: {
    toggleProjectDetails() {
      this.showDetails = !this.showDetails;
    },
    deleteProject() {
      fetch(`http://localhost:3000/projects/${this.project.id}`, { method: "DELETE" })
          .then(() => this.$emit("delete", this.$props.project.id))
          .catch(err => console.log(err.message));
    },
    completeProject() {
      fetch(`http://localhost:3000/projects/${this.project.id}`,
          { method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "complete": !this.project.complete })
          }).then(() => this.$emit("complete", this.$props.project.id));
    }
  }
}
</script>

<style scoped>
  .task {
    margin: 20px 0;
    background: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.5);
    border-left: 4px solid #e90074;
  }
  .task.done {
    border-left: 4px solid limegreen;
  }
  h3 {
    cursor: pointer;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .material-icons-outlined {
    margin-left: 5px;
    color: #bbb;
    cursor: pointer;
  }
  .material-icons-outlined.done {
    color: limegreen;
  }
  .material-icons-outlined:hover {
    color: #777;
  }
</style>
