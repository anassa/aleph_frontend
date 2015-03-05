import	'plugins/login'
import	'bootstrap.css!'
import	'styles/login.css!'
import	'fontawesome.css!'
import	'validator'
import	'validator.css!'
import	'util/customValidation'
import	'models/user'
import	'bootstrap'
import	loginView from 'views/common/login.mustache!'

new	can.Login(
	can.$('body')
,	{
		view: 	loginView
	}
)