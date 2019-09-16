<template>

</template>

<script>
    export default {
        created(){
          this.$router.replace(this.$route.query.path||"/home");
        }
    }
</script>

<style scoped>

</style>
