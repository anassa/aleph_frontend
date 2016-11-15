import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './login.less!';
import template from './login.stache!';
import 'bootstrap/js/button.js'

import Usuarios from 'aleph-frontend/models/usuarios';

export const ViewModel = Map.extend(
	{
		define:
		{
		}
	,	login: function(el)
		{
			var $button = $(el);

			$button.button('loading');

			Usuarios
				.login(
					can.$('form.form-signin input[name=username]').val()
				,	can.$('form.form-signin input[name=password]').val()
				).then(
					function()
					{
						can.$('aleph-home').viewModel()
							.attr(
								'user'
							,	Usuarios.getSession()
							);

						can.route.attr('page','home');
					}
				).catch(
					function(error)
					{
						$button.button('reset');
					}
				);
		}
	}
);

export default Component.extend(
	{
		tag:		'aleph-login'
	,	viewModel:	ViewModel
	,	template
	}
);