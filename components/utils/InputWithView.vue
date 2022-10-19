<template>
  <div>
    <span 
      v-if="mode === 'view'" 
      @click="setEditMode"
    >
      {{ formatText(getText()) }}
    </span>
    <input 
      v-if="mode === 'edit'" 
      v-model.number="changeablePrice"
      v-click-outside="setViewMode" 
      class="edit"
      @change="setViewMode"
    >
  </div>
</template>

<script>
export default {
    name: 'InputWithView',
    props: {
        getText: {
            type: Function,
            default: () => '',
        },
        setText: {
            type: Function,
            default: () => {},
        },
        formatText: {
            type: Function,
            default: () => {},
        }
    },
    data() {
        return {
            // 'view' | 'edit'
            mode: 'view',
        }
    },
    computed: {
        changeablePrice: {
            set(changeablePrice) {
                this.setText(changeablePrice);
            },
            get() {
                return this.getText();
            }
        }
    },
    methods: {
        setViewMode() {
            this.mode = 'view';
        },

        setEditMode() {
            this.mode = 'edit';
        }
    }
}
</script>

<style lang="scss" scoped>
.edit {
    color: var(--color-primary);
    border: none;
    border-radius: var(--radius-2-xs);
    outline: 1px solid var(--color-primary-analog);
    background: var(--color-secondary);
}
</style>