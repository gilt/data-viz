<template>
  <div id="chart" style="width: 100%;"></div>
</template>

<script>
  /* global google, io */

  let rows = [], // eslint-disable-line prefer-const
    wait = false,
    socket;

  const indexes = {
    'page.view': 1,
    'sales.shown': 2,
    'search.results': 3
  };

  function getTable () {
    const result = new google.visualization.DataTable();

    result.addColumn('datetime', 'Time');
    result.addColumn('number', 'page.view');
    result.addColumn('number', 'sales.shown');
    result.addColumn('number', 'search.results');

    return result;
  }

  function initChart () {
    socket.on('data', (data) => {
      var last = rows.length ? rows[rows.length - 1] : null,
        index = indexes[data.eventName],
        row = last ? last.slice() : [0, 0, 0, 0];

      if (!index) {
        return;
      }

      row[0] = new Date();
      row[index] = parseInt(data.EVENTNAME_COUNT || data.eventNameCount || 0);
      rows.push(row);

      drawChart(rows);
    });
  }

  function drawChart (rows) {
    if (wait) {
      return;
    }

    const table = getTable(),
      chart = new google.visualization.LineChart(document.querySelector('#chart'));

    wait = true;
    rows = rows || [];

    if (rows.length > 50) {
      rows.splice(0, rows.length - 50);
    }

    rows.forEach((v) => {
      table.addRow([
        v[0],
        v[1],
        v[2],
        v[3]
      ]);
    });

    chart.draw(table, {
      title: 'Realtime Gumshoe Event Counts',
      chartArea: { width: '55%' }
    });

    setTimeout(() => { wait = false; }, 1500);
  }

  export default {
    name: 'chart',

    data () {
      return {
        msg: 'chart'
      };
    },

    mounted () {
      socket = io();

      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(initChart);
    }
  };
</script>

<style>
#chart {
  width: 70% !important;
  margin: 0 auto;
}
</style>
