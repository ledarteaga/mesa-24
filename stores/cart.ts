import type { ICartItem } from "~/types/cart.types";

export const useCartStore = defineStore("cart", () => {
  const cart = ref<ICartItem[]>([]);

  const validItems = computed(() => {
    return cart.value.filter((item) => item.quantity > 0);
  });

  const itemsCount = computed(() => {
    return cart.value.reduce((acc, item) => acc + item.quantity, 0);
  });

  const encodedOrderText = computed(() => {
    const text = cart.value
      .map((item) => `${item.quantity} x ${item.id}`)
      .join("\n");

    const encodedText = encodeURIComponent(
      `¡Hola!\nVengo de menuo y me gustaria ordenar:\n${text}`
    );

    return encodedText;
  });

  function addItem(item: ICartItem) {
    const existingItem = cart.value.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.value.push({ ...item, quantity: 1 });
    }
  }

  function removeItem(item: ICartItem) {
    const index = cart.value.findIndex((cartItem) => cartItem.id === item.id);

    if (index === -1) return;

    cart.value[index].quantity = cart.value[index].quantity - 1;
  }

  return {
    cart,
    itemsCount,
    addItem,
    removeItem,
    validItems,
    encodedOrderText,
  };
});
