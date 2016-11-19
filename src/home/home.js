import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './home.less!';
import template from './home.stache!';
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-notify/bootstrap-notify.js'
import 'aleph-frontend/bootstrap.switch.css!'
import 'lodash/lodash.js'

import Usuarios from 'aleph-frontend/models/usuarios';

export const ViewModel = Map.extend(
	{
		define:
		{
			user:
			{
				value: function()
				{
					return	Usuarios.getSession();
				}
			,	serialize:	false
			}
		,	passwordError:
			{
				value:	undefined
			,	type:	'string'
			}
		}
	,	updateUser: function(el)
		{
			var	$button
			=	$(el)
			,	$modal
			=	$(el).parents('.modal');

			$button.button('loading');

			var newPassword
			=	$modal.find('input[name=password]').val()
			,	confirmPassword
			=	$modal.find('input[name=cpassword]').val();

			this.attr('passwordError',null);

			if (newPassword === confirmPassword) {
				this.attr('user').attr('password',newPassword).save()
					.then(
						function()
						{
							$button.button('reset');
							$modal.modal('hide');
							can.$.notify(
								{
									message:	'Contraseña actualizada correctamente.' 
								}
							,	{
									type:		'success'
								,	placement:
									{
										from:	'bottom',
										align:	'right'
									}
								}
							);
						}
					,	function()
						{
							this.attr('passwordError','Ocurrio un error. Intentelo nuevamente.');
							$button.button('reset');
						}
					)
			}	else {
				this.attr('passwordError','Las contraseñas ingresadas no coinciden');
				$button.button('reset');
			}
		}
	,	destroySession: function(el)
		{
			var	self
			=	this;

			var $modal
			=	$(el).parents('.modal');

			Usuarios.logout()
				.then(
					function()
					{
						$modal.modal('hide');
						self.attr('user',null);
						self.attr('passwordError',null);
						can.route.removeAttr('page');
						can.route.removeAttr('section');
					}
				,	function()
					{
						can.$.notify(
							{
								message:	'Ocurrio un error. Intentelo nuevamente.' 
							}
						,	{
								type:		'danger'
							,	placement:
								{
									from:	'bottom',
									align:	'right'
								}
							}
						);
					}
				)
		}
	}
);

export default Component.extend(
	{
		tag:		'aleph-home'
	,	viewModel:	ViewModel
	,	events:
		{
			'.btn-toggle-menu click': function(el, ev) {
				$("#wrapper").toggleClass("toggled");
				can.$(el).find('i').toggleClass('fa-bars fa-angle-double-left')
			}
		,	'.tree-toggler click': function(el, ev)
			{
				var $currentTree = can.$(el).parent().children('ul.tree');

				var $visibleTree = can.$('ul.tree:visible');

				if ($currentTree.attr('from') != $visibleTree.attr('from'))
					$visibleTree.toggle(300);

				$currentTree.toggle(300);
			}
		}
	,	template
	}
);