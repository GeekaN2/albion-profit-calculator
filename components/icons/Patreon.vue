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
  color: #ff424d;
  font-size: 0.8em;
}
</style>