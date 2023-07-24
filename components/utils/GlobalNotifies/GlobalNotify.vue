<template>
  <div
    v-if="!isHidden"
    class="global-notify"
  >
    <slot>Notification</slot>
    <div
      class="global-notify-close"
      @click="disableNotify"
    >
      <svg-icon
        class="global-notify-close-icon"
        icon-class="close"
      />
    </div>
  </div>
</template>

<script>
export default {
    name: 'GlobalNotify',
    props: {
        id: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isHidden: true,
        };
    },
    mounted() {
        if (process.client) {
            this.isHidden = localStorage.getItem(`disable-notify-${this.id}`) === 'true';
        }
    },
    methods: {
        disableNotify() {
            if (process.client) {
                localStorage.setItem(`disable-notify-${this.id}`, 'true');
                this.isHidden = true;
            }
        }
    }
}
</script>

<style>
.global-notify {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: var(--space-s);
    border: 1px solid var(--color-secondary);
    border-radius: var(--radius-s);
    margin: var(--space-xs) var(--space-s);
}

.global-notify-close {
    display: flex;
    justify-content: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    align-self: normal;
    min-width: 40px;
}
</style>