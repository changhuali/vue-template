<template>
  <div :class="$style['todo-wrap']">
    <h1>todos</h1>
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script>
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default {
  components: {
    Header,
    Main,
    Footer,
  },
};
</script>

<style src="./index.less" module></style>
