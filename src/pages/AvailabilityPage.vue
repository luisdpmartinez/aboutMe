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
            :outline="!previousDisabled"
            :flat="previousDisabled"
            :label="t('availability.previous')"
            icon="arrow_back"
            @click="onPrev"
            :disable="previousDisabled"
          />

          <q-btn
            :outline="!previousDisabled"
            :flat="previousDisabled"
            :label="t('availability.today')"
            icon="event"
            @click="onToday"
            :disable="previousDisabled"
          />

          <q-btn
            :label="t('availability.next')"
            icon-right="arrow_forward"
            @click="onNext"
            :outline="!nextDisabled"
            :flat="nextDisabled"
            :disable="nextDisabled"
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
          no-active-date
          :dark="$q.dark.isActive"
          :locale="locale == 'fr' ? 'fr' : 'en-US'"
          :interval-start="8"
          :interval-count="12"
          view="week"
          animated
          :hour24-format="true"
          :weekdays="[1, 2, 3, 4, 5]"
          transition-next="slide-left"
          transition-prev="slide-right"
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-time="onClickTime"
          @click-interval="onClickInterval"
          @click-head-intervals="onClickHeadIntervals"
          @click-head-day="onClickHeadDay"
        >
          <template
            #day-body="{
              scope: { timestamp, timeStartPos, timeDurationHeight },
            }"
          >
            <template
              v-for="event in getEvents(timestamp.date)"
              :key="event.id"
            >
              <div
                v-if="event.time !== undefined"
                class="my-event"
                :class="badgeClasses(event, 'body')"
                :style="
                  badgeStyles(event, 'body', timeStartPos, timeDurationHeight)
                "
              >
                <span class="title q-calendar__ellipsis">
                  {{ event.title }}
                  <!-- <q-tooltip>{{ event.details }}</q-tooltip> -->
                </span>
              </div>
            </template>
          </template>
        </q-calendar-day>
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
  parsed,
  parseTime,
  isBetweenDates,
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
      nowDate: parseTimestamp(today()).date,
      nowDateWeek: {},
    };
  },
  computed: {
    events() {
      return [
        {
          id: 1,
          title: this.t('availability.notAvailable'),
          details: '',
          date: '2022-06-27',
          time: '13:00',
          duration: 60,
          bgcolor: 'red',
        },
        {
          id: 2,
          title: this.t('availability.notAvailable'),
          details: '',
          date: '2022-06-27',
          time: '9:00',
          duration: 60,
          bgcolor: 'red',
        },
        {
          id: 3,
          title: this.t('availability.notAvailable'),
          details: '',
          date: '2022-06-28',
          time: '11:00',
          duration: 60,
          bgcolor: 'red',
        },
        {
          id: 4,
          title: this.t('availability.notAvailable'),
          details: '',
          date: '2022-06-28',
          time: '8:30',
          duration: 90,
          bgcolor: 'red',
        },
        {
          id: 5,
          title: this.t('availability.notAvailable'),
          details: '',
          date: '2022-06-29',
          time: '9:00',
          duration: 60,
          bgcolor: 'red',
        },
        {
          id: 6,
          title: this.t('availability.notAvailable'),
          details: '',
          date: '2022-06-30',
          time: '8:30',
          duration: 90,
          bgcolor: 'red',
        },
        {
          id: 7,
          title: this.t('availability.notAvailable'),
          details: '',
          date: '2022-06-30',
          time: '13:00',
          duration: 120,
          bgcolor: 'red',
        },
        {
          id: 8,
          title: this.t('availability.holiday'),
          details: '',
          date: '2022-07-01',
          time: '8:00',
          duration: 480,
          bgcolor: 'blue',
        },
        {
          id: 9,
          title: this.t('availability.notAvailable'),
          details: '',
          date: '2022-07-04',
          time: '9:00',
          duration: 60,
          bgcolor: 'red',
        },
        {
          id: 10,
          title: this.t('availability.notAvailable'),
          details: '',
          date: '2022-07-05',
          time: '8:30',
          duration: 90,
          bgcolor: 'red',
        },
        {
          id: 11,
          title: this.t('availability.notAvailable'),
          details: '',
          date: '2022-07-06',
          time: '9:00',
          duration: 60,
          bgcolor: 'red',
        },
        {
          id: 12,
          title: this.t('availability.notAvailable'),
          details: '',
          date: '2022-07-07',
          time: '8:30',
          duration: 90,
          bgcolor: 'red',
        },
      ];
    },
    eventsMap() {
      const map = {};
      // this.events.forEach(event => (map[ event.date ] = map[ event.date ] || []).push(event))
      this.events.forEach((event) => {
        if (!map[event.date]) {
          map[event.date] = [];
        }
        map[event.date].push(event);
        if (event.days) {
          let timestamp = parseTimestamp(event.date);
          let days = event.days;
          do {
            timestamp = addToDate(timestamp, { day: 1 });
            if (!map[timestamp.date]) {
              map[timestamp.date] = [];
            }
            map[timestamp.date].push(event);
          } while (--days > 0);
        }
      });
      return map;
    },
    previousDisabled() {
      var date1 = new Date(this.nowDate);
      var date2 = new Date(this.nowDateWeek.start);
      var difference = date1.getTime() - date2.getTime();
      var days = Math.ceil(difference / (1000 * 3600 * 24));
      return days > 0;
    },
    nextDisabled() {
      var date1 = new Date(this.nowDate);
      var date2 = new Date(this.nowDateWeek.start);
      var difference = date1.getTime() - date2.getTime();
      var days = Math.ceil(difference / (1000 * 3600 * 24));
      return days < -7;
    },
  },
  methods: {
    badgeClasses(event, type) {
      const isHeader = type === 'header';
      return {
        [`text-white bg-${event.bgcolor}`]: true,
        'full-width': !isHeader && (!event.side || event.side === 'full'),
        'left-side': !isHeader && event.side === 'left',
        'right-side': !isHeader && event.side === 'right',
        'rounded-border': true,
      };
    },
    badgeStyles(
      event,
      type,
      timeStartPos = undefined,
      timeDurationHeight = undefined
    ) {
      const s = {};
      if (timeStartPos && timeDurationHeight) {
        s.top = timeStartPos(event.time) + 'px';
        s.height = timeDurationHeight(event.duration) + 'px';
      }
      s['align-items'] = 'flex-start';
      return s;
    },
    getEvents(dt) {
      // get all events for the specified date
      const events = this.eventsMap[dt] || [];

      if (events.length === 1) {
        events[0].side = 'full';
      } else if (events.length === 2) {
        // this example does no more than 2 events per day
        // check if the two events overlap and if so, select
        // left or right side alignment to prevent overlap
        const startTime = addToDate(parsed(events[0].date), {
          minute: parseTime(events[0].time),
        });
        const endTime = addToDate(startTime, { minute: events[0].duration });
        const startTime2 = addToDate(parsed(events[1].date), {
          minute: parseTime(events[1].time),
        });
        const endTime2 = addToDate(startTime2, { minute: events[1].duration });
        if (
          isBetweenDates(startTime2, startTime, endTime, true) ||
          isBetweenDates(endTime2, startTime, endTime, true)
        ) {
          events[0].side = 'left';
          events[1].side = 'right';
        } else {
          events[0].side = 'full';
          events[1].side = 'full';
        }
      }

      return events;
    },
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
      this.nowDateWeek = Object.assign({}, data);
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

<style lang="sass" scoped>
.my-event
  position: absolute
  font-size: 12px
  justify-content: center
  margin: 0 1px
  text-overflow: ellipsis
  overflow: hidden
  cursor: pointer

.title
  position: relative
  display: flex
  justify-content: center
  align-items: center
  height: 100%

.text-white
  color: white

.bg-blue
  background: blue

.bg-green
  background: green

.bg-orange
  background: orange

.bg-red
  background: red

.bg-teal
  background: teal

.bg-grey
  background: grey

.bg-purple
  background: purple

.full-width
  left: 0
  width: calc(100% - 2px)

.left-side
  left: 0
  width: calc(50% - 3px)

.right-side
  left: 50%
  width: calc(50% - 3px)

.rounded-border
  border-radius: 2px
</style>
