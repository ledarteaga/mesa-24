import Header from './Header.vue'
<template>
  <div class="h-screen flex flex-col">
    <GeneralHeader />

    <section class="grow">
      <slot></slot>
    </section>
  </div>
</template>
