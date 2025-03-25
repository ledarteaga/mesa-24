<template>
  <div
    v-if="status === 'preview'"
    class="flex h-full justify-center items-center border-2 border-dashed py-7 rounded-lg transition-all duration-200 pointer-events-auto border-gray-800"
  >
    <div class="flex items-center gap-4 flex-col">
      <NuxtImg :src="getFileUrl()" class="max-h-32" />

      <UButton
        @click="handleDelete"
        label="Eliminar"
        color="error"
        variant="outline"
      />
    </div>
  </div>

  <div
    v-else
    class="flex h-full justify-center items-center border-2 border-dashed py-7 rounded-lg transition-all duration-200 pointer-events-auto"
    :class="{
      'border-gray-100': status === 'idle',
      'border-gray-600': status === 'uploading' || status === 'hovered',
      'border-red-100': status === 'error',
    }"
    @dragenter.prevent="status = 'hovered'"
    @dragover.prevent="status = 'hovered'"
    @dragleave.prevent="status = 'idle'"
    @drop.prevent="handleUpload"
    @click.prevent="fileInput?.click()"
  >
    <div v-if="status === 'uploading'" class="flex items-center gap-2 flex-col">
      <UIcon name="i-material-symbols:upload" class="size-8 animate-bounce" />
      <p class="text-lg font-bold">Subiendo</p>
      <p class="text-sm text-gray-500">Espere por favor...</p>
    </div>

    <div
      v-else-if="status === 'hovered'"
      class="flex items-center gap-2 flex-col justify-center"
    >
      <UIcon name="i-material-symbols:upload" class="size-8 flex-col gap-2" />
      <p class="text-lg font-bold">Suelte el archivo</p>
      <p class="text-sm text-gray-500">para subir...</p>
    </div>

    <div
      v-else-if="status === 'error'"
      class="flex items-center gap-2 flex-col"
    >
      <UIcon name="i-material-symbols:error" class="size-8" />
      <p class="text-lg font-bold">Error al subir</p>
      <p class="text-sm text-gray-500">intente de nuevo...</p>
    </div>

    <div v-else class="flex flex-col items-center gap-2">
      <UIcon name="i-material-symbols:upload" class="size-8" />
      <p class="text-lg font-bold">Arrastre y suelte una imagen</p>
      <p class="text-sm text-gray-500">Tamaño máximo 3MB.</p>
      <p class="text-sm text-gray-500"><slot name="placeholder"></slot></p>
    </div>

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      @change="handleUpload"
      class="hidden"
    />
  </div>
</template>

<script setup lang="ts">
const status = ref<"idle" | "error" | "uploading" | "hovered" | "preview">(
  "idle"
);
const fileInput = ref<HTMLInputElement>();
const client = useSupabaseClient();

interface Props {
  uploadPromise: (file: File) => Promise<boolean>;
  bucketName?: string;
  filePath?: string;
}

const props = defineProps<Props>();

const emits = defineEmits(["delete"]);

const getFileUrl = () => {
  if (!props.bucketName || !props.filePath) {
    return "";
  }

  return client.storage.from(props.bucketName).getPublicUrl(props.filePath).data
    .publicUrl;
};

const handleDelete = async () => {
  if (!props.bucketName || !props.filePath) {
    return;
  }

  const { error } = await client.storage
    .from(props.bucketName)
    .remove([props.filePath]);

  if (error) {
    console.error(error);
  }

  emits("delete");
};

const handleUpload = async (e: DragEvent & Event) => {
  e.preventDefault();
  e.stopPropagation();

  status.value = "uploading";

  try {
    const file = e.dataTransfer?.files?.[0];

    if (!file) {
      throw new Error("");
    }

    const uploaded = await props.uploadPromise(file);

    if (uploaded) {
      status.value = "preview";
    } else {
      throw new Error();
    }
  } catch (e) {
    status.value = "error";
    console.error(e);
  }
};

watch(
  () => props.filePath,
  () => {
    if (props.filePath && props.bucketName) {
      status.value = "preview";
    } else {
      status.value = "idle";
    }
  }
);
</script>
