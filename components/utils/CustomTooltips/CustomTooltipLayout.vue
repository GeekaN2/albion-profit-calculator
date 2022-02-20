<template>
  <div class="wrapper">
    <div class="content">
      <slot name="content" />
    </div>
    <div
      v-if="!hideTooltip"
      class="tooltip"
    >
      <slot name="tooltip" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SupportMeTooltip",
  props: {
    hideTooltip: {
      type: Boolean,
      default: false,
    }
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: inline-block;
  position: relative;
}

.content {
  display: inline-block;
}

.tooltip:hover, .content:hover + .tooltip {
  visibility: visible;
  opacity: 1;
  top: calc(100% + var(--space-2-xs));
}

.tooltip {
  position: absolute;
  width: max-content;
  background: var(--color-contrast-analog);
  color: var(--color-primary);
  padding: var(--space-2-xs) var(--space-xs);
  border-radius: var(--radius-s);
  transition: opacity 0.125s, top 0.125s;
  
  top: calc(100% + var(--space-3-xs));
  left: 50%;
  transform: translateX(-50%);

  visibility: hidden;
  opacity: 0;

  &::after {
    content: '';
    position: absolute;
    display: block;
    top: -4px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: var(--color-contrast-analog);
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 8px;
    top: -8px;
    left: 0;
  }
}

</style>