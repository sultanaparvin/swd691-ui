<?php 
    require_once('includes/header.php');
?>
    <div class="row user-list">
        <div class="col-xs-12">
            <div class="card">
                <div class="card-header">
                    Users List
                </div>
                <div class="card-body">
                    <table class="table table-bordered user-list-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Privilege</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <script>
        $(document).ready(function(){
            loadUsersList();
        });
    </script>
<?php 
    require_once('includes/footer.php');
?>