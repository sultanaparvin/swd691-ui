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
    <script>
        $(document).ready(function(){
            applyPermissions();
        });
    </script>
</head>
<body>
    <header>
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <ul class="nav main-nav">
                        <li class="nav-item"><a class="nav-link" href="projects.php">Project Management</a></li>
                        <li class="nav-item"><a class="nav-link" href="tests.php">Testcase Management</a></li>
                        <li class="nav-item"><a class="nav-link" href="users.php">User Management</a></li>
                        <li class="nav-item"><a class="nav-link" href="logout.php">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
    <main class="container">