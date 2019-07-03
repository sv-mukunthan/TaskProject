$(document).ready(function() {
	console.log("details ready");
	$('.update').click(function() {
		var userId  = $('#user').val();
	    var name    = $('#name').val();
	    var email   = $('#email').val();
	    var age     = $('#age').val();
	    var phone   = $('#mobile').val();
	    var address = $('#address').val();
	    var gender;
	    if($('#male').is(':checked')) {
	    	gender = 'male';
	    } else {
	    	gender = 'female';
	    }
	    console.log("gender",gender);
	    var data = {'user_id': userId, 'name': name, 'email': email, 'age': age, 'phone': phone, 'address': address, 'gender': gender};
	    // var updateUrl = '/user/update';
	    $.ajax({
	    	url: '/user/update',
	    	type: 'POST',
	    	dataType: "json",
	    	data: data,
	    	success: function(data) {
	    		console.log(data);
	    	},
	    	error: function(error) {
	    		console.log(error);
	    	}
	    })
	});
})