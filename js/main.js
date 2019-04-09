var endpoint = 'http://localhost/swd691-service-layers/';

function loadUsersList(){
    $.ajax({
        url : endpoint+'?action=users&subaction=getall',
        method: 'GET'
    }).done(function(response){
        if(response != undefined){
            response = JSON.parse(response);
            if(response.success == true){
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

function loadUserPrivileges(){
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

function initUsers(){
    loadUsersList();
    loadUserPrivileges();
    $(document).on('click','.user-add-button',function(){
        $('.view-user-list').slideUp();
        $('.view-user-add').slideDown();
    });
    $(document).on('click','.user-edit-button',function(){
        console.log('editg');
    });
    $(document).on('click','.user-delete-button',function(){
        console.log('del');
    });
}
function getAllUsers(){
    
}

function getUserById(){

}