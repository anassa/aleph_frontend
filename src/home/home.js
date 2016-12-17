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
			// Valor que van a tomar los diferentes submodulos
			,moduloSelect:{
				value: undefined
			}
		}
	// Lo que sucede cuando cargo la pagina
	, init: function(){
		// Oculto la movida de submodulos.
		$("#subModulo").hide()
		// $("#returnButton").remove()
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
		, volverPrincipal: function(elem){
			// alert(subMapping[modSelected])
			// $('#iconos').hide()
			$('#iconos').show('slow')
			// $('#iconos').animate({
			//     // opacity: 0.25,
			//     // left: "+=50",
			//     width: "100%"
			//  }, 500, function() {
			//     // Animation complete.
			//  });
			// // $('#iconos').append('<p id="movida">holamundo</p>')
			$('#subModulo').hide('slow')

		}
		// Comportamiento cuando tocamos botones
		, clickIcon: function(modSelected){
			// Creamos un array de JSONS. Practica pco saludable.
			var subMapping = {
				ventas:[
					{
						nombre:"Nueva Venta" 
						,icon:' fa-dollar '
						,section:'nueva_venta'
						,modulo:'ventas'
					},
					{
						nombre:"Registros Venta" 
						,icon:' fa-list-alt '
						,section:'registros_venta'
						,modulo:'ventas'
					},
					{	nombre:"Nueva Solicitud"
						,icon:'fa-shopping-cart'
						,section:'nueva_solicitud'
						,modulo:'ventas'
					},
					{
						nombre:"Registros Solicitud" 
						,icon:'fa-list-alt'
						,section:'registros_solicitud'
						,modulo:'ventas'
					},
					{	
						nombre:"Nuevo Cliente" 
						,icon:'fa-male '
						,section:'nuevo_cliente'
						,modulo:'ventas'
					},
					{
						nombre:"Registros Cliente"
						,icon:'fa-list-alt ' 
						,section:'registros_cliente'
						,modulo:'ventas'
					},
					{
						nombre:"Nueva Forma de Pago"
						,icon:"fa-credit-card" 
						,section:'nueva_forma_de_pago'
						,modulo:'ventas'
					},
					{
						nombre:"Registros Forma de Pago" 
						,icon:"fa-list-alt"
						,section:'registros_forma_de_pago'
						,modulo:'ventas'
					},
					{
						nombre:"Reportes"
						,icon:"fa-file-text"
						,section:'reportes'
						,modulo:'ventas'
					},
				]
				// Fin modulo de ventas
				// Modulo de compras

				,compras:[
					{
						nombre:"Nueva Orden de Compra"
						,icon:' fa-truck   ' 
						,section:'nueva_oc'
						,modulo:'compras'
					},
					{
						nombre:"Registros Orden de Compra"
						,icon:' fa-list-alt ' 
						,section:'registros_oc'
						,modulo:'compras'
					},
					{
						nombre:"Nuevo Proveedor"
						,icon:' fa-briefcase ' 
						,section:'nuevo_proveedor'
						,modulo:'compras'
					},
					{
						nombre:"Registros Proveedor"
						,icon:' fa-list-alt ' 
						,section:'registros_proveedor'
						,modulo:'compras'
					},
					{
						nombre:"Reportes"
						,icon:' fa-file-text ' 
						,section:'reportes'
						,modulo:'compras'
					}
				]
				,stock:[
					{
						nombre:"Nuevo Articulo"
						,icon:' fa-plus ' 
						,section:'nuevo_articulo'
						,modulo:'stock'
					},
					{
						nombre:"Registros Articulo"
						,icon:' fa-list-alt '
						 ,section:'registros_articulo'
						 ,modulo:'stock'
					},
					{
						nombre:"Nuevo Remito"
						,icon:' fa-clipboard ' 
						,section:'nuevo_remito'
						,modulo:'stock'
					},
					{
						nombre:"Registros Remito"
						,icon:' fa-list-alt ' 
						,section:'registros_remito'
						,modulo:'stock'
					},
					{
						nombre:"Reportes"
						,icon:'fa-file-text '
						, section:'reportes'
						,modulo:'stock'
					}
				]
				,administracion:[
					{
						nombre:"Nuevo Usuario"
						,icon:' fa-user   ' 
						,section:'nuevo_usuario'
						,modulo:'administracion'
					},
					{
						nombre:"Registros Usuario"
						,icon:' fa-group   '
						,section:'registros_usuario'
						,modulo:'administracion'
					}
				]				
			}

			this.attr('moduloSelect',subMapping[modSelected]);
			this.attr('moduloSelect.volver',modSelected);
			// alert(subMapping[modSelected])

			// $('#iconos').animate({
			//     // opacity: 0.25,
			//     // left: "+=50",
			//     width: "45%"
			//  }, 500, function() {
			//     // Animation complete.
			//  });
			$('#iconos').hide('slow')
			$("#subModulo").hide()
			$('#subModulo').hide().show('slow')

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
