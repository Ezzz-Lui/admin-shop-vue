<template>
  <!-- Header Navbar -->
  <HeaderNavbar />

  <!-- Main Content -->
  <router-view />

  <!-- Footer -->
  <FooterNavbar />
</template>

<script setup lang="ts">
import FooterNavbar from '../components/FooterNavbar.vue';
import HeaderNavbar from '../components/HeaderNavbar.vue';
</script>
