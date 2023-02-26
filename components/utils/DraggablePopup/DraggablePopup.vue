<template>
  <div class="draggable-popup">
    <slot />
  </div>
</template>

<script>
export default {
    name: "DraggablePopup",
}
</script>

<style scoped lang="scss">
.draggable-popup {
    position: absolute;
    top: var(--space-s);
    right: var(--space-s);
    background: var(--color-primary-analog);
    color: var(--color-secondary);
    padding: var(--space-s);
    border-radius: var(--radius-s);
    box-shadow: 0 1px 12px -5px var(--color-unknown-secondary);
}

.input {
    width: 100%;
    background: none;
    color: var(--color-contrast);

    &--number {
        outline: none;
        border: none;
        border-bottom: 2px solid var(--color-contrast);
        transition: 0.1s;

        &:focus {
            border-bottom-color: var(--color-focus);
        }
    }
}
</style>