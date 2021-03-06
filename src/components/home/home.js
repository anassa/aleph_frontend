import Component from 'can-component';
import Map from 'can-define/map/map';
import Route from 'can-route';
import 'can-stache/helpers/route';
import './home.less!';
import template from './home.stache!';
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-notify/bootstrap-notify.js'
import 'aleph-frontend/styles/bootstrap.switch.css!'
import 'lodash/lodash.js'

import Usuarios from 'aleph-frontend/models/usuarios';
// Este modelo lo traigo para hacer una negrada +21% (masiva)
//import OrdenesDeCompra from 'aleph-frontend/models/ordenesDeCompra';

export const ViewModel = Map.extend(
	{
		route:
		{
			value: function()
			{
				return	Route.data
			}
		}
	,	user:
		{
			value: undefined
		,	serialize:	false
		}
	,	passwordError:
		{
			value:	undefined
		,	type:	'string'
		}
	,	moduloSelect:
		{
			value: undefined
		}
	,	init: function()
		{
			var self
			=	this;

			Usuarios.getSession()
				.then(
					function()
					{
						self.user = feathers.get('usuario');
					}
				,	function()
					{
						self.user = undefined;
					}
				)	
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

			this.passwordError = null;

			if (newPassword === confirmPassword) {
				this.user.password = newPassword;
				this.user.save()
					.then(
						function()
						{
							$button.button('reset');
							$modal.modal('hide');
							$.notify(
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
							this.passwordError = 'Ocurrio un error. Intentelo nuevamente';
							$button.button('reset');
						}
					)
			}	else {
				this.passwordError = 'Las contraseñas ingresadas no coinciden';
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
						self.user = null;
						self.passwordError = null;
						Route.data.page = null;
						Route.data.section = null;
					}
				,	function()
					{
						$.notify(
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

		// Cuando hacemos click en volver al menu.
		, volverPrincipal: function(elem){

			// Mostramos los viejos iconos.
			$('#iconos').show('slow')
			// Ocultamos los iconos del submodulo.
			$('#subModulo').hide('slow')

		}
		
		// Comportamiento cuando tocamos botones
		, clickIcon: function(modSelected){
	
			// Ocultar iconos.
			$('#iconos').hide('slow')

			// Creamos un array de JSONS. Practica pco saludable.
			var subMapping = {
				ventas:[
					{
						nombre:"Nueva Venta" 
						,icon:' fa-dollar '
						,section:'nueva_venta'
						,modulo:'ventas'
					},
					
					{	nombre:"Nueva Solicitud"
						,icon:'fa-shopping-cart'
						,section:'nueva_solicitud'
						,modulo:'ventas'
					},
					
					{	
						nombre:"Nuevo Cliente" 
						,icon:'fa-male '
						,section:'nuevo_cliente'
						,modulo:'ventas'
					},
					
					{
						nombre:"Nueva Forma de Pago"
						,icon:"fa-credit-card" 
						,section:'nueva_forma_de_pago'
						,modulo:'ventas'
					},
					
					

					{
						nombre:"Registros Venta" 
						,icon:' fa-list-alt '
						,section:'registros_venta'
						,modulo:'ventas'
						,clase:'registro'
					},
					{
						nombre:"Registros Solicitud" 
						,icon:'fa-list-alt'
						,section:'registros_solicitud'
						,modulo:'ventas'
						,clase:'registro'
					},
					{
						nombre:"Registros Cliente"
						,icon:'fa-list-alt ' 
						,section:'registros_cliente'
						,modulo:'ventas'
						,clase:'registro'
					},
					{
						nombre:"Registros Forma de Pago" 
						,icon:"fa-list-alt"
						,section:'registros_forma_de_pago'
						,modulo:'ventas'
						,clase:'registro'
					},
					{
						nombre:"Reportes"
						,icon:"fa-file-text"
						,section:'reportes'
						,modulo:'ventas'
						,clase:'reporte'
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
						nombre:"Nuevo Proveedor"
						,icon:' fa-briefcase ' 
						,section:'nuevo_proveedor'
						,modulo:'compras'
					},
					
				

					{
						nombre:"Registros Orden de Compra"
						,icon:' fa-list-alt ' 
						,section:'registros_oc'
						,modulo:'compras'
						,clase:'registro'
					},
					{
						nombre:"Registros Proveedor"
						,icon:' fa-list-alt ' 
						,section:'registros_proveedor'
						,modulo:'compras'
						,clase:'registro'
					},
						{
						nombre:"Reportes"
						,icon:' fa-file-text ' 
						,section:'reportes'
						,modulo:'compras'
						,clase:'reporte'
					},
				]
				,stock:[
					{
						nombre:"Nuevo Articulo"
						,icon:' fa-plus ' 
						,section:'nuevo_articulo'
						,modulo:'stock'
					},
					
					{
						nombre:"Nuevo Remito"
						,icon:' fa-clipboard ' 
						,section:'nuevo_remito'
						,modulo:'stock'
					},
					
					{
						nombre:"Registros Articulo"
						,icon:' fa-list-alt '
						 ,section:'registros_articulo'
						 ,modulo:'stock'
						 ,clase:'registro'
					},
					{
						nombre:"Registros Remito"
						,icon:' fa-list-alt ' 
						,section:'registros_remito'
						,modulo:'stock'
						,clase:'registro'
					},

					{
						nombre:"Reportes"
						,icon:'fa-file-text '
						, section:'reportes'
						,modulo:'stock'
						,clase:'reporte'
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

			// Se setea el modulo.
			this.moduloSelect = subMapping[modSelected];
			// Sirve para saber en que modulo se hizo click.
			this.moduloSelect.volver = modSelected;
			// lo mismo de siempre ...
			$('#iconos').hide('slow')
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
				$(el).find('i').toggleClass('fa-bars fa-angle-double-left')
			}
		,	'.tree-toggler click': function(el, ev)
			{
				var $currentTree = $(el).parent().children('ul.tree');

				var $visibleTree = $('ul.tree:visible');

				if ($currentTree.from != $visibleTree.from)
					$visibleTree.toggle(300);

				$currentTree.toggle(300);
			}
		}
	,	view: template
	}
);
