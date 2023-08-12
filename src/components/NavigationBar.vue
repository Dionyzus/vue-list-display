<template>
  <nav class="navbar">
    <div>Online Casino</div>
    <ul class="nav-links">
      <li><a href="#">SPORT</a></li>
      <li><a href="#">LIVE</a></li>
      <li><a href="#">LOTO</a></li>
      <li><a href="#">CASINO</a></li>
    </ul>
  </nav>
</template>
  
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #630000;
  color: white;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1rem;
}

.nav-links li a {
  text-decoration: none;
  color: white;
}
</style>
  