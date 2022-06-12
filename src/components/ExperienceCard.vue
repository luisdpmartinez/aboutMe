<template>
  <q-card class="shadow-10">
    <q-card-section class="q-pb-none">
      <div class="text-h4">
        <q-icon name="work" />
        {{ t('experienceCard.experience') }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="q-px-lg q-pb-md">
        <q-timeline>
          <q-timeline-entry>
            <template v-slot:title> {{ t('experienceCard.title1') }} </template>
            <template v-slot:subtitle>
              {{ `illuxi (1.75 ${t('experienceCard.year')})` }}
            </template>
            <q-list separator>
              <q-item>
                <q-item-section>{{ t('experienceCard.text1') }}</q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>{{ t('experienceCard.text2') }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-timeline-entry>

          <q-timeline-entry>
            <template v-slot:subtitle>
              {{ `Cycle Environnement (1.25 ${t('experienceCard.year')})` }}
            </template>
            <template v-slot:title> {{ t('experienceCard.title2') }} </template>

            <q-list separator>
              <q-item>
                <q-item-section>{{ t('experienceCard.text3') }}</q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>{{ t('experienceCard.text4') }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-timeline-entry>

          <q-timeline-entry>
            <template v-slot:subtitle>
              {{ `Hydro-Québec (1 ${t('experienceCard.year')})` }}
            </template>
            <template v-slot:title> {{ t('experienceCard.title3') }}</template>

            <q-list separator>
              <q-item>
                <q-item-section>{{ t('experienceCard.text4') }}</q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>{{ t('experienceCard.text5') }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
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

<style></style>
