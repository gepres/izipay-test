<template>
  <div>
    <h1>Crear usuario</h1>
  </div>
</template>

<script>
  export default {
    name:'crear',
    middleware: 'rolAuth',
  meta: {
    auth: { authority: 'create' }
  },
  }
</script>

<style lang="scss" scoped>

</style>
