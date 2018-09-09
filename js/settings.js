//Settings FILE

var app_name = "Mobile Siwes Platform";
var developer_url = "https://onlinemedia.com.ng";
var developer_email = "admin@onlinemedia.com.ng";
var supervisor = "Mrs. Babafemi Olusola";


//var url = 'http://app.onlinemedia.com.ng/quiz/api.php';
var url;

var env;
env = "locals";

var base_url;

if(env == "local"){
    url = "http://project.apps/mobile_siwes/api.php";
    base_url = "http://freelance.in/mobile_siwes/";
}else{
    base_url = "http://app.onlinemedia.com.ng/chat/";
    url = 'http://app.onlinemedia.com.ng/chat/api.php';
}

$(document).ready(function () {
    //myApp.alert("Hello dude");

    //$(".supervisor").html(supervisor);
});


function is_login() {
    var user_id = sessionStorage.getItem("user_id");
    if(user_id == "" || user_id == null){
        return false;
    }else{
        return true;
    }
}

function show_toast(msg,color) {
    /*iziToast.show({
        message: msg,
        color: color,
        timeout: 2000
    });*/

    window.plugins.toast.show(msg, 3000, 'center');
}

