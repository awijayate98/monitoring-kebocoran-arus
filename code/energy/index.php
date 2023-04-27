<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
        <title>Dashboard Energy</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
    <link
      rel="stylesheet"
      href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.datatables.net/1.11.4/css/dataTables.jqueryui.min.css"
    />
    <link rel="stylesheet" href="assets/css/application.min.css" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Heebo:300,400,700" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.4/js/dataTables.jqueryui.min.js"></script>
    <script
      nonce="undefined"
      src="assets/zingchart/zingchart.min.js"
    ></script>
    <script src="https://cdn.zinggrid.com/dev/zinggrid-dev.min.js"></script>
    <style>
      /* Defaults */

      :root {
        --purple: #212135;
        --lightPurple: #2d2d45;
        --yellow: #fcea3c;
        --white: #ffffff;
        --lightGray: #7c7c8e;
        --green: #a5f291;
        --red: #fa7477;
      }

      .zc-body {
        justify-content: center;
        background-color: var(--purple);
        font-family: Poppins;
      }

      /* Main Wrapper */

      .dashboard {
        margin: 0 auto;
        padding-bottom: 1.5rem;
        width: 100%;
        max-width: 95%;
      }

      /* Nav */

      .dashboard-nav {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100px;
      }

      .dashboard-nav a {
        color: var(--lightGray);
        text-align: center;
        font-size: 24px;
        text-decoration: none;
        transition: 0.3s ease-in-out;
      }

      .dashboard-nav a:hover {
        text-align:center;
        color: var(--white);
      }

      .dashboard-nav a + a {
        margin-left: 1rem;
      }

      /* Body */

      .dashboard-body {
        min-height: 575px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;
      }

      /* Panel */

      .dashboard-panel {
        min-height: 250px;
        padding: 1rem;
        grid-column: 1 / -1;
        color: var(--lightGray);
        font-size: 1.125rem;
        background-color: var(--lightPurple);
      }

      .dashboard-panel.nopad {
        padding: 0;
      }

      .dashboard-panel.layout-2of3 {
        grid-column: 1 / -2;
      }

      .dashboard-panel.layout-1of3 {
        grid-column: 3 / -2;
      }

      .dashboard-panel.layout-1of1 {
        grid-column: 1 / -3;
      }

      .dashboard-panel.layout-1of2 {
        grid-column: 2 / -3;
      }

      /* Panel Title */

      .dashboard-intro {
        font-size: 24px;
        color: var(--white);
        font-weight: normal;
      }

      /* Times */

      .panel-times {
        min-height: 300px;
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;
      }

      .dashboard-times {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;
      }

      .dashboard-times div strong {
        display: block;
      }

      .dashboard-times div span {
        color: var(--white);
        font-size: 2rem;
      }

      .dashboard-times div .green {
        color: var(--green);
      }

      .dashboard-times div .red {
        color: var(--red);
      }

      .dashboard-times .dashboard-intro {
        grid-column: 1 / -1;
      }

      .zc-ref {
        display: none;
      }

      #myChart {
        height: 100%;
        width: 100%;
        min-height: 150px;
      }

      .chart--container {
        height: 100%;
        width: 100%;
        min-height: 530px;
      }

      .chart4clas {
        min-height: 530px;
        width: 100%;
        height: 100%;
        background-color: #222222;
      }
    </style>
  </head>

  <body class="zc-body">
    <div class="dashboard">
      <!-- Nav -->
      <nav class="dashboard-nav" >
        <a  href="#">Dashboard Monitoring Energy</a>
      </nav>
      <!-- Dashboard -->
      <div class="dashboard-body">
        <!-- Panel -->
        <div class="dashboard-panel layout-2of3 panel-times">
          <!-- Delivery Times -->
          <div class="dashboard-times">
            <strong class="dashboard-intro">Time Stamp</strong>
            <div>
              <strong>Waktu Update</strong>
              <span class="green" id="dupdate">---</span>
            </div>
            <div>
              <strong>Kwh Listrik</strong>
              <div><span class="blue" id="dkwh">---</span></div>
            </div>
            <div>
              <strong>Volt</strong>
              <div class="green">
                <span class="green" id="dvolt">---</span> Volt
              </div>
            </div>
            <div>
              <strong>Watt</strong>
              <span class="red" id="dwatt">--</span>
            </div>
          </div>
          <!-- Chart 1 -->
          <div id="chart1"></div>
        </div>
        <!-- Panel -->
        <div class="dashboard-panel layout-1of3 nopad">
          <div id="chart2"></div>
        </div>
        <!-- Panel -->
        <div class="dashboard-panel nopad">
          <div id="chart3" class="chart--container"></div>
        </div>
        <!-- Panel Gauge 1-->
        <div class="dashboard-panel layout-1of1 nopad">
          <div id="chart4">
          </div>
        </div>
        <!-- Panel -->
        <div class="dashboard-panel layout-1of2 nopad">
          <div id="chart5"></div>
        </div>
        <!-- Panel -->
        <div class="dashboard-panel layout-1of3 nopad">
          <div id="chart6"></div>
        </div>
        <!-- Panel Tabel -->
        <div class="dashboard-panel nopad">
        <zing-grid
          page-size=11
		      pager
          sort
          caption="UPDATE DATA"
		      role="grid" 
          viewport="tablet-portrait"
          pager-type="button-arrow">
          <zg-data >
          <!-- loadByScroll enables infinite scrolling -->
         	<zg-param name="loadByScroll" value="true"></zg-param>
        	<zg-param name="sortBy" value='"director"'></zg-param>
       </zg-data>
	      </zing-grid>
        </div>
      </div>
    </div>
    <script src="assets/js/chart.min.js"></script>
    <script src="assets/js/bs-init.js"></script>
    <script src="assets/js/upalldata.js"></script>
    <script src="assets/js/table.min.js"></script>
    <script>
      $.getJSON("config/upall.php",
      function(result2) {
        document.querySelector('zg-data').data = result2;
        window.onload = function() { document.querySelector('zing-grid').data = result2;};
      });
      
    </script>
  </body>
</html>
