<template>
  <form @submit.prevent="handleEdit">
    <label>Title</label>
    <input v-model="title" type="text">

    <label>Details</label>
    <textarea v-model="details" />

    <button>Edit Project</button>
  </form>
</template>

<script>
export default {
  props: ["id"],
  name: "EditProject",
  data() {
    return {
      title: "",
      details: ""
    }
  },
  mounted() {
    fetch(`http://localhost:3000/projects/${this.id}`)
      .then(res => res.json()).then(data => {
        console.log(data)
        this.title = data.title;
        this.details = data.details;
      })
      .catch(err => console.log(err.message));
  },
  methods: {
    handleEdit() {
      fetch(`http://localhost:3000/projects/${this.id}`, {
        method: "PATCH",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({title: this.title, details: this.details})
      }).then(() => {
        this.$router.push("/");
      })
    }
  }
}
</script>

<style scoped>
  form {
    background: white;
    padding: 20px;
    border-radius: 10px;
  }
  label {
    display: block;
    color: #bbb;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 20px 0 10px 0;
  }
  input {
    padding: 10px;
    border: 0;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
  }
  textarea {
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    height: 100px;
  }
  form button {
    display: block;
    margin: 20px auto 0;
    background: #00ce89;
    color: white;
    padding: 10px;
    border: 0;
    border-radius: 6px;
    font-size: 16px;
  }
</style>
