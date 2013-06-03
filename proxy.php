<?php

  header('Content-type: application/xml');
  $file = file_get_contents($_GET['url']);
  $file = preg_replace('/\s+/',' ', $file); // Replace repeated whitespace with single spaces.
  echo $file;

?>