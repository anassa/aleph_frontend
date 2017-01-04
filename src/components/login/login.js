import Component from 'can-component';
import Map from 'can-define/map/map';
import Route from 'can-route';
import 'can-stache/helpers/route';
import './login.less!';
import template from './login.stache!';
import 'bootstrap/js/button.js'

import Usuarios from 'aleph-frontend/models/usuarios';

export const ViewModel = Map.extend(
	{
		login: function(el)
		{
			var $button = $(el);

			$button.button('loading');

			Usuarios
				.login(
					$('form.form-signin input[name=username]').val()
				,	$('form.form-signin input[name=password]').val()
				).then(
					function()
					{
						$('aleph-home').viewModel()
							.attr(
								'user'
							,	Usuarios.getSession()
							);

						Route.attr('page','home');
					}
				,	function(error)
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
	,	view:		template
	}
);