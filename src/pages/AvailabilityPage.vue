<template>
  <q-page class="row justify-center q-pa-md" style="width: 100%">
    <q-header elevated class="text-white" style="background: #24292e">
      <q-toolbar class="q-py-sm q-px-md">
        <q-btn
          flat
          :label="t('availability.back')"
          icon="arrow_back"
          @click="router.push('/')"
        />
        <q-space />
        <q-btn flat icon="translate" @click="toggleLocale" />
        <q-btn
          flat
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          @click="$q.dark.toggle()"
        />
      </q-toolbar>
    </q-header>

    <div class="row" style="max-width: 1200px; width: 100%; height: 100%">
      <div class="col-12 q-pb-md text-h4">{{ t('availability.title') }}</div>
      <div class="col-12 q-pb-md">
        <div class="row justify-around">
          <q-btn
            outline
            :label="t('availability.previous')"
            icon="event"
            @click="onPrev"
          />

          <q-btn
            outline
            :label="t('availability.today')"
            icon="event"
            @click="onToday"
          />

          <q-btn
            outline
            :label="t('availability.next')"
            icon="event"
            @click="onNext"
          />
        </div>
      </div>
      <div
        class="col-12"
        style="display: flex; max-width: 1200px; width: 100%; height: 650px"
      >
        <q-calendar-day
          ref="calendar"
          v-model="selectedDate"
          :dark="$q.dark.isActive"
          :locale="locale == 'fr' ? 'fr' : 'en-US'"
          :interval-start="8"
          :interval-count="12"
          view="week"
          :interval-height="100"
          animated
          :disabled-weekdays="[0, 6]"
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-time="onClickTime"
          @click-interval="onClickInterval"
          @click-head-intervals="onClickHeadIntervals"
          @click-head-day="onClickHeadDay"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  QCalendarDay,
  addToDate,
  parseTimestamp,
  today,
} from '@quasar/quasar-ui-qcalendar/src/index.js';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AvailabilityPage',
  components: {
    QCalendarDay,
  },
  setup() {
    const { locale, t } = useI18n({ useScope: 'global' });
    const router = useRouter();
    return {
      t,
      locale,
      router,
      toggleLocale() {
        if (locale.value == 'en') {
          locale.value = 'fr';
        } else {
          locale.value = 'en';
        }
      },
    };
  },
  data() {
    return {
      selectedDate: today(),
      nowDate: addToDate(parseTimestamp(today()), { day: 0 }).date,
    };
  },
  methods: {
    onToday() {
      this.$refs.calendar.moveToToday();
    },
    onPrev() {
      this.$refs.calendar.prev();
    },
    onNext() {
      this.$refs.calendar.next();
    },

    onMoved(data) {
      console.log('onMoved', data);
    },
    onChange(data) {
      console.log('onChange', data);
    },
    onClickDate(data) {
      console.log('onClickDate', data);
    },
    onClickTime(data) {
      console.log('onClickTime', data);
    },
    onClickInterval(data) {
      console.log('onClickInterval', data);
    },
    onClickHeadIntervals(data) {
      console.log('onClickHeadIntervals', data);
    },
    onClickHeadDay(data) {
      console.log('onClickHeadDay', data);
    },
  },
});
</script>

<style></style>
