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
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EducationCard from 'src/components/EducationCard.vue';
import ExperienceCard from 'src/components/ExperienceCard.vue';
import SkillsCard from 'src/components/SkillsCard.vue';
import ProjectsCard from 'src/components/ProjectsCard.vue';

export default defineComponent({
  components: { EducationCard, ExperienceCard, SkillsCard, ProjectsCard },
  name: 'IndexPage',
  setup() {
    const cards = ref([
      { id: 'education' },
      { id: 'experience' },
      { id: 'skills' },
      { id: 'projects' },
    ]);

    return {
      cards,
      openInNewTab(url) {
        window.open(url, 'blank_');
      },
    };
  },
});
</script>

<style scoped>
#page {
  max-width: 1200px !important;
}
</style>
