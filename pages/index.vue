<template>
  <section class="container">
    <div>
      <h1 class="title">
        Albion Profit Calculator
      </h1>
      <h2 class="subtitle"/>
      <div class="links">
        <nuxt-link 
          :to="localePath('/tree')"
          class="links__button--brown">Profit tree
        </nuxt-link>
      </div>
    </div>
    <footer>
      <a href="https://github.com/GeekaN2">&copy; GeekaN</a>
      <a href="https://www.albion-online-data.com/">Powered by Albion Online Data Project</a>
    </footer>
  </section>
</template>

<style scoped lang="scss">
$base-brown: #583131;
$base-purple: #583156;

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: $base-brown;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
  
  &__button--purple, &__button--brown {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid $base-brown;
    color: $base-brown;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  &__button--purple {
    border-color: $base-purple;
    color: $base-purple;
  }

  &__button--purple:hover {
    color: #fff;
    background-color: $base-purple;
  }

  &__button--brown:hover {
    color: #fff;
    background: $base-brown;
  }
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-evenly;

  a {
    color: $base-brown;
  }
}
</style>
