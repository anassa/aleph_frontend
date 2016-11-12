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
	}
);

export default Component.extend(
	{
		tag:		'aleph-login'
	,	viewModel:	ViewModel
	,	events:
		{
			'.signin click': function(el, ev) {

				var $button = $(el);

				$button.button('loading');

				Usuarios
					.authenticate(
						can.$('form.form-signin input[name=username]').val()
					,	can.$('form.form-signin input[name=password]').val()
					).then(
						function(result)
						{
							can.$('aleph-home')
								.viewModel()
									.attr(
										'user'
									,	new Usuarios(result.data)
									)
						}
					).catch(
						function(error)
						{
							$button.button('reset');
						}
					);
			}
		}
	,	template
	}
);