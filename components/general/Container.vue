<template>
  <div class="rounded-xl border border-gray-600 grow py-4 px-4 sm:px-6">
    <div class="flex items-center">
      <h2 class="font-bold text-lg sm:text-2xl mb-3 grow">
        <slot name="title"></slot>
      </h2>
      <div class="flex gap-3">
        <slot name="actions"></slot>
      </div>
    </div>

    <slot></slot>
  </div>
</template>
