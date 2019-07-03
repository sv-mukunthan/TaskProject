var userData = require('../models/user');

exports.index = (req,res) => {
	res.render('home',{
		title: "Home",
		error: "error"
	});
};

exports.userData = (req,res) => {
	console.log("request",req.body);
	var user_id = (Math.floor(Math.random() * (9999 - 1000)) + 1000);
	userData.findOne({
		email: req.body.email
	},(err,exist) => {
		if(err) {
			console.log(err);
		} else {
			console.log("database data",exist);
			if(exist == null) {
				var data = new userData({
					user_id: user_id,
					name: req.body.name,
					email: req.body.email,
					age: req.body.age,
					phone: req.body.mobile,
					gender: req.body.gender,
					address: req.body.address
				});

				data.save((error,saved) => {
					if(error) {
						console.log(error);
					} else {
						console.log("saved",saved);
						// userData.find({},(findErr,find) => {
						// 	if(findErr) {
						// 		console.log(findErr);
						// 	} else {
						// 		console.log("find all result", find);
								res.render('details',{
									title: 'user details',
									data: [saved]
								});
						// 	}
						// })
					}
				});
			} else {
				res.send({
					status: 400,
					message: 'already exist'
				})
			}
		}
	})
};

exports.userEdit = (req,res) => {
	console.log("edit user",req.body);
	userData.findOne({
		user_id: req.body.userId
	},(err,find) => {
		if(err) {
			console.log(err);
		} else {
			res.send({
				data: find
			});
		}
	})
};

exports.findUser = (req,res) => {
	console.log("find user",req.query);
	userData.findOne({
		email: req.query.email
	},(err,find) => {
		if(err) {
			console.log(err);
		} else {
			console.log("login",find);
			if(find != null) {
				res.render("details",{
					title:"deteils",
					data: [find]
				});
			} else {
				res.send({
					status: 404,
					message: 'no records found'
				});
			}
		}
	})
};

exports.userUpdate = (req,res) => {
	console.log("update user request",req.query);
	userData.updateOne({
		user_id: req.query.user_id
	},{
		$set: {
			name: req.query.name,
			email: req.query.email,
			age: req.query.age,
			phone: req.query.phone,
			address: req.query.address,
			gender: req.query.gender
		}
	},(err,updated) => {
		if(err) {
			console.log(err);
		} else {
			console.log("updated ^^^^^^^",updated);
			userData.findOne({user_id: req.query.user_id},(error,find) => {
				if(error) {
					console.log(error);
				} else {
					console.log("find all" ,find);
					res.send({
						data: [find]
					});
				}
			})
		}
	})
};

exports.deleteUser = (req,res) => {
	console.log("delete request", req.query);
	userData.remove({
		user_id: req.query.user_id
	},(err,deleted) => {
		if(err) {
			console.log(err);
		} else {
			console.log(deleted);
			userData.findOne({user_id: req.query.user_id},(error,find) => {
				if(error) {
					console.log(error);
				} else {
					console.log("find all" ,find);
					res.send({
						data: find
					});
				}
			})
		}
	})
}