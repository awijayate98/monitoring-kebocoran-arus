<!DOCTYPE HTML>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        .kotak{background: black;padding:10px;width: 300px; text-align: center}
        h1{color:white;}
        #demo{color:red; border:1px solid red;border-radius: 10px; display: inline; padding: 5px;}  
    </style>
    <title>Cara Membuat Timer Menggunakan Javascript</title>
</head>
<body>
    <div class="kotak">
        <h1>TIMER</h1>
        <h1 id="demo"></h1>
    </div>
    <script>
    $.getJSON("config/tes.php",
      function(result_timer) {
        counter= result_timer;
        console.log(result_timer);
        document.getElementById("demo").innerHTML = result_timer;
      });
    </script>
</body>
</html>