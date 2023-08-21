<template>
  <button
    :class="['button', `size-${size}`, classname]"
    :disabled="disabled"
    @click="click"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "m", // s | m | l
    },
    classname: {
      type: String,
      default: ''
    },
  },
  methods: {
    click() {
      this.$emit('click');
    }
  },
};
</script>

<style scoped lang="scss">
.button {
  background: none;
  color: var(--color-seondary);
  border: var(--color-secondary) 1px solid;
  border-radius: var(--radius-s);
  cursor: pointer;
  padding: var(--space-2-xs) var(--space-s);
  transition: 0.05s;

  &:hover {
    background: var(--color-secondary);
    color: var(--color-primary);
  }
}
</style>
