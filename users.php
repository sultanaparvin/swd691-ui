<?php 
    require_once('includes/header.php');
?>
    <div class="row">
        <div class="col col-xs-12">
            <input type="hidden" class="field-user-id" id="field-user-id" value="">        
            <div class="messages-wrap mb-2 w-100"></div>
            <div class=" w-100 view-user-list">
                <div class="card-header">
                    Users List
                </div>

                <div class="card-body">
                    <span class="btn btn-primary button user-add-button mb-2">Add</span>
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
            <div class="card w-100 view-user-addedit">
                <div class="card-header">
                    <span class="addedit-label"></span> User
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="field-user-name">Name</label>
                        <input type="text" class="form-control field-user-name" id="field-user-name" name="field-user-name">
                    </div>
                    <div class="form-group">
                        <label for="field-user-username">Username</label>
                        <input type="text" class="form-control field-user-username" id="field-user-username" name="field-user-username">
                    </div>
                    <div class="form-group">
                        <label for="field-user-password">Password</label>
                        <input type="password" class="form-control field-user-password" id="field-user-password" name="field-user-password">
                    </div>
                    <div class="form-group">
                        <label for="field-user-email">Email</label>
                        <input type="text" class="form-control field-user-email" id="field-user-email" name="field-user-email">
                    </div>
                    <div class="form-group">
                        <label for="field-user-privilege">Privilege</label>
                        <select class="form-control field-user-privilege" id="field-user-privilege" name="field-user-privilege">
                        </select>
                    </div>
                    <span class="btn btn-primary button user-save-button mt-2 mb-2">Save</span>&nbsp;&nbsp;
                    <span class="btn btn-primary button user-back-button mt-2 mb-2">Back</span>
                </div>
            </div>
            <div class="card w-100 view-user-delete">
                <div class="card-header">
                    Delete User
                </div>
                <div class="card-body">
                    Are you sure you want to delete this user?<br>
                    <span class="btn btn-primary button user-delete-yes-button mt-2 mb-2">Yes</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="btn btn-primary button user-delete-no-button mt-2 mb-2">No</span>
                </div>
            </div>
        </div>
    </div>
    <script>
        $(document).ready(function(){
            initUsers();
        });
    </script>
<?php 
    require_once('includes/footer.php');
?>