$(document).ready(function() {
	var form = $('#form1');
	$(form).validate({
	  	rules: {
		    name: 'required',
		    email: {
		      required: true,
		      email: true,
		    },
		    age: {
		      required: true,
		      maxlength: 3,
		    },
		    mobile: {
		      required: true,
		      minlength: 10,
		    },
		    address: 'required'
	  	},
	  	messages: {
		    name: 'This field is required',
		    email: 'Enter a valid email',
		    age: 'Enter valid age',
		    mobile: 'This field is required',
		    address: 'This field is required'
	  	},
	  	submitHandler: function(form) {
		    var formData = $('#form1').serializeArray();
		    console.log("form data", formData);
		    $.ajax({
		    	url: '/user/data',
		    	type: 'POST',
		    	data: formData,
		    	success: function(data) {
		    		console.log(data);
		    		if(data.status == 400) {
		    			$('#error').text('Email already exist').show();
	          			$('#error').delay(3000).fadeOut('slow');
		    		} else {
		    			$('#form1').hide();
		    			$('#data').append(data);
		    		}
		    	},
		    	error: function(error) {
		    		console.log(error);
		    	}
		    })
	  	}
	});

	$('#toggle').click(function() {
		$('#form1').fadeOut();
		$('#form2').fadeIn();
	})

	$('#register').click(function() {
		$('#form1').fadeIn();
		$('#form2').fadeOut();
	})

	$(".update").off("click");
	$('.update').click(function () {
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
	    $.ajax({
	    	url: '/user/update',
	    	type: 'get',
	    	contentType: 'application/json; charset=UTF-8',
        	Accept: "application/json; charset=UTF-8",
	    	data: data,
	    	error: function(error) {
	    		console.log(error);
	    	},
	    	success: function(data) {
	    		console.log(data);
	    		var findData = data.data;
	    		$('#model-content').hide();
	    		$('#model-success').show();
	    		$('table tbody').empty();
	    		$('.modal-backdrop.in').css({ "opacity": "0" });
	    		$('table tbody').append(`<tr><th>name</th><th>email</th><th>age</th><th>phone</th><th>address</th><th>gender</th><th>edit</th><th>delete</th></tr>`)
	    		if(findData.length == 0) {
	    			var tr = `<tr align="center">`;
	    			tr += `No records found`;
	    			tr += `</tr>`;
	    			$('table tbody').append(tr);
	    		} else {
		    		for (var i=0; i<findData.length;i++) {
		    			console.log("entered loop" ,findData[i]);
		    			var tr = `<tr>`;
		    			tr += `<td>${findData[i].name}</td>`;
		    			tr += `<td>${findData[i].email}</td>`;
		    			tr += `<td>${findData[i].age}</td>`;
		    			tr += `<td>${findData[i].phone}</td>`;
		    			tr += `<td>${findData[i].address}</td>`;
		    			tr += `<td>${findData[i].gender}</td>`;
		    			tr += `<td><a href="#" class="edit" data-toggle="modal" data-target="#myModal" id="`+ findData[i].user_id +`">Edit</a></td>`;
		    			tr += `<td><a href="#" class="delete" data-toggle="modal" data-target="#delete-modal" id="`+ findData[i].user_id +`">Delete</a></td>`;
		    			tr += `</tr>`;
		    			$('table tbody').append(tr);
		    		}
		    	}
	    	}
	    })
	});

	$("#tabel").on('click', '.edit', function(e){
		console.log("edit clicked");
		$('#model-content').css({"display": "inline"});
		$('#model-success').css({"display": "none"});
		var userId = e.currentTarget.id;
		var data = {"userId": userId};
		console.log("user id===>", userId);
		$.ajax({
			url: '/user/:id',
			type: 'POST',
			data: data,
			success: function(res) {
				console.log(res);
				$('#user').val(res.data.user_id);
				$('#name').val(res.data.name);
				$('#email').val(res.data.email);
				$('#age').val(res.data.age);
				$('#mobile').val(res.data.phone);
				$('#address').val(res.data.address);
				if(res.data.gender == 'male') {
					$('#male').attr('checked', true);
				} else if(res.data.gender == 'female') {
					$('#female').attr('checked', true);
				}
			},
			error: function(error) {
				console.log(error);
			}
		})
	})

	$("#tabel").on('click', '.delete', function(e){
		$('#alert-user').css({"display": "inline"});
		$('#delete-success').css({"display": "none"});
		var userId = e.currentTarget.id;
		console.log("delete id",userId);
		$('#delete').val(userId);
	});

	$('#delete-user').click(function() {
		var userId= $('#delete').val();
		console.log("ok click delete");
		var userData = {'user_id': userId};
		$.ajax({
			url: '/user/delete',
			type: 'GET',
			data: userData,
			success: function(data) {
				console.log(data);
				if(data.data == null) {
					$('table tbody').empty();
					$('table tbody').append(`<tr><th>name</th><th>email</th><th>age</th><th>phone</th><th>address</th><th>gender</th><th>edit</th><th>delete</th></tr>`);
					$('#alert-user').hide();
					$('#delete-success').show();
					$('table tbody').append(`<tr><td colSpan=8> No records found </td>`);
				}
				// var findData = data.data;
				// $('table tbody').empty();
	   //  		$('.modal-backdrop.in').css({ "opacity": "0" });
	   //  		$('table tbody').append(`<tr><th>name</th><th>email</th><th>age</th><th>phone</th><th>address</th><th>gender</th><th>edit</th><th>delete</th></tr>`)
	   //  		if(findData.length == 0) {
	   //  			$('table tbody').append(`No records found`);
	   //  		} else {
		  //   		for (var i=0; i<findData.length;i++) {
		  //   			console.log("entered loop" ,findData[i]);
		  //   			var tr = `<tr>`;
		  //   			tr += `<td>${findData[i].name}</td>`;
		  //   			tr += `<td>${findData[i].email}</td>`;
		  //   			tr += `<td>${findData[i].age}</td>`;
		  //   			tr += `<td>${findData[i].phone}</td>`;
		  //   			tr += `<td>${findData[i].address}</td>`;
		  //   			tr += `<td>${findData[i].gender}</td>`;
		  //   			tr += `<td><a href="#" class="edit" data-toggle="modal" data-target="#myModal" id="`+ findData[i].user_id +`">Edit</a></td>`;
		  //   			tr += `<td><a href="#" class="delete" data-toggle="modal" data-target="#delete-modal" id="`+ findData[i].user_id +`">Delete</a></td>`;
		  //   			tr += `</tr>`;
		  //   			$('table tbody').append(tr);
		  //   		}
		  //   	}
			},
			error: function(error) {
				console.log(error);
			}
		})
	})

	$('#search').click(function(e) {
		e.preventDefault();
	    var formData = $('#form2').serializeArray();
	    console.log("form data", formData);
	    $.ajax({
	    	url: '/user/find',
	    	type: 'GET',
	    	contentType: 'application/json; charset=UTF-8',
        	Accept: "application/json; charset=UTF-8",
	    	data: formData,
	    	success: function(data) {
	    		console.log(data);
	    		if(data.status == 404 ) {
	    			$('#error').text('No data found').show();
	          		$('#error').delay(3000).fadeOut('slow');
	    		} else {
	    			$('#form2').hide();
	    			$('#data').append(data);
	    		}
	    		
	    	},
	    	error: function(error) {
	    		console.log(error);
	    	}
	    })
  	});
});