<template>
  <label class="toggle-switch">
    <input 
      type="checkbox"
      class="checkbox"
      :checked="$colorMode.preference === 'dark'"
      @click="toggleTheme"
    >
    <span class="switch-btn" />
  </label>
</template>

<script>
export default {
  name: 'ThemeToggle',
  methods: {
    toggleTheme() {
      const isDark = this.$colorMode.preference === 'dark';
      
      this.$colorMode.preference = isDark ? 'light' : 'dark';
    }
  }
}
</script>

<style scoped lang="scss">
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 16px;  
}

.checkbox {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-btn {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 11px;
  outline: 1px solid var(--color-secondary);
  outline-offset: -1px;
  background-color: var(--color-primary);
  cursor: pointer;
  transition: 0.4s;
  -webkit-transition: 0.4s;
}
.switch-btn::before {
  position: absolute;
  content: "";
  height: 12px;
  width: 12px;
  left: 2px;
  bottom: 2px;
  border-radius: inherit;
  background-color: var(--color-secondary);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
  transition: 0.4s ease all, left 0.4s ease;
}
.switch-btn:active:before {
  width: 13px;
}

.checkbox:checked + .switch-btn {
  background-color: var(--color-primary);
  box-shadow: 0 0 8px -2px var(--color-secondary);
}
.checkbox:checked + .switch-btn::before {
  left: calc(100% - 2px);
  transform: translateX(-100%);
}

</style>