const express = require('express')
const router = express.Router()
const passport = require('../../passport')
const ko = require('nekodb');

// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
	console.log('===== user!!======')
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

router.post(
	'/login',
	function(req, res, next) {
		console.log(req.body)
		console.log('================')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user)) 
		const cleanUser = Object.assign({}, user)
		if (cleanUser.local) {
			console.log(`Deleting ${cleanUser.local.password}`)
			delete cleanUser.local.password
		}
		res.json({ user: cleanUser })
	}
)

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

// router.post('/signup', (req, res) => {
// 	const { username, password } = req.body
// 	// ADD VALIDATION
// 	User.findOne({ 'username': username }, (err, userMatch) => {
// 		if (userMatch) {
// 			return res.json({
// 				error: `Sorry, already a user with the username: ${username}`
// 			})
// 		}
// 		const newUser = ko.models.User.create({
//     		username: username,
//     		password: password
// 		})
// 		newUser.save().catch(errors => {
// 	    console.log(errors)
// 		    // errors will contain the password field,
// 		    // since it doesn't contain a String as was required
// 		})
// 	})
// })

router.post('/signup', (req, res) => {
	const { username, password } = req.body
	// ADD VALIDATION
	ko.models.User.findOne({ 'username': username }).then((userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
		}
		const newUser = ko.models.User.create({
    		username: username,
    		password: password,
    		address: '',
			picture: '',
			storeName: '',
			mapLng: 0,
			mapLong: 0,
			storeHours: [],
		})
		newUser.save().then((user) => {
			res.json(user);
		}).catch(err => res.status(422).json(err));
		    // errors will contain the password field,
		    // since it doesn't contain a String as was required
	}).catch(err => {
		console.log(err)
		res.status(400).json(err);
	});
})

// router.post('/signup', (req, res) => {
// 	const { username, password } = req.body
// 	// ADD VALIDATION
// 	User.findOne({ 'local.username': username }, (err, userMatch) => {
// 		if (userMatch) {
// 			return res.json({
// 				error: `Sorry, already a user with the username: ${username}`
// 			})
// 		}
// 		const newUser = new User({
// 			'local.username': username,
// 			'local.password': password
// 		})
// 		newUser.save((err, savedUser) => {
// 			if (err) return res.json(err)
// 			return res.json(savedUser)
// 		})
// 	})
// })


module.exports = router