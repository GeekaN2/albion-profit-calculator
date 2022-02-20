<template>
  <a 
    href="https://patreon.com/geekan"
    class="link"
    target="_blank"
  >
    <svg-icon 
      class="social"
      icon-class="patreon"
    />
  </a>
</template>

<script>
export default {
  name: 'Patreon'
}
</script>

<style scoped lang="scss">
.link {
  display: inline-flex;
}

.social {
  width: 10px;
  height: 10px;
  color: #ff424d;
}
</style>