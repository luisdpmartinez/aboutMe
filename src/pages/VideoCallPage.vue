<template>
  <q-page>
    <q-card :style="`height: ${height - 68}px`" flat>
      <comet-chat-module />
    </q-card>
  </q-page>
</template>

<script lang="ts">
import CometChatModule from 'src/components/CometChatModule.vue';
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'VideoCallPage',
  components: { CometChatModule },
  setup() {
    const height = ref(0);

    function onResize() {
      height.value = window.innerHeight;
    }
    onMounted(() => {
      height.value = window.innerHeight;
      window.addEventListener('resize', onResize);
    });
    return {
      height,
    };
  },
});
</script>
