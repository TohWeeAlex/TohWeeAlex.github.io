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
        <h1>LOGIN CREDENTIALS</h1>
        <form action="PHP_02_01.php" method="POST">
            <lable for="username">Username:</lable>
            <br></br>
            <input type="text" name="username" value=""/>
            <br></br>
            <lable for="password">Password:</lable>
            <br></br>
            <input type="password" name="password" value=""/>
            <br></br>
            <input type="submit">
        </form>
        <p>Don't have an account, make one <a id="Shown" href="PHP_01_02.php">here</a>
    </body>

</html>