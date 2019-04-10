var endpoint = 'http://localhost/swd691-service-layers/';

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
        populateEditFormById(id);
        $('.view-user-list').slideUp();
        $('.view-user-addedit').slideDown();
    });
    $(document).on('click','.user-delete-button',function(){
        console.log('del');
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
                    console.log(item);
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
    console.log(id);
    console.log(subaction);
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
    console.log(data);
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

function populateEditFormById(id){
    $.ajax({
        url : endpoint+'?action=users&subaction=getbyid&id='+id,
        method: 'GET'
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
                $('.field-user-id').val(id);
                $('.field-user-name').val(response.item.name);
                $('.field-user-username').val(response.item.username);
                $('.field-user-password').val('');
                $('.field-user-email').val(response.item.email);
                $('.field-user-privilege').val(response.item.privilege);
            }
        }
    })
}

//Reset user form field values
function userResetForm(){
    $('.field-user-id').val('');
    $('.field-user-name').val('');
    $('.field-user-username').val('');
    $('.field-user-password').val('');
    $('.field-user-email').val('');
}

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
