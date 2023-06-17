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
        <h1>New account details</h1>
        <form action="PHP_02.php" method="post">
            <lable for="username">Username:</lable>
            <input type="text" name="username" value=""/>
            <br></br>
            <lable for="password">Password:</lable>
            <input type="password" name="password" value=""/>
            <br></br>
            <input type="submit">
        </form>
        <p>Don't have an account, make one <a id="Shown" href="PHP_01_1.php">here</a>
    </body>

</html>