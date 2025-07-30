<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-64 shadow-lg">
      <div class="flex items-center justify-center h-16 border-b">
        <h1 class="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav class="mt-8">
        <ul class="space-y-2 px-4">
          <li>
            <a href="#" class="flex items-center px-4 py-2 rounded-lg">
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center px-4 py-2 rounded-lg">
              <span>Products</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center px-4 py-2 rounded-lg">
              <span>Orders</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center px-4 py-2 rounded-lg">
              <span>Users</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="shadow-sm border-b h-16">
        <div class="flex items-center justify-between h-full px-6">
          <div class="flex items-center">
            <button class="lg:hidden">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <h2 class="text-lg font-semibold ml-4">Dashboard</h2>
          </div>
          <div class="flex items-center space-x-4">
            <button>
            </button>
            <div class="flex items-center space-x-2">
              <span class="text-sm">Admin User</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
