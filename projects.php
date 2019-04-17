<?php 
    require_once('includes/header.php');
?>
    <div class="row">
        <div class="col col-xs-12">
            <input type="hidden" class="field-project-id" id="field-project-id" value="">        
            <div class="messages-wrap mb-2 w-100"></div>
            <div class="card w-100 view-project-list">
                <div class="card-header">
                    Projects List
                </div>

                <div class="card-body">
                    <span class="btn btn-primary button project-add-button mb-2">Add</span>
                    <table class="table table-bordered project-list-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="card w-100 view-project-addedit">
                <div class="card-header">
                    <span class="addedit-label"></span> Project
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="field-project-name">Name</label>
                        <input type="text" class="form-control field-project-name" id="field-project-name" name="field-project-name">
                    </div>
                    <div class="form-group">
                        <label for="field-project-description">Description</label>
                        <textarea class="form-control field-project-description" id="field-project-description" name="field-project-description"></textarea>
                    </div>
                    <span class="btn btn-primary button project-save-button mt-2 mb-2">Save</span>&nbsp;&nbsp;
                    <span class="btn btn-primary button project-back-button mt-2 mb-2">Back</span>
                </div>
            </div>
            <div class="card w-100 view-project-delete">
                <div class="card-header">
                    Delete Project
                </div>
                <div class="card-body">
                    Are you sure you want to delete this project?<br>
                    <span class="btn btn-primary button project-delete-yes-button mt-2 mb-2">Yes</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="btn btn-primary button project-delete-no-button mt-2 mb-2">No</span>
                </div>
            </div>
        </div>
    </div>
    <script>
        $(document).ready(function(){
            initProject();
        });
    </script>
<?php 
    require_once('includes/footer.php');
?>