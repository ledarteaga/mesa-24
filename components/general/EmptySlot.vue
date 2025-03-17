<template>
  <div class="flex flex-col gap-2 items-center justify-center grow">
    <UIcon
      class="size-24"
      style="color: gray"
      name="i-fluent:calendar-empty-32-light"
    ></UIcon>
    <p class="text-gray-400"><slot></slot></p>
  </div>
</template>
