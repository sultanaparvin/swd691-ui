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
                    <table class="table table-bordered testcase-list-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Action</th>
                                <th>Status</th>
                                <th>Current User</th>
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
            initTestcases();
        });
    </script>
<?php 
    require_once('includes/footer.php');
?>