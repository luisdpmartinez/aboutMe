<template>
  <q-card class="shadow-10">
    <q-card-section class="q-pb-none">
      <div class="text-h4">
        <q-icon name="school" />
        {{ t('educationCard.education') }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="q-px-lg q-pb-md">
        <q-timeline>
          <q-timeline-entry>
            <template v-slot:title>
              {{ t('educationCard.title1') }}
            </template>
            <template v-slot:subtitle> 2020, UQAM </template>

            <div>{{ t('educationCard.text1') }}</div>
          </q-timeline-entry>

          <q-timeline-entry>
            <template v-slot:subtitle> 2018, UQAM </template>
            <template v-slot:title>
              {{ t('educationCard.title2') }}
            </template>

            <div>{{ t('educationCard.text2') }}</div>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    return {
      t,
    };
  },
});
</script>

<style></style>
