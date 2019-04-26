//Local Endpoint
//var endpoint = 'http://localhost/swd691-service-layers/';
//Production Endpoint
var endpoint = 'http://www.testcase.website/api/';

var currentLoggedInUser = '';
/************************************************************************LOGIN/LOGOUT */
//Init login/logout functionalities
function initLogin(){
    $(document).on('click','.login-button',function(){
        var username = $('.field-login-username').val();
        var password = $('.field-login-password').val();
        var data= {
            'action': 'login',
            'username' : username,
            'password' : password,
        };
        $.ajax({
            url : endpoint,
            method: 'POST',
            data: data
        }).done(function(response){
            if(response != undefined){
                response = JSON.parse(response);
                if(response.success == true){
                    redirect('dashboard.php');
                }else{
                    ShowMessages(response.message, 'fail');
                }
            }
        });
    });
}

function initLogout(){
    $.ajax({
        url : endpoint,
        method: 'GET',
        data: {
            'action':'logout'
        }
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                redirect('');
            }else{
                ShowMessages(response.message, 'fail');
            }
        }
    });
}
/************************************************************************USERS */
//Init all the user functionalities and call various functions
function initUsers(){
    userLoadList();
    userLoadPrivileges();
    $(document).on('click','.user-add-button',function(){
        $('.addedit-label').html('Add');
        $('.view-user-list').slideUp();
        $('.view-user-addedit').slideDown();
    });
    $(document).on('click','.user-edit-button',function(){
        $('.addedit-label').html('Edit');
        //Get the item id 
        var id = $(this).parents('tr').data('id');
        userPopulateEditFormById(id);
        $('.field-user-id').val(id);
        $('.view-user-list').slideUp();
        $('.view-user-addedit').slideDown();
    });
    $(document).on('click','.user-delete-button',function(){
        //Get the item id 
        var id = $(this).parents('tr').data('id');
        $('.field-user-id').val(id);
        $('.view-user-list').slideUp();
        $('.view-user-delete').slideDown();
    });
    $(document).on('click','.user-save-button',function(){ 
        //This function is being used both for add & edit
        userSaveAddEditForm();
    });
    $(document).on('click','.user-back-button',function(){
        userResetForm();
        $('.view-user-addedit').slideUp();
        $('.view-user-list').slideDown();
    });
    $(document).on('click','.user-delete-yes-button',function(){
        var id = $('.field-user-id').val();
        userDelete(id);
    });
    $(document).on('click','.user-delete-no-button',function(){
        userResetForm();
        $('.view-user-delete').slideUp();
        $('.view-user-list').slideDown();
    });
}

//gets the user list and load the user table
function userLoadList(){
    $.ajax({
        url : endpoint+'?action=users&subaction=getall',
        method: 'GET'
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                $('.user-list-table tbody').html('');
                for(var i=0; i< response.items.length; i++){
                    var item = response.items[i];
                    var id = item.id;
                    var name = item.name;
                    var username = item.username;
                    var email = item.email;
                    var privilege = item.privilege;
                    var row = '<tr data-id="'+id+'"><td>'+id+'</td><td>'+name+'</td><td>'+username+'</td><td>'+email+'</td><td>'+privilege+'</td><td><span class="btn btn-primary button user-edit-button">Edit</span></td><td><span class="btn btn-primary button user-delete-button">Delete</span></td></tr>';
                    $('.user-list-table tbody').append(row);
                }
            }
        }
    })
}

//Get the user privileges and populate the privilege dropdown
function userLoadPrivileges(){
    $.ajax({
        url : endpoint+'?action=users&subaction=getAllPrivileges',
        method: 'GET'
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                for(var i=0; i< response.items.length; i++){
                    var item = response.items[i];
                    //console.log(item);
                    $('.field-user-privilege').append('<option value="'+item+'">'+item+'</option>');
                }
            }
        }
    });
}

//Handle user form save
function userSaveAddEditForm(){
    var action = 'users';
    var id = $('.field-user-id').val();
    var name = $('.field-user-name').val();
    var username = $('.field-user-username').val();
    var password = $('.field-user-password').val();
    var email = $('.field-user-email').val();
    var privilege = $('.field-user-privilege').children('option:selected').val();
    if(id != '' && id!=undefined && id!=null){
        var subaction = 'edit';
    }else{
        var subaction = 'add';
    }
    // console.log(id);
    // console.log(subaction);
    var data= {
        'action': action,
        'subaction' : subaction,
        'id' : id,
        'name' : name,
        'username': username,
        'password': password,
        'email': email,
        'privilege': privilege
    };
    // console.log(data);
    //Save the data
    $.ajax({
        url : endpoint,
        method: 'POST',
        data: {
            'action': action,
            'subaction' : subaction,
            'id' : id,
            'name' : name,
            'username': username,
            'password': password,
            'email': email,
            'privilege': privilege
        }
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                var messages = [response.message];
                ShowMessages(messages, 'success');
                userResetForm();
                userLoadList();
                $('.view-user-addedit').slideUp();
                $('.view-user-list').slideDown();
            }else{
                ShowMessages(response.message, 'fail');
            }
        }
    });
}

//populate the user edit form
function userPopulateEditFormById(id){
    $.ajax({
        url : endpoint+'?action=users&subaction=getbyid&id='+id,
        method: 'GET'
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                $('.field-user-name').val(response.item.name);
                $('.field-user-username').val(response.item.username);
                $('.field-user-password').val('');
                $('.field-user-email').val(response.item.email);
                $('.field-user-privilege').val(response.item.privilege);
            }
        }
    })
}

//Delete user by id
function userDelete(id){
    $.ajax({
        url : endpoint,
        method: 'POST',
        data: {
            'action': 'users',
            'subaction' : 'delete',
            'id' : id,
        }
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                var messages = [response.message];
                ShowMessages(messages, 'success');
                userResetForm();
                userLoadList();
            }else{
                ShowMessages(response.message, 'fail');
            }
        }
    });
    $('.view-user-delete').slideUp();
    $('.view-user-list').slideDown();
}

//Reset user form field values
function userResetForm(){
    $('.field-user-id').val('');
    $('.field-user-name').val('');
    $('.field-user-username').val('');
    $('.field-user-password').val('');
    $('.field-user-email').val('');
}

/************************************************************************PROJECTS */
//Init all the project functionalities and call various functions
function initProject(){
    projectLoadList();
    $(document).on('click','.project-add-button',function(){
        $('.addedit-label').html('Add');
        $('.view-project-list').slideUp();
        $('.view-project-addedit').slideDown();
    });
    $(document).on('click','.project-edit-button',function(){
        $('.addedit-label').html('Edit');
        //Get the item id 
        var id = $(this).parents('tr').data('id');
        projectPopulateEditFormById(id);
        $('.field-project-id').val(id);
        $('.view-project-list').slideUp();
        $('.view-project-addedit').slideDown();
    });
    $(document).on('click','.project-delete-button',function(){
        //Get the item id 
        var id = $(this).parents('tr').data('id');
        $('.field-project-id').val(id);
        $('.view-project-list').slideUp();
        $('.view-project-delete').slideDown();
    });
    $(document).on('click','.project-save-button',function(){ 
        //This function is being used both for add & edit
        projectSaveAddEditForm();
    });
    $(document).on('click','.project-back-button',function(){
        projectResetForm();
        $('.view-project-addedit').slideUp();
        $('.view-project-list').slideDown();
    });
    $(document).on('click','.project-delete-yes-button',function(){
        var id = $('.field-project-id').val();
        projectDelete(id);
    });
    $(document).on('click','.project-delete-no-button',function(){
        projectResetForm();
        $('.view-project-delete').slideUp();
        $('.view-project-list').slideDown();
    });
}

//gets the projects list and load the projects table
function projectLoadList(){
    $.ajax({
        url : endpoint+'?action=projects&subaction=getall',
        method: 'GET'
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                $('.project-list-table tbody').html('');
                for(var i=0; i< response.items.length; i++){
                    var item = response.items[i];
                    var id = item.id;
                    var name = item.name;
                    var description = item.description;
                    var row = '<tr data-id="'+id+'"><td>'+id+'</td><td>'+name+'</td><td>'+description+'</td><td><span class="btn btn-primary button project-edit-button">Edit</span></td><td><span class="btn btn-primary button project-delete-button">Delete</span></td></tr>';
                    $('.project-list-table tbody').append(row);
                }
            }
        }
    })
}

//populate the project edit form
function projectPopulateEditFormById(id){
    $.ajax({
        url : endpoint+'?action=projects&subaction=getbyid&id='+id,
        method: 'GET'
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                $('.field-project-name').val(response.item.name);
                $('.field-project-description').val(response.item.description);
            }
        }
    })
}

//Handle project form save
function projectSaveAddEditForm(){
    var action = 'projects';
    var id = $('.field-project-id').val();
    var name = $('.field-project-name').val();
    var description = $('.field-project-description').val();
    if(id != '' && id!=undefined && id!=null){
        var subaction = 'edit';
    }else{
        var subaction = 'add';
    }
    var data= {
        'action': action,
        'subaction' : subaction,
        'id' : id,
        'name' : name,
        'description': description
    };
    //Save the data
    $.ajax({
        url : endpoint,
        method: 'POST',
        data: {
            'action': action,
            'subaction' : subaction,
            'id' : id,
            'name' : name,
            'description': description,
        }
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                var messages = [response.message];
                ShowMessages(messages, 'success');
                projectResetForm();
                projectLoadList();
                $('.view-project-addedit').slideUp();
                $('.view-project-list').slideDown();
            }else{
                ShowMessages(response.message, 'fail');
            }
        }
    });
}

//reset the value of all form fields on project form
function projectResetForm(){
    $('.field-project-id').val('');
    $('.field-project-name').val('');
    $('.field-project-description').val('');
}

//delete project by id
function projectDelete(id){
    $.ajax({
        url : endpoint,
        method: 'POST',
        data: {
            'action': 'projects',
            'subaction' : 'delete',
            'id' : id,
        }
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                var messages = [response.message];
                ShowMessages(messages, 'success');
                projectResetForm();
                projectLoadList();
            }else{
                ShowMessages(response.message, 'fail');
            }
        }
    });
    $('.view-project-delete').slideUp();
    $('.view-project-list').slideDown()
}

/************************************************************************TESTCASES */
//Init all the testcase functionalities and call various functions
function initTestcases(){
    testcasePopulateUserList();
    testcaseProjectList();
    
    $(document).on('click','.testcase-project-view-button',function(){
        var id = $(this).parents('tr').data('id');
        testcasePopulateTestcaseList(id);
        $('.view-project-list').slideUp();
        $('.view-testcase-list').slideDown();
    });
    $(document).on('click','.testcase-add-button',function(){
        $('.addedit-label').html('Add');
        $('.view-testcase-list').slideUp();
        $('.view-testcase-addedit').slideDown();
    });
    $(document).on('click','.testcase-edit-button',function(){
        $('.addedit-label').html('Edit');
        //Get the item id 
        var id = $(this).parents('tr').data('id');
        testcasePopulateEditFormById(id);
        testcaseShowCommentsByTestcaseId(id);
        $('.field-testcase-id').val(id);
        $('.view-testcase-list').slideUp();
        $('.view-testcase-addedit').slideDown();
    });
    
    $(document).on('click','.testcase-save-button',function(){ 
        //This function is being used both for add & edit
        testcaseSaveAddEditForm();
    });
    $(document).on('click','.testcase-back-button',function(){
        testcaseResetForm();
        $('.view-testcase-addedit').slideUp();
        $('.view-testcase-list').slideDown();
        $('.view-testcase-comments').fadeOut();
    });
    
    $(document).on('click','.testcase-delete-button',function(){
        //Get the item id 
        var id = $(this).parents('tr').data('id');
        $('.field-testcase-id').val(id);
        $('.view-testcase-list').slideUp();
        $('.view-testcase-delete').slideDown();
    });
    $(document).on('click','.testcase-delete-yes-button',function(){
        var id = $('.field-testcase-id').val();
        testcaseDelete(id);
    });
    $(document).on('click','.testcase-delete-no-button',function(){
        testcaseResetForm();
        $('.view-testcase-delete').slideUp();
        $('.view-testcase-list').slideDown();
    });
}

//Populate testcase project list view
function testcaseProjectList(){
    $.ajax({
        url : endpoint+'?action=projects&subaction=getall',
        method: 'GET'
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                $('.project-list-table tbody').html('');
                for(var i=0; i< response.items.length; i++){
                    var item = response.items[i];
                    var id = item.id;
                    var name = item.name;
                    var description = item.description;
                    var row = '<tr data-id="'+id+'"><td>'+id+'</td><td>'+name+'</td><td>'+description+'</td><td><span class="btn btn-primary button testcase-project-view-button">View</span></td></tr>';
                    $('.project-list-table tbody').append(row);
                }
            }
        }
    })
}

//Populate users listbox
function testcasePopulateUserList(){
    $.ajax({
        url : endpoint+'?action=users&subaction=getall',
        method: 'GET'
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                $('.field-testcase-currentUserId').html('');
                for(var i=0; i< response.items.length; i++){
                    var item = response.items[i];
                    $('.field-testcase-currentUserId').append('<option value="'+item.id+'">'+item.name+' ('+item.privilege+')</option>');
                }
            }
        }
    })
}

//Populate testcase list view by provided project ID
function testcasePopulateTestcaseList(projectId){
    $('.field-project-id').val(projectId);
    $.ajax({
        url : endpoint+'?action=testcases&subaction=getallbyprojectid&id='+projectId,
        method: 'GET'
    }).done(function(response){
        // console.log(response);
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                $('.testcase-list-table tbody').html('');
                for(var i=0; i< response.items.length; i++){
                    var item = response.items[i];
                    var id = item.id;
                    var name = item.name;
                    var action = item.action;
                    var status = item.status;
                    var currentUserId = item.currentUserId;
                    testcaseUpdateCurrentUserCell(currentUserId);
                    if(currentLoggedInUser.privilege == 'Developer'){
                        var hideForDeveloper = 'hidden';
                    }else{
                        var hideForDeveloper = '';
                    }
                    var row = '<tr data-id="'+id+'"><td>'+id+'</td><td>'+name+'</td><td>'+action+'</td><td>'+status+'</td><td class="current-user-cell" data-current-user-id="'+currentUserId+'">'+currentUserId+'</td><td><span class="btn btn-primary button testcase-edit-button">Edit</span></td><td class="'+hideForDeveloper+'"><span class="btn btn-primary button testcase-delete-button">Delete</span></td></tr>';
                    $('.testcase-list-table tbody').append(row);
                }
            }
        }
    })
}

//Updates the value of current user cell and replace the current user ID with the curren user name
function testcaseUpdateCurrentUserCell(userId){
    $.ajax({
        url : endpoint+'?action=users&subaction=getbyid&id='+userId,
        method: 'GET'
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                var label = response.item.username +' ('+response.item.email+')';
                $('.current-user-cell').each(function(){
                    if($(this).data('current-user-id')==userId){
                        $(this).html(label);
                    }
                })
            }
        }
    });
}

//Populates testcase edit form
function testcasePopulateEditFormById(id){
    if(currentLoggedInUser.privilege == 'Developer'){
        $('.field-testcase-name').attr('disabled',true);
        $('.field-testcase-action').attr('disabled',true);
        $('.field-testcase-expectedResult').attr('disabled',true);
        $('.field-testcase-actualResult').attr('disabled',true);
    }
    $.ajax({
        url : endpoint+'?action=testcases&subaction=getbyid&id='+id,
        method: 'GET'
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                $('.field-testcase-id').val(response.item.id);
                $('.field-testcase-name').val(response.item.name);
                $('.field-testcase-action').val(response.item.action);
                $('.field-testcase-expectedResult').val(response.item.expectedResult);
                $('.field-testcase-actualResult').val(response.item.actualResult);
                $('.field-testcase-status').val(response.item.status);
                $('.field-testcase-currentUserId').val(response.item.currentUserId);
            }
        }
    })
}

//reset the value of all form fields on testcase form
function testcaseResetForm(){
    $('.field-testcase-id').val('');
    $('.field-testcase-name').val('');
    $('.field-testcase-action').val('');
    $('.field-testcase-expectedResult').val('');
    $('.field-testcase-actualResult').val('');
    $('.field-testcase-status').val('');
    $('.field-testcase-comment').val('');
}

//Handle testcase form save
function testcaseSaveAddEditForm(){
    var action = 'testcases';
    var id = $('.field-testcase-id').val();
    var name = $('.field-testcase-name').val();
    var actionname = $('.field-testcase-action').val();
    var expectedResult = $('.field-testcase-expectedResult').val();
    var actualResult = $('.field-testcase-actualResult').val();
    var status = $('.field-testcase-status').val();
    var currentUserId = $('.field-testcase-currentUserId').val();
    var projectId = $('.field-project-id').val();
    var comment = $('.field-testcase-comment').val();
    if(id != '' && id!=undefined && id!=null){
        var subaction = 'edit';
    }else{
        var subaction = 'add';
    }
    //Save the data
    $.ajax({
        url : endpoint,
        method: 'POST',
        data: {
            'action': action,
            'subaction' : subaction,
            'id' : id,
            'name' : name,
            'actionname': actionname,
            'expectedResult': expectedResult,
            'actualResult': actualResult,
            'status': status,
            'currentUserId': currentUserId,
            'projectId': projectId,
        }
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                if(action === 'add'){
                    var testCaseId = response.id;
                }else{
                    var testCaseId = id;
                }
                addComment(testCaseId,currentLoggedInUser.id,comment);
                var messages = [response.message];
                ShowMessages(messages, 'success');
                testcaseResetForm();
                testcasePopulateTestcaseList(projectId);
                $('.view-testcase-addedit').slideUp();
                $('.view-testcase-comments').fadeOut();
                $('.view-testcase-list').slideDown();
            }else{
                ShowMessages(response.message, 'fail');
            }
        }
    });
}

//Add new comments
function addComment(testCaseId , currentLoggedInUserId, comment){
    $.ajax({
        url : endpoint,
        method: 'POST',
        data: {
            'action': 'comments',
            'subaction' : 'add',
            'userId' : currentLoggedInUserId,
            'comment' : comment,
            'testcaseId': testCaseId,
        }
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
            }else{
                ShowMessages(response.message, 'fail');
            }
        }
    });
}

//delete testcase by id
function testcaseDelete(id){
    $.ajax({
        url : endpoint,
        method: 'POST',
        data: {
            'action': 'testcases',
            'subaction' : 'delete',
            'id' : id,
        }
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                var projectId = $('.field-project-id').val();
                var messages = [response.message];
                ShowMessages(messages, 'success');
                testcaseResetForm();
                testcasePopulateTestcaseList(projectId);
            }else{
                ShowMessages(response.message, 'fail');
            }
        }
    });
    $('.view-testcase-delete').slideUp();
    $('.view-testcase-list').slideDown()
}

//Show all comments by testcase id
function testcaseShowCommentsByTestcaseId(testcaseId){
    $.ajax({
        url : endpoint+'?action=comments&subaction=getallbytestcaseid&id='+testcaseId,
        method: 'GET'
    }).done(function(response){
        // console.log(response);
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                $('.comments-list').html('');
                for(var i=0; i< response.items.length; i++){
                    var item = response.items[i];
                    var userId = item.userId;
                    var comment = item.comment;
                    var date = item.date;
                    testcaseCommentUpdateCurrentUserCell(userId);
                    var commentElement = '<div class="comment"><div class="comment-user-cell" data-comment-user-id="'+userId+'">'+userId+'</div><div class="comment-date">'+date+'</div><div class="comment-text">'+comment+'</div>';
                    $('.comments-list').append(commentElement);
                }
            }
        }
    })
    $('.view-testcase-comments').fadeIn();
}

//Updates the value of current user cell and replace the current user ID with the current user name for comments
function testcaseCommentUpdateCurrentUserCell(userId){
    $.ajax({
        url : endpoint+'?action=users&subaction=getbyid&id='+userId,
        method: 'GET'
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                var label = response.item.name ;
                $('.comment-user-cell').each(function(){
                    if($(this).data('comment-user-id')==userId){
                        var name = response.item.name;
                        var initial = response.item.name.substring(0,1);
                        var out = '<div class="comment-author-initial">'+initial+'</div><div class="comment-author-name">'+name+'</div>';
                        $(this).html(out);
                    }
                })
            }
        }
    });
}

/************************************************************************GLOBAL */
//Show success and fail messages
function ShowMessages(messages, type){
    if(type=='success'){
        var className ='alert alert-success';
    }else{
        var className ='alert alert-danger';
    }
    var output = '';
    for(var i =0; i<messages.length; i++){
        output += messages[i]+'<br>';
    }
    $('.messages-wrap').html('');
    $('.messages-wrap').html('<div class="w-100 '+className+'">'+output+'</div>');
    var messageTimer = setTimeout(function(){ 
        $('.messages-wrap').html('');
        clearTimeout(messageTimer);
    }, 4000);
    
}

//Redirect the user to a new page
function redirect(destination){
    var origin = window.location.origin; //Domain
    var hrefArray = window.location.href.split('/');
    if(hrefArray['3']!=''){
        var domain = origin+'/'+hrefArray['3'];
    }else{
        var domain = origin;
    }
    window.location.replace(domain+'/'+destination);
}

//Get the current user permissions and based on that hide/show certain features
function applyPermissions(){
    if(currentLoggedInUser == ''){//If permission doesn't exist, make ajax request and get it from API
        $.ajax({
            url : endpoint,
            method: 'GET',
            data: {
                'action': 'getuser',
            }
        }).done(function(response){
            if(response != undefined){
                response = JSON.parse(response);
                if(response.success == true){
                    currentLoggedInUser = response.user;
                    hideSectionsBasedOnPermission();
                }else{ // User is not logged in. Redirect to login page
                    redirect('index.php');
                }
            }
        });
    }else{
        hideSectionsBasedOnPermission();
    }
}

//Hide sections based on user permissions
function hideSectionsBasedOnPermission(){
    currentUserPermission = currentLoggedInUser.privilege;
    $('.permission-link').hide(); //Hide all navigation links by default
    $('.permission-link').each(function(){ //Show proper sections based on the permission
        if($(this).hasClass('perm-'+currentUserPermission)){
            $(this).show();
        }
    });
}