<script setup>
defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(['isModalVisible']);

const handleClickOutside = (event) => {
  if (!event.target.closest('.modal-content')) {
    emit('isModalVisible', false);
  }
};

</script>

<template>
  <div class="modal-container" v-if="isVisible" @click="handleClickOutside">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <button @click="$emit('isModalVisible', false)" class="modal-close">&times;</button>
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
  padding: 5rem;
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
}

.modal-header {
  display: flex;
  justify-content: flex-end;
  padding: 0.25rem 1rem;
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
  max-width: 64rem;
  padding: 1.25rem;
  padding-top: 0;
}
</style>
