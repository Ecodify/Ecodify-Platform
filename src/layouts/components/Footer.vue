<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Copyright
    </span>
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 text-primary d-none">
      <a
        href="https://themeselection.com/license/"
        target="noopener noreferrer"
      >License</a>
      <a
        href="https://themeselection.com/"
        target="noopener noreferrer"
      >About</a>
      <a
        href="https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/documentation/"
        target="noopener noreferrer"
      >Privacy & Policy</a>
    </span>
  </div>
</template>
