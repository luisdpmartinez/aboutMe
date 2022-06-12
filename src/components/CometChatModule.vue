<template>
  <q-page style="height: 100%" id="callScreen">
    <q-footer
      flat
      :class="$q.dark.isActive ? 'bg-black text-light' : 'bg-white text-black'"
    >
      <div :class="`q-pa-md row justify-center`">
        <q-btn-dropdown split rounded :icon="'videocam'" class="q-mx-sm">
        </q-btn-dropdown>
        <q-btn-dropdown split rounded :icon="'mic'" class="q-mx-sm">
        </q-btn-dropdown>
        <q-btn
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          rounded
          class="q-mx-sm"
        >
        </q-btn>
        <q-btn flat icon="call_end" color="red" @click="router.push('/')" />
      </div> </q-footer
  ></q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CometChat',
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
});
</script>
