<template>
  <q-card class="shadow-10">
    <q-card-section class="q-pb-none">
      <div class="text-h4">
        <q-icon name="terminal" />
        {{ t('skillsCard.skills') }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="q-px-lg q-pb-md">
        <q-timeline>
          <q-timeline-entry icon="toggle_on" color="green">
            <template v-slot:title> Front-end </template>

            <div>Vuejs, Vuex, AJAX, Javascript, HTML, CSS</div>
          </q-timeline-entry>

          <q-timeline-entry icon="storage" color="red">
            <template v-slot:title>Back-end </template>

            <div>Ruby on Rails, SQL, REST API, MVC, JWT, Firebase, AWS</div>
          </q-timeline-entry>

          <q-timeline-entry color="black" icon="terminal">
            <template v-slot:title>
              {{ t('skillsCard.environments') }}
            </template>

            <div>Heroku, Docker, SSH, Linux (CentOS)</div>
          </q-timeline-entry>
          <q-timeline-entry color="blue" icon="code">
            <template v-slot:title> {{ t('skillsCard.other') }} </template>

            <div>Java, Python, C++, C#, VBA</div>
          </q-timeline-entry>
          <q-timeline-entry color="orange" icon="build">
            <template v-slot:title> {{ t('skillsCard.tools') }} </template>

            <div>Git, VisualStudioCode, Access</div>
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
