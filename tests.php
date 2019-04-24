<?php 
    require_once('includes/header.php');
?>
    <div class="row">
        <div class="col col-xs-12">
            <input type="hidden" class="field-testcase-id" id="field-testcase-id" value=""> 
            <input type="hidden" class="field-project-id" id="field-project-id" value=""> 
            <div class="messages-wrap mb-2 w-100"></div>
            <div class="card w-100 view-project-list">
                <div class="card-header">
                    Projects List
                </div>

                <div class="card-body">
                    <table class="table table-bordered project-list-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="card w-100 view-testcase-list">
                <div class="card-header">
                    Testcase List
                </div>

                <div class="card-body">
                    <span class="btn btn-primary button testcase-add-button mb-2 permission-link perm-Manager perm-Tester">Add</span>
                    <table class="table table-bordered testcase-list-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Action</th>
                                <th>Status</th>
                                <th>Current User</th>
                                <th>Edit</th>
                                <th class="permission-link perm-Manager perm-Tester">Delete</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="card w-100 view-testcase-addedit">
                <div class="card-header">
                    <span class="addedit-label"></span> Testcase
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="field-testcase-name">Name</label>
                        <input type="text" class="form-control field-testcase-name" id="field-testcase-name" name="field-testcase-name">
                    </div>
                    <div class="form-group">
                        <label for="field-testcase-action">Action</label>
                        <input type="text" class="form-control field-testcase-action" id="field-testcase-action" name="field-testcase-action">
                    </div>
                    <div class="form-group">
                        <label for="field-testcase-expectedResult">Expected Result</label>
                        <textarea type="expectedResult" class="form-control field-testcase-expectedResult" id="field-testcase-expectedResult" name="field-testcase-expectedResult"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="field-testcase-actualResult">Actual Result</label>
                        <textarea type="text" class="form-control field-testcase-actualResult" id="field-testcase-actualResult" name="field-testcase-actualResult"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="field-testcase-status">Status</label>
                        <select class="form-control field-testcase-status" id="field-testcase-status" name="field-testcase-status">
                            <option value="Failed">Failed</option>
                            <option value="Passed">Passed</option>
                            <option value="Waiting on Development">Waiting on Development</option>
                            <option value="Waiting on QA">Waiting on QA</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="field-testcase-comment">Comment</label>
                        <textarea type="text" class="form-control field-testcase-comment" id="field-testcase-comment" name="field-testcase-comment"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="field-testcase-currentUserId">Assign to</label>
                        <select class="form-control field-testcase-currentUserId" id="field-testcase-currentUserId" name="field-testcase-currentUserId">
                        </select>
                    </div>
                    <span class="btn btn-primary button testcase-save-button mt-2 mb-2">Save</span>&nbsp;&nbsp;
                    <span class="btn btn-primary button testcase-back-button mt-2 mb-2">Back</span>
                </div>
            </div>
            <div class="card w-100 view-testcase-delete">
                <div class="card-header">
                    Delete Testcase
                </div>
                <div class="card-body">
                    Are you sure you want to delete this testcase?<br>
                    <span class="btn btn-primary button testcase-delete-yes-button mt-2 mb-2">Yes</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="btn btn-primary button testcase-delete-no-button mt-2 mb-2">No</span>
                </div>
            </div>
        </div>
    </div>
    <script>
        $(document).ready(function(){
            initTestcases();
        });
    </script>
<?php 
    require_once('includes/footer.php');
?>