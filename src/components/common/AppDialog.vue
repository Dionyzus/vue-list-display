<script setup>
import { onBeforeUnmount } from 'vue';

defineProps({
  isVisible: { type: Boolean, default: false }
});

const emit = defineEmits(['onModalToggle']);

const handleClickOutside = (event) => {
  if (!event.target.closest('.modal-content')) {
    emit('onModalToggle', false);
  }
};

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="modal-container" v-if="isVisible" @click="handleClickOutside">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <button @click="emit('onModalToggle', false)" class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 0.75rem;
  overflow: auto;
  padding: 0.75rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 64rem;
  margin: 1rem;
  max-height: calc(100% - 2rem);
}

.modal-header {
  display: flex;
  justify-content: flex-end;
  padding: 0.25rem 0.25rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.75rem;
  cursor: pointer;
}

.modal-body {
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 768px) {
  .modal-content {
    padding: 1.25rem;
    margin: 2rem;
  }

  .modal-header {
    padding: 0.25rem 1rem;
  }
}
</style>
