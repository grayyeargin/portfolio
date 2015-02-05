$(document).ready(function() {
    $('.clickImg').click(function(e) {
		var div = $($(this).data("show")).slideToggle('slow');
   div.siblings("div").slideUp('slow');
	});

	$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 700);
    return false;
	});

	// For validation - Thanks to ContactMetrics

    $('#contact_name').on('input', function() {
        var input=$(this);
        var is_name=input.val();
        if(is_name){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $('#contact_email').on('input', function() {
        var input=$(this);
        var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var is_email=re.test(input.val());
        if(is_email){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}
    });

    $('#contact_message').keyup(function(event) {
        var input=$(this);
        var message=$(this).val();
        console.log(message);
        if(message){input.removeClass("invalid").addClass("valid");}
        else{input.removeClass("valid").addClass("invalid");}  
    });

    $("#contact_submit").click(function(event){
    var form_data=$("#contact").serializeArray();
    var error_free=true;
    for (var input in form_data){
        var element=$("#contact_"+form_data[input]['name']);
        var valid=element.hasClass("valid");
        var error_element=$("span", element.parent());
        if (!valid){error_element.removeClass("error").addClass("error_show"); error_free=false;}
        else{error_element.removeClass("error_show").addClass("error");}
    }
    if (!error_free){
        event.preventDefault();
    }
    else{
		$('form').submit(function(event) {
        	var formData = {
			'name' 				: $('input[name=name]').val(),
			'email' 			: $('input[name=email]').val(),
			'message' 	: $('textarea[name=message]').val()
		};

			$.ajax({
			type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
			url 		: 'contact.php', // the url where we want to POST
			data 		: formData, // our data object
			dataType 	: 'json', // what type of data do we expect back from the server
            encode          : true
            success: function(){
            alert("success");
            $("#result").html('Submitted successfully');
        	}
		})





    }
    });


});

