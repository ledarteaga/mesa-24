<template>
  <div
    class="rounded-lg border border-gray-600 py-2 px-3 my-2 w-full flex justify-between items-center"
  >
    <span class="grow">
      <p class="font-semibold text-sm">{{ item.name }}</p>

      <p class="text-gray-400 font-light text-sm">
        {{ item.item_description }}
      </p>
    </span>

    <p class="font-semibold text-sm sm:text-sm mx-2 text-nowrap">
      {{ currency }} {{ item.price }}
    </p>

    <div class="sm:max-w-24 max-w-18">
      <UButton
        @click="onButtonClick"
        icon="i-prime:plus"
        size="xs"
        v-if="!value"
      />

      <UInputNumber
        v-else
        :size="breakpoint.phone.value ? 'md' : 'sm'"
        :min="0"
        v-model="value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints, useVModel } from "@vueuse/core";

const props = defineProps<{
  item: {
    name: string | null;
    item_description: string | null;
    price: number | null;
    restaurant: number | null;
    category: string | null;
  };
  currency: string;
  quantity?: number;
}>();

const breakpoint = useBreakpoints({
  tablet: 640,
  desktop: 1024,
  phone: 510,
});

const onButtonClick = () => {
  value.value = 1;
};

const value = ref(props.quantity);

const emits = defineEmits(["increase", "decrease"]);

watch(value, () => {
  if (value.value === undefined) {
    return;
  }

  if (value.value > 0 && props.quantity === undefined) {
    emits("increase", { quantity: value.value, id: props.item.name });

    return;
  }

  if (props.quantity === undefined) {
    return;
  }

  if (value.value > props.quantity) {
    emits("increase", { quantity: value.value, id: props.item.name });
  } else if (value.value < props.quantity) {
    emits("decrease", { quantity: value.value, id: props.item.name });
  }
});

watch(
  () => props.quantity,
  () => {
    value.value = props.quantity;
  }
);
</script>
