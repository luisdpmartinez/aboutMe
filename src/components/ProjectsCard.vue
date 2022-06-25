<template>
  <q-card class="shadow-10">
    <q-card-section class="q-pb-none">
      <div class="text-h4">
        <q-icon name="construction" />
        {{ t('projectsCard.projects') }}
      </div>
    </q-card-section>
    <q-card-section>
      <q-list>
        <q-item>
          <q-btn
            outline
            :label="t('projectsCard.videoCallApp')"
            icon="videocam"
            @click="router.push('/video-call')"
          />
        </q-item>
        <q-item>
          <q-btn
            outline
            :label="t('projectsCard.availabilityApp')"
            icon="event"
            @click="router.push('/availability')"
          />
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const router = useRouter();
    return {
      t,
      router,
    };
  },
});
</script>

<style></style>
