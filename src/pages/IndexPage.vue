<template>
  <q-page class="row items-center justify-evenly q-pa-lg">
    <div id="page" class="col-12">
      <q-card-section class="text-center">
        <div :class="$q.screen.gt.sm ? 'text-h2' : 'text-h4'">
          Luis Daniel Puente Martinez
        </div>
      </q-card-section>
      <div class="row">
        <div class="col-6 col-sm-6 text-center">
          <q-btn
            icon="mdi-linkedin"
            flat
            rounded
            label="LinkedIn"
            @click="
              openInNewTab(
                'https://www.linkedin.com/in/luis-daniel-puente-martinez/'
              )
            "
          />
        </div>
        <div class="col-6 text-center">
          <q-btn
            icon="mdi-github"
            flat
            rounded
            label="Github"
            @click="openInNewTab('https://github.com/luisdpmartinez/aboutMe')"
          />
        </div>
        <div class="col-12">
          <masonry-wall :items="cards" :ssr-columns="1" :column-width="500">
            <template #default="{ item }">
              <transition appear enter-active-class="animated slideInLeft slow">
                <education-card class="q-ma-lg" v-if="item.id == 'education'" />
              </transition>
              <transition
                appear
                enter-active-class="animated slideInRight slower"
              >
                <experience-card class="q-ma-lg" v-if="item.id == 'experience'"
              /></transition>
              <transition
                appear
                enter-active-class="animated slideInLeft slower"
                ><skills-card class="q-ma-lg" v-if="item.id == 'skills'"
              /></transition>
              <transition appear enter-active-class="animated slideInRight slow"
                ><projects-card class="q-ma-lg" v-if="item.id == 'projects'"
              /></transition>
            </template>
          </masonry-wall>
        </div>
      </div>
      <q-page-sticky position="bottom-right" :offset="fabPos">
        <!-- v-touch-pan.prevent.mouse="moveFab" -->
        <q-fab size="12" icon="settings" direction="up">
          <q-fab-action @click="$q.dark.toggle()">
            <template v-slot:icon>
              <q-icon :name="$q.dark.isActive ? 'light_mode' : 'dark_mode'" />
            </template>
            <template v-slot:label>
              {{ $q.dark.isActive ? t('lightMode') : t('darkMode') }}
            </template>
          </q-fab-action>

          <q-fab-action @click="toggleLocale">
            <template v-slot:icon>
              <q-icon name="translate" />
            </template>
            <template v-slot:label>
              {{ locale == 'en' ? 'Français' : 'English' }}
            </template>
          </q-fab-action>
        </q-fab>
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import EducationCard from 'src/components/EducationCard.vue';
import ExperienceCard from 'src/components/ExperienceCard.vue';
import SkillsCard from 'src/components/SkillsCard.vue';
import ProjectsCard from 'src/components/ProjectsCard.vue';

export default defineComponent({
  components: { EducationCard, ExperienceCard, SkillsCard, ProjectsCard },
  name: 'IndexPage',
  setup() {
    const { locale, t } = useI18n({ useScope: 'global' });
    const cards = ref([
      { id: 'education' },
      { id: 'experience' },
      { id: 'skills' },
      { id: 'projects' },
    ]);
    const fabPos = ref([75, 25]);

    return {
      fabPos,
      cards,
      openInNewTab(url: string) {
        window.open(url, 'blank_');
      },
      toggleLocale() {
        if (locale.value == 'en') {
          locale.value = 'fr';
        } else {
          locale.value = 'en';
        }
      },
      t,
      locale,
    };
  },
});
</script>

<style scoped>
#page {
  max-width: 1200px !important;
}
</style>
