<?php
require "libs/rb.php";

R::setup('mysql:host=localhost;dbname=fmp_db', 'root', '');

if( !R::testConnection() ) {
    exit('Нет доступа к БД!');
}

// READ
$trs = R::findAll('transactions');
foreach ($trs as $tr){
    $res = $res.$tr.',';
}
$res = substr($res, 0, -1);
echo '['.$res.']';

// CREATE
$addInput = $_REQUEST["addInput"];
$addOption = $_REQUEST["addOption"];

if ($addInput != '') {
    $transactions = R::dispense('transactions');
    $transactions->amount = $addInput;
    $transactions->type = $addOption;

    R::store( $transactions );
}
