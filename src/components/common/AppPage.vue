<template>
  <div class="page">
    <header class="header">
      <slot name="header"></slot>
    </header>
    <main class="content">
      <slot name="content"></slot>
    </main>
  </div>
</template>
  
<style scoped>
.page {
  font-family: "Open Sans", sans-serif;
}

.header {
  background-color: #630000;
  color: white;
  padding: 1rem;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.content {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 1rem;
}

@media screen and (max-width: 768px) {
  .header {
    padding: 0.5rem;
  }

  .content {
    margin-top: 0.25rem;
    padding: 0.5rem;
  }
}
</style>
  