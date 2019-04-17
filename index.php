<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Testcase Management Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Lato|Montserrat:400,700" rel="stylesheet">
    <link rel="stylesheet" type="text/css" media="screen" href="css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="css/styles.css" />
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/main.js"></script>
</head>
<body>
    <main class="container">
        <div class="card w-100 view-project-list">      
            <div class="messages-wrap mb-2 w-100"></div>
            <div class="card-header">
                Login
            </div>
            <div class="card-body">
                <div class="form-group">
                    <label for="field-login-username">Username</label>
                    <input type="text" class="form-control field-login-username" id="field-login-username" name="field-login-username">
                </div>
                <div class="form-group">
                    <label for="field-login-password">Password</label>
                    <input type="password" class="form-control field-login-password" id="field-login-password" name="field-login-password">
                </div>
                <span class="btn btn-primary button login-button mt-2 mb-2">Login</span>
            </div>
    </main>
    <script>
        $(document).ready(function(){
            initLogin();
        });
    </script>
    <footer>
        <span class="copyright">Copyright 2019 by Sultana Parvin</span>
    </footer>
</body>
</html>