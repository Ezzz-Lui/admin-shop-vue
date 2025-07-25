<template>
  <div class="flex justify-center items-center h-screen">
    <!-- Left: Image -->
    <div class="w-1/2 h-screen hidden lg:block">
      <img
        src="https://placehold.co/800x/0c0a09/ffffff.png?text=Your+Image&font=Poppins"
        alt="Placeholder Image"
        class="object-cover w-full h-full"
      />
    </div>
    <!-- Right: Form -->
    <RouterView />
  </div>
</template>
