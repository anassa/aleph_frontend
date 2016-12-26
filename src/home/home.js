import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './home.less!';
import template from './home.stache!';
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-notify/bootstrap-notify.js'
import 'aleph-frontend/bootstrap.switch.css!'
import 'lodash/lodash.js'

console.log("HOLA")

import Usuarios from 'aleph-frontend/models/usuarios';
// Este modelo lo traigo para hacer una negrada +21% (masiva)
import OrdenesDeCompra from 'aleph-frontend/models/ordenesDeCompra';

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
		
		// Magia para que funcione
		var self = this

		// Oculto la movida de submodulos.
		$('#subModulo').hide()

		// Traemos algo de la base de datos
		// No importa que ....
		OrdenesDeCompra.getList().then(

			// en success
			function(){
				// No hacemos nada
			}

			// Si hay un error, es porque el tipo no esta logeado
			,function(){
				
				// Seteamos como el el usuario no fue cargado.
				self.attr('user',undefined);

			}

		)
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
			this.attr('moduloSelect',subMapping[modSelected]);
			// Sirve para saber en que modulo se hizo click.
			this.attr('moduloSelect.volver',modSelected);
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
