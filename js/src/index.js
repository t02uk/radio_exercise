"use strict";

const Vue = require('vue');
const store = require('store');
const moment = require('moment');
const _ = require('lodash')
import Player from './player';

(function() {
  const StampBook = new Vue({
    el: '#app',
    created: function() {
      stampedDate: store.get('stampedDate') || [];
      bofMonth: moment().startOf('month');
      today; moment();
    },
    computed: {
      yearMonth: function() {
        return this.bofMonth.format('YYYY/MM');
      },
      dateXY: function() {
        const startDay = this.bofMonth.clone().startOf('week');
        const endDay = startDay.clone().day(7 * 5);

        const days = [];
        for (var day = startDay.clone(); day.diff(endDay) < 0; day = day.clone().add(1, 'days')) {
          days.push({
            hasStamp: _.find(this.stampedDate, (x) => x === day.format('YYYY-MM-DD')) != null,
            date: day.date(),
            isCurrentDate: day.month() === this.bofMonth.month(),
            isToday: day.format('YYYY/MM/DD') === this.today.format('YYYY/MM/DD'),
          })
        }

        return _.chunk(days, 7);
      },
    },
    methods: {
      moveMonth: function(offset) {
        this.bofMonth = this.bofMonth.clone().add(offset, 'month');
        console.info(this.bofMonth);
      },
      pushStamp: function(date) {
        const jsonedDate = date.format('YYYY-MM-DD');
        if (!_.includes(this.stampedDate, jsonedDate)) {
          this.stampedDate.push(jsonedDate);
        }
        this.__flush();
      },
      eraseStamp: function(date) {
        const jsonedDate = date.format('YYYY-MM-DD');
        this.stampedDate = this.stampedDate.filter((x) => x !== jsonedDate);
        this.__flush();
      },
      __flush: function() {
        store.set('stampedDate', this.stampedDate);
      },
    }
  })


  const player = new Player(document.getElementById('player'), function() {
    const today = moment();
    StampBook.pushStamp(today);
  });
  player.inject();

})();