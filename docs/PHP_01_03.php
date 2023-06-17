<?php

$fname = $lname = $username = $gender = $password = '';

$userInfo = array("first name" => $_POST['fname'], "Last name" => $_POST['lname'], "Username" => $_POST['username']);

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    }
?>

<!DOCTYPE html>
<html>

    <style>
        <?php
        require 'styles.css'; 
        ?>
    </style>
 
    <title>PHP_LANDING_PAGE</title>

    <head>
        <?php
            require 'NavBar.htm';
        ?>
    </head>


    <body id="DarkBG">
        <?php
            echo var_export($userInfo)
        ?>
    </body>

</html>