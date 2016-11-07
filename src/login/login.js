import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './login.less!';
import template from './login.stache!';

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

				setTimeout(
					function()
					{
						$button.button('reset');

						$('aleph-home').viewModel()
							.attr(
								'user'
							,	{
									username: can.$('form.form-signin input[name=username]').val()
								}
							)
						
					}
				,	1500
				)
			}
		}
	,	template
	}
);