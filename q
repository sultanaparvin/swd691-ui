[1mdiff --git a/js/main.js b/js/main.js[m
[1mindex f996b51..ca31d3d 100644[m
[1m--- a/js/main.js[m
[1m+++ b/js/main.js[m
[36m@@ -339,8 +339,31 @@[m [mfunction projectResetForm(){[m
     $('.field-project-description').val('');[m
 }[m
 [m
[31m-function projectDelete(){[m
[31m-[m
[32m+[m[32m//delete project by id[m
[32m+[m[32mfunction projectDelete(id){[m
[32m+[m[32m    $.ajax({[m
[32m+[m[32m        url : endpoint,[m
[32m+[m[32m        method: 'POST',[m
[32m+[m[32m        data: {[m
[32m+[m[32m            'action': 'projects',[m
[32m+[m[32m            'subaction' : 'delete',[m
[32m+[m[32m            'id' : id,[m
[32m+[m[32m        }[m
[32m+[m[32m    }).done(function(response){[m
[32m+[m[32m        if(response != undefined){[m
[32m+[m[32m            response = JSON.parse(response);[m
[32m+[m[32m            if(response.success == true){[m
[32m+[m[32m                var messages = [response.message];[m
[32m+[m[32m                ShowMessages(messages, 'success');[m
[32m+[m[32m                projectResetForm();[m
[32m+[m[32m                projectLoadList();[m
[32m+[m[32m            }else{[m
[32m+[m[32m                ShowMessages(response.message, 'fail');[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
[32m+[m[32m    });[m
[32m+[m[32m    $('.view-project-delete').slideUp();[m
[32m+[m[32m    $('.view-project-list').slideDown()[m
 }[m
 /************************************************************************GLOBAL */[m
 //Show success and fail messages[m
