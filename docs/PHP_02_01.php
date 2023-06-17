<!DOCTYPE html>
<html>

<style>
    <?php
    require 'styles.css'; //imported CSS file for web theme
     ?>
</style>

<title>
    PHP_FUNCTION_TEST
</title>

<head>
    <?php
        require 'NavBar.htm'; //imported Nav bar for ease of changes
    ?>
</head>


<?php
    //function to check for any invalid or malicious input
    function input_tester($input) {
        $input = trim($input); // to remove whitespaces form both ends of the string (e.g spaces,tabs )
        $input = stripslashes($input); // to remove "\"
        $input = stripcslashes($input); // to remove "\"
        $input = htmlspecialchars($input); // to make sure there is cross site scripting (XSS)
        return $input;
    }

    if ($_SERVER["REQUEST_METHOD"] == 'POST') {
        $username = input_tester($_POST['username']); // to bring in the user's username input from the form of the previous page
        $password = input_tester($_POST['password']); // to bring in the user's password input from the form of the previous page

    }
?>

<body id='DarkBG'>
    <p>
        <h1>
            this is the 1st heading ( testing for DB connection )
        </h1>
        <?php
            $servername = "localhost";

            // start connection
            $connect = new mysqli($servername, $username, $password);
            
            //check connection
            if ($connect->connect_error) {
                die("connection failed: " . $connect->connect_error);
            }  
            echo "CONNECTED SUCCESSFULLY";  
        ?>
    </p>


    <p>
        <h1>
            <span id='Shown'>
                this is the 2nd heading ( testing for website layout )
            </span>
        </h1>
    </P>


    <span id='Shown'>
        <?php
        date_default_timezone_set("Asia/Singapore");
        echo "Today is " . date("l") . ", " . date("d/m/Y") . " at " . date("H:i:s");
        ?>
    <span>
</body>

</html>