<?php 
    require_once('includes/header.php');
?>
    <div class="row view-user-list">
        <div class="col-xs-12">
            <div class="card">
                <div class="card-header">
                    Users List
                </div>

                <div class="card-body">
                    <div class="messages-wrap"></div>
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
        </div>
    </div>
    <div class="row view-user-addedit">
        <div class="col-xs-12">
            <div class="card">
                <div class="card-header">
                    Users Add
                </div>
                <div class="card-body">
                    <input type="hidden" class="user-id" id="user-id" value="">
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
                    <span class="btn btn-primary button user-save-button mt-2 mb-2">Save</span>
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