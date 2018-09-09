// Initialize your app
var myApp = new Framework7({
    modalTitle: app_name,
    material: true,
    pushState : true,
    smartSelectOpenIn: 'picker',
    template7Pages: true, // enable Template7 rendering for Ajax and Dynamic pages
    precompileTemplates: true
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var myTimer;
// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('main-page-2', function (page) {

    /*var ft = sessionStorage.getItem("ft");
    //console.log(ft);
    if((ft == null) || (ft == "")){
        //show splash
        sessionStorage.setItem("ft",1);
        document.getElementById('splash-page').style.display = "block";

        setTimeout(function(){
                show_main()
            },
            5000);
    }else{
        //show main
        show_main();
    }*/

    //show_main();


    function show_main()
    {
        //console.log("hello");
        /*document.getElementById('splash-page').innerHTML = "";
        document.getElementById('splash-page').style.display = "none";
        $$("#splash-page").remove();
        $$("#main-page").removeClass('hide');*/
        //document.getElementById('main-page').style.display = "block";

        //myApp.onPageInit('index');
    }

}).trigger();


myApp.onPageInit('student',function () {

    if(student_login()){
        $$("#home").click();
    }
    $$("#stu-login-form").on('submit',function (e) {
        e.preventDefault();
        myApp.showIndicator();

        $$.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            cache: 'false',
            crossDomain: true,
            timeout: 30000,
            data: {
                'student-login': '',
                'matric' : $$("#login_matric").val(),
                'password': $$("#login_password").val()
            },
            success: function (f) {
                myApp.hideIndicator();
                var ok = f.ok;
                if(ok == 0){
                    show_toast("Invalid login details","red");
                }else if(ok == 1){
                    //save the records
                    sessionStorage.setItem("user_id",f.rec['id']);
                    sessionStorage.setItem("matric",f.rec['matric']);
                    sessionStorage.setItem("student_email",f.rec['email']);
                    sessionStorage.setItem("student_sname",f.rec['sname']);
                    sessionStorage.setItem("student_oname",f.rec['oname']);
                    sessionStorage.setItem("student_level",f.rec['level']);
                    sessionStorage.setItem("company_name", f.rec['company_name']);
                    sessionStorage.setItem("company_address", f.rec['company_address']);
                    sessionStorage.setItem("state",f.rec['state']);
                    sessionStorage.setItem("supervisor_id",f.rec['supervisor_id']);
                    sessionStorage.setItem("supervisor_name",f.supervisor);

                    $$("#home").click();
                }
            },
            error: function (e) {
                myApp.hideIndicator();
                myApp.alert("Network error","Error");
                console.log(e.responseText);
            }
        });
    });
});

myApp.onPageInit('staff',function () {
    if(staff_login()) {
        $$("#staff-home").click();
    }
    $$("#staff-login-form").on('submit',function (e) {
        e.preventDefault();
        myApp.showIndicator();

        $$.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            cache: 'false',
            crossDomain: true,
            timeout: 30000,
            data: {
                'staff-login': '',
                'staff_id' : $$("#staff_id").val(),
                'password': $$("#staff_password").val()
            },
            success: function (f) {
                myApp.hideIndicator();
                var ok = f.ok;
                if(ok == 0){
                    show_toast("Invalid login details","red");
                }else if(ok == 1){
                    //save the records
                    sessionStorage.setItem("user_id",f.rec['id']);
                    sessionStorage.setItem("staff_id",f.rec['staff_id']);
                    sessionStorage.setItem("staff_email",f.rec['email']);
                    sessionStorage.setItem("staff_sname",f.rec['sname']);
                    sessionStorage.setItem("staff_oname",f.rec['oname']);
                    sessionStorage.setItem("staff_level",f.rec['level']);

                    var students = JSON.stringify(f.students);

                    sessionStorage.setItem("students",students);

                    $$("#staff-home").click();
                }
            },
            error: function (e) {
                myApp.hideIndicator();
                myApp.alert("Network error","Error");
                console.log(e.responseText);
            }
        });
    });
});


myApp.onPageInit('staff-reg',function () {
    
   //console.log("Hello");
    $$("#staff-register-form").on("submit",function (e) {
       e.preventDefault();
       myApp.showPreloader("Signing up...");
       var staff_id = $$("#reg_staff_id").val();

       console.log(staff_id);
       var sname = $$("#sname").val();
       var oname = $$("#onames").val();
       var level;
        $$('select[name="staff_level"] option:checked').each(function () {
            level = this.value;
        });
        var email = $$("#reg_email").val();
        var password = $$("#reg_password").val();

        $$.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {
                'staff_id': staff_id,
                'sname': sname,
                'oname': oname,
                'level': level,
                'email': email,
                'password': password,
                'staff-reg': ''
            },
            success:function (f) {
                myApp.hidePreloader();
                console.log(f);
                var ok = f.ok;

                if(ok == 1){
                    $$(".res").click();
                    show_toast(f.msg,"green");
                }else{
                    show_toast(f.msg,"red");
                }
            },
            error:function (e) {
                myApp.hidePreloader();
                myApp.alert("Network, try again","Error");
            },
            timeout: 30000,
            crossDomain: true,
            cache: false
        });
       //show_toast("Registration complete","blue");
    });
});


myApp.onPageInit('student-reg',function () {
    
    //console.log("Hello");
    $$("#register-form").on("submit",function (e) {
        e.preventDefault();
        myApp.showPreloader("Signing up...");
        var matric = $$("#reg_matric").val();

        //console.log(staff_id);
        var sname = $$("#sname").val();
        var oname = $$("#onames").val();
        var company_name = $$("#company_name").val();
        var company_address = $$("#company_address").val();
        var state = $$("#state").val();
        var level;
        $$('select[name="student_level"] option:checked').each(function () {
            level = this.value;
        });
        var email = $$("#reg_email").val();
        var password = $$("#reg_password").val();

        $$.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {
                'matric': matric,
                'sname': sname,
                'oname': oname,
                'level': level,
                'email': email,
                'password': password,
                'company_name': company_name,
                'company_address': company_address,
                'state': state,
                'student-reg': ''
            },
            success:function (f) {
                myApp.hidePreloader();
                console.log(f);
                var ok = f.ok;

                if(ok == 1){
                    $$(".res").click();
                    show_toast(f.msg,"green");
                    $$("#goBack").click();
                }else{
                    show_toast(f.msg,"red");
                }
            },
            error:function (e) {
                myApp.hidePreloader();
                myApp.alert("Network, try again","Error");
            },
            timeout: 30000,
            crossDomain: true,
            cache: false
        });
        //show_toast("Registration complete","blue");
    });
});

myApp.onPageInit('staff-home',function () {
    
    if(!staff_login()){
        window.location = "main.html";
    }
    update_staff();

    $$(".staff-logout").on("click",function (e) {
       e.preventDefault();

       myApp.confirm("Are you sure want to logout","Logout",function (e) {
          sessionStorage.clear();
          window.location = "main.html";
       });
    });
});


myApp.onPageInit('student-home',function () {
    
    if(!student_login()){
        window.location = "main.html";
    }
    update_student();
    var supervisor_id = sessionStorage.getItem("supervisor_id");
    var supervisor_name = sessionStorage.getItem("supervisor_name");
    $("#super-name").html("("+sessionStorage.getItem("supervisor_name")+")");
    //$(".chat-link").attr("href","chat.html?id+")

    $(".chat-link").attr('href','chat.html?id='+supervisor_id+'&name='+supervisor_name);
    $$(".staff-logout").on("click",function (e) {
        e.preventDefault();

        myApp.confirm("Are you sure want to logout","Logout",function (e) {
            sessionStorage.clear();
            window.location = "main.html";
        });
    });
});


myApp.onPageInit('report',function(){
    if(!student_login()){
        window.location = "main.html";
    }

    $("#stu-report-form").on("submit",function(e){
        e.preventDefault();
        var week = $("#week_name").val();
        var activity = $("#activity").val();

        if(week == "" || activity == ""){
            myApp.alert("Kindly enter progress report before submitting!");
            return;
        }
        myApp.showIndicator();

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            timeout: 30000,
            data: {
                'submit-report': 'yes',
                'matric': sessionStorage.getItem("matric"),
                'week': week,
                'activity': activity
            },
            error: function(er){
                myApp.hideIndicator();
                show_toast("Network error, make sure you have an active internet connection!","red");
            },
            success: function(s){
                myApp.hideIndicator();
                $("#week_name").val('');
                $("#activity").val('');
                show_toast("Progress report submitted successfully!");
            }
        });
    });
});


myApp.onPageInit("my_company",function(){
    if(!staff_login()){
        window.location = "main.html";
    }

    
            var res = JSON.parse(sessionStorage.getItem("students"));
            a = "";
            for(var k = 0; k < res.length; k++) {                
                var the_id = res[k].id;
                var the_name = res[k].sname +" "+res[k].oname;
                var matric = res[k].matric;                
                var company_address = res[k].company_address;
                var company_name = res[k].company_name;
                var state = res[k].state;
                a += '<li><a href="#" class="item-link item-content">';
                a += '<div class="item-inner">';
                a += '<div class="item-title-row">';
                a += '<div class="item-title">'+the_name+' - '+matric+'</div>';
                a += '<div class="item-after">'+state+'</div></div>';
                a += '<div class="item-subtitle">'+company_name+'</div>';
                a += '<div class="item-text">'+company_address+'</div>';
                a += '</div></a></li>';                                  
            } 

            //console.log(a);
            $(".the-company").html(a);
});

myApp.onPageInit("chat-home",function (page) {
    console.log(page.name);
    if(page.name != "chat-home"){
        return;
    }
    

    
   if(!student_login() && !staff_login()){
       window.location = "main.html";
   }

    var thisPageQuery = page.query;
    var id;
    id = thisPageQuery.id;


   myApp.showIndicator();

   if(staff_login()){
    var p = "staff";
   }else{
    var p = "student";
   }
    

   




    function doStuff() {
        //myApp.alert("run your code here when time interval is reached");
        
        $$.ajax({
          url : url,
          type : 'get',
           crossDomain : true,
           cache : true,
           data : {
              'load-message': '',
               'user_id': sessionStorage.getItem("user_id"),
               'friend_id': id,
               'type': p
           },
           dataType: 'json',
           success: function (f) {
              var t = "";
              var rec = f.record;
              if(staff_login()){
                var mt = "staff";
              }else{
                var mt = "student";
              }
              for(var i = 0; i < rec.length; i++){
                  if((rec[i].m_type == mt) && (rec[i].user_id == sessionStorage.getItem("user_id"))){
                      var m_class = "message-sent";
                     var m_name = "";
                     var m_block = '<div class="message message-sent message-appear-from-bottom message-last message-with-tail message-first">';
                  }else{
                      var m_class = "message-received"
                      var m_name = '<div class="message-name">'+rec[i].msg_name+'</div>';
                      var m_block = '<div class="message message-received message-appear-from-bottom message-last message-with-tail message-first">';
                  }

                  var te = '<div class="message '+m_class+'">';
                  te += m_name;
                  te += '<div class="message-text">'+rec[i].msg;
                  te += '<div class="message-date">'+rec[i].time_sent+'</div>';
                  te += '</div></div>';

                  t += te;
              }

               $$("#mlist").html(t);

               //$$('.page-content').animate({scrollTop: $$('.messages').height() }, 'slow');

               //console.log(t);

              myApp.hideIndicator();
               //console.log(f);
           },
           error: function (e) {
               //myApp.alert("Network error...");
               myApp.hideIndicator();
               console.log(e.responseText);
               show_toast("Network error...");
           }
       });
    }
    
    myTimer = setInterval(doStuff, 2500);

   $$(".send-message").on("click",function (e) {
       e.preventDefault();
       var text = $$("#the-text").val();
       if(text == ""){
            return;
       }

       if(staff_login()){
            var msg_type = "staff";
       }else{
            var msg_type = "student";
       }
       //var l = sessionStorage.getItem("student_level");
       //send_msg(text, sessionStorage, msg_type);
       send_msg(text, msg_type, id);
       $$("#the-text").val('');
   })
});




myApp.onPageInit('my_students',function () {
    if(!staff_login()){
        window.location = "main.html";
    }
    
    var res = JSON.parse(sessionStorage.getItem("students"));

    for(var k = 0; k < res.length; k++) {
        var the_id = res[k].id;
        var the_name = res[k].sname +" "+res[k].oname;
        var matric = res[k].matric;                
        var a = "<li><a href=\"chat.html?id="+the_id+"&matric="+matric+"&name="+the_name+"\" class='item-link item-content start-quiz' data-quiz-name='"+the_name+"' data-quiz-id='"+the_id+"'>";
        a += "<div class='item-inner'><div class='item-title'>"+the_name+" ("+matric+") </div></div></a></li>";

        $$(".the-list").append(a);
    }    
    
});


$$(document).on('page:beforeremove', function (e) {
    var page = e.detail.page;
    // Code for About page
    if (page.name === 'chat-home') {
        //console.log(myTimer);
        clearInterval(myTimer);
        //console.log(myTimer);
    }
    // Code for Services page
    
});





myApp.onPageInit('profile',function () {
    
   if(staff_login()){
       update_staff();
       $$(".staff_id").html(sessionStorage.getItem("staff_id"));
       $$(".ssname").html(sessionStorage.getItem("staff_sname"));
       $$(".soname").html(sessionStorage.getItem("staff_oname"));
       $$(".semail").html(sessionStorage.getItem("staff_email"));
       $$(".slevel").html(sessionStorage.getItem("staff_level"));

       $("#sprofile_sname").val(sessionStorage.getItem("staff_sname"));
       $("#sprofile_oname").val(sessionStorage.getItem("staff_oname"));
       $("#sprofile_matric").val(sessionStorage.getItem("staff_id"));
       $("#sprofile_email").val(sessionStorage.getItem("staff_email"));
       $("#sstudent_level").val(sessionStorage.getItem("staff_level"));


       $$("#staff-update-form").on('submit',function (e) {
           e.preventDefault();

           var profile_sname = $$("#sprofile_sname").val();
           var profile_oname = $$("#sprofile_oname").val();
           var profile_email = $$("#sprofile_email").val();

           var level = $$("#sstudent_level").val();

           myApp.showPreloader("Updating profile,<br/>Please Wait...");

           $$.ajax({
               url: url,
               data: {
                   'update_staff_profile': '',
                   'sname' : profile_sname,
                   'oname' : profile_oname,
                   'email' : profile_email,
                   'level' : level,
                   'staff_id' : sessionStorage.getItem("staff_id")
               },
               type: 'POST',
               dataType: 'json',
               crossDomain : true,
               cache: false,
               success:function(f){
                   var ok = f.ok;
                   if(ok == 1){

                       sessionStorage.setItem("staff_sname",profile_sname);
                       sessionStorage.setItem("staff_oname",profile_oname);
                       sessionStorage.setItem("staff_email",profile_email);
                       sessionStorage.setItem("staff_level",level);
                       //update_stat();
                       myApp.hidePreloader();
                       show_toast(f.msg,"green");
                   }else {
                       myApp.hidePreloader();



                       show_toast("Unable to update profile","red");


                   }
               },
               error:function(err){
                   console.log(err.responseText);
                   myApp.hidePreloader();
                   myApp.alert("Network error, try again");
               },
               timeout: 30000
           });
       });



       $$("#staff-password-form").on('submit',function (e) {
           e.preventDefault();

           var pass = $$("#spassword").val();
           var c_pass = $$("#sconfirm_password").val();

           if(pass !== c_pass){
               myApp.alert("Password does not match");
               return false;
           }
           myApp.showPreloader("Updating password,<br/>Please Wait...");

           $$.ajax({
               url: url,
               data: {
                   'update_staff_password': '',
                   'password' : pass,
                   'staff_id' : sessionStorage.getItem("staff_id")
               },
               type: 'POST',
               dataType: 'json',
               crossDomain : true,
               cache: false,
               success:function(f){
                   var ok = f.ok;
                   if(ok == 1){
                       myApp.hidePreloader();
                       show_toast(f.msg,"green");
                       $("#spassword").val('');
                       $("#sconfirm_password").val('');
                   }else {
                       myApp.hidePreloader();

                       show_toast('Unable to update password',"red");


                   }
               },
               error:function(err){
                   console.log(err.responseText);
                   myApp.hidePreloader();
                   myApp.alert("Network error, try again");
               },
               timeout: 30000
           });
       });


       $$(".staff-page").removeClass('hide');
   } else if(student_login()){
       update_student();

       $$(".matric").html(sessionStorage.getItem("matric"));
       $$(".sname").html(sessionStorage.getItem("student_sname"));
       $$(".oname").html(sessionStorage.getItem("student_oname"));
       $$(".email").html(sessionStorage.getItem("student_email"));
       $$(".level").html(sessionStorage.getItem("student_level"));


       $("#profile_sname").val(sessionStorage.getItem("student_sname"));
       $("#profile_oname").val(sessionStorage.getItem("student_oname"));
       $("#profile_matric").val(sessionStorage.getItem("matric"));
       $("#profile_email").val(sessionStorage.getItem("student_email"));
       $("#student_level").val(sessionStorage.getItem("student_level"));


       $$("#stu-update-form").on('submit',function (e) {
           e.preventDefault();

           var profile_sname = $$("#profile_sname").val();
           var profile_oname = $$("#profile_oname").val();
           var profile_email = $$("#profile_email").val();

           var level = $$("#student_level").val();

           myApp.showPreloader("Updating profile,<br/>Please Wait...");

           $$.ajax({
               url: url,
               data: {
                   'update_stu_profile': '',
                   'sname' : profile_sname,
                   'oname' : profile_oname,
                   'email' : profile_email,
                   'level' : level,
                   'matric' : sessionStorage.getItem("matric")
               },
               type: 'POST',
               dataType: 'json',
               crossDomain : true,
               cache: false,
               success:function(f){
                   var ok = f.ok;
                   if(ok == 1){

                       sessionStorage.setItem("student_sname",profile_sname);
                       sessionStorage.setItem("student_oname",profile_oname);
                       sessionStorage.setItem("student_email",profile_email);
                       sessionStorage.setItem("student_level",level);
                       //update_stat();
                       myApp.hidePreloader();
                       show_toast(f.msg,"green");
                   }else {
                       myApp.hidePreloader();
                       show_toast("Unable to update profile","red");
                   }
               },
               error:function(err){
                   console.log(err.responseText);
                   myApp.hidePreloader();
                   myApp.alert("Network error, try again");
               },
               timeout: 30000
           });
       });


       $$("#stu-password-form").on('submit',function (e) {
           e.preventDefault();

           var pass = $$("#password").val();
           var c_pass = $$("#confirm_password").val();

           if(pass !== c_pass){
               myApp.alert("Password does not match");
               return false;
           }
           myApp.showPreloader("Updating password,<br/>Please Wait...");

           $$.ajax({
               url: url,
               data: {
                   'update_stu_password': '',
                   'password' : pass,
                   'matric' : sessionStorage.getItem("matric")
               },
               type: 'POST',
               dataType: 'json',
               crossDomain : true,
               cache: false,
               success:function(f){
                   var ok = f.ok;
                   if(ok == 1){
                       myApp.hidePreloader();
                       show_toast(f.msg,"green");
                       $("#password").val('');
                       $("#confirm_password").val('');
                   }else {
                       myApp.hidePreloader();
                       show_toast ('Unable to update password',"red");

                   }
               },
               error:function(err){
                   console.log(err.responseText);
                   myApp.hidePreloader();
                   myApp.alert("Network error, try again");
               },
               timeout: 30000
           });
       });


       $$(".student-page").removeClass('hide');
   }else{
       window.location = "main.html";
   }
});

myApp.onPageInit('stu-password', function (page) {

    $$("#password-forms").on('submit',function(e){
        e.preventDefault();
        var pass_matric = $$("#pass_matric").val();

        var pass_email = $$("#pass_email").val();
        myApp.showPreloader("Resetting Password...");

        $$.ajax({
            url: url,
            data: {
                'stu_pass': '',
                'matric' : pass_matric,
                'email': pass_email
            },
            type: 'POST',
            dataType: 'json',
            crossDomain : true,
            cache: false,
            success:function(f){
                var ok = f.ok;
                if(ok == 1){
                    $$("#pass_matric").val('');
                    $$("#pass_email").val('');
                }
                myApp.hidePreloader();

                myApp.addNotification({
                    message : f.msg
                });
            },
            error:function(err){
                myApp.hidePreloader();
                myApp.alert("Network error, try again");
                console.log(err.responseText);
            },
            timeout: 30000
        });
    });
});

myApp.onPageInit('staff-password', function (page) {
    
    $$("#password-forms").on('submit',function(e){
        e.preventDefault();
        var pass_matric = $$("#pass_matric").val();

        var pass_email = $$("#pass_email").val();
        myApp.showPreloader("Resetting Password...");

        $$.ajax({
            url: url,
            data: {
                'staff_pass': '',
                'staff_id' : pass_matric,
                'email': pass_email
            },
            type: 'POST',
            dataType: 'json',
            crossDomain : true,
            cache: false,
            success:function(f){
                var ok = f.ok;
                if(ok == 1){
                    $$("#pass_matric").val('');
                    $$("#pass_email").val('');
                }
                myApp.hidePreloader();

                myApp.addNotification({
                    message : f.msg
                });
            },
            error:function(err){
                myApp.hidePreloader();
                myApp.alert("Network error, try again");
                console.log(err.responseText);
            },
            timeout: 30000
        });
    });
});

    function send_msg(msg, msg_type, receiver) {
        console.log(msg);
        console.log(msg_type);
        console.log(receiver);
    $$.ajax({
        url : url,
        type : 'post',
        cache : false,
        crossDomain : true,
        data : {
            'send-msg': '',
            'receiver' : receiver,
            'user_id' : sessionStorage.getItem("user_id"),
            'sender' : msg_type,
            'msg' : msg
        },
        success: function (f) {
            // console.log(f);
            // if(msg_type == "student"){
            //     load_st_msg();
            // }else{
            //     load_staff_msg();
            // }
            //doStuff();
            //load_msg()
        }
    });
}

myApp.onPageInit("my_reports", function(page){
    if(!staff_login()){
        window.location = "main.html";
    }

    myApp.showIndicator();

    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        data: {
            'load_report': '',
            'user_id': sessionStorage.getItem("user_id")
        },
        error: function(er){
            show_toast("Network error","red");
            myApp.hideIndicator();
        },
        success: function(f){
            console.log(f);
            var res = f;
            a = "";
            for(var k = 0; k < res.length; k++) {                
                var the_id = res[k].id;
                var the_name = res[k].sname +" "+res[k].oname;
                var matric = res[k].matric;                                
                var week = res[k].week;
                a += '<li><a href="view-report.html?id='+the_id+'&matric='+matric+'&name='+the_name+'&week='+week+'&activity='+res[k].activity+'&ratings='+res[k].ratings+'" class="item-link item-content">';
                a += '<div class="item-inner">';
                a += '<div class="item-title-row">';
                a += '<div class="item-title">'+the_name+'</div>';
                a += '<div class="item-after">'+res[k].ratings+'</div>';
                a += '</div><div class="item-subtitle">'+matric+'</div>';
                a += '<div class="item-text">'+week+'</div>';
                a += '</div></a></li>';                                  
            } 

            //console.log(a);
            $(".the-reports").html(a);
            myApp.hideIndicator();
        }
    });



    
});

myApp.onPageInit("view_report",function(page){
    if(!staff_login()){
        window.location = "main.html";
    }

    $("#ratings_form").on("submit",function(e){
        //console.log("Hi...");
        e.preventDefault();

        var ratings = $("#the_rating").val();
        $("#ratings_p").html(ratings);

        var thisPageQuery = page.query;
        var id;

        id = thisPageQuery.id;


        myApp.showIndicator();

        $.ajax({
            url: url,
            type: 'POST',
            data: {
                'apply_rating': '',
                'ratings': ratings,
                'id' : id
            },
            error: function(er){
                show_toast("Network error","red");
                myApp.hideIndicator();
            },
            success: function(f){
                show_toast("Ratings applied successfully!");            
                myApp.hideIndicator();
            }
        });
    });
});

function update_staff() {
    var f_name = sessionStorage.getItem("staff_sname")+" "+sessionStorage.getItem("staff_oname");
    $$(".staff-name").html(f_name);
}

function staff_login() {
    var staff = sessionStorage.getItem("staff_id");
    if(staff == "" || staff == null){
        return false;
    }else{
        return true;
    }
}

function update_student() {
    var f_name = sessionStorage.getItem("student_sname")+" "+sessionStorage.getItem("student_oname");
    $$(".student-name").html(f_name);
}

function student_login() {
    var staff = sessionStorage.getItem("matric");
    if(staff == "" || staff == null){
        return false;
    }else{
        return true;
    }
}