var endpoint = 'http://localhost/swd691-service-layers/';

function loadUsersList(){
    $.ajax({
        url : endpoint+'?action=users&subaction=getall',
        method: 'POST'
    }).done(function(response){
        console.log(response);
    })
}

function getAllUsers(){
    
}

function getUserById(){

}