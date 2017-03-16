<?php

header('Content-type: text/calendar; charset=utf-8');
header('Content-Disposition: attachment; filename=schedule.ics');

echo $_POST['data'];
?>