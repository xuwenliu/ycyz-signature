<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

*,
figure,
body {
  padding: 0;
  margin: 0;
}

ul,
ol {
  list-style-type: none;
}

.inner-image {
  display: block;
  object-fit: cover;
  width: inherit;
  height: inherit;
}




@media screen and (min-width: 320px) {
  html {
    font-size: 14px;
  }
}

@media screen and (min-width: 360px) {
  html {
    font-size: 16px;
  }
}

@media screen and (min-width: 400px) {
  html {
    font-size: 18px;
  }
}

@media screen and (min-width: 440px) {
  html {
    font-size: 20px;
  }
}

@media screen and (min-width: 480px) {
  html {
    font-size: 22px;
  }
}

@media screen and (min-width: 640px) {
  html {
    font-size: 28px;
  }
}
</style>
