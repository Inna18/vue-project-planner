<template>
  <div>
    <FilterNav @status="current=$event" :current="current" />
    <div v-for="project in filteredProjects" :key="project.id">
      <SingleTask :project="project" @delete="handleDelete" @complete="handleComplete" />
    </div>
  </div>
</template>

<script>
import SingleTask from "@/components/SingleTask";
import FilterNav from "@/components/FilterNav";
export default {
  name: 'HomeView',
  components: { FilterNav, SingleTask },
  data() {
    return {
      projects: [],
      current: "all"
    }
  },
  mounted() {
    fetch("http://localhost:3000/projects")
        .then(res => res.json())
        .then(data => this.projects = data)
        .catch(err => console.log(err));

  },
  methods: {
    handleDelete(id) {
      this.projects = this.projects.filter(project => project.id !== id);
    },

    handleComplete(id) {
      this.projects.find(project => {
        if (project.id === id) project.complete = !project.complete;
      })
    }
  },
  computed: {
    filteredProjects() {
      if (this.current === "completed") {
        return this.projects.filter(project => project.complete);
      } else if (this.current === "ongoing") {
        return  this.projects.filter(project => !project.complete);
      } else return this.projects;
    }
  }
}
</script>
