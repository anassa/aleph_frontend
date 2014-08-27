define(
	[
	//	Librerias de Can
		'lib/util'
	//	Frame table
	,	'controls/table/table'
	//	Modelo de Articulos
	,	'models/item'
	//	Estilos de Venta
	,	'css!styles/sidebar'
	]
,	function()
	{
		//	Aleph.Ventas.Venta sera el Control de Venta
		can.Control(
			'Aleph.Ventas_Venta'
		,	{
				defaults:
				{
					user:				undefined
				,	view:				'views/ventas/ventas.mustache'
				,	view_amount:		'views/ventas/cantidadArticulo.mustache'
				,	view_table:			'views/ventas/tablaArticulos.mustache'
				,	view_pagination:	'views/common/pagination.mustache'
				}
			}
		,	{
				//	Cuando se inicia por primera vez debera actualizar las opciones del Topbar
				init: function(element,options)
				{
					//	Creo un objeto que contendra el item acutal
					this.currentItem
					=	undefined
					//	Creo un objeto observable para la vista
					this.viewData
					=	new can.Map(
							{
								currentItem:	this.currentItem
							,	shopCart:		new can.List([])
							,	amount:			undefined
							}
						)
					//	Inserto la vista en el elemento
					can.append(
						element
					,	can.view(
							options.view
						,	this.viewData
						)
					)
					//	Obtengo el contenido principal
					this.$content
					=	this.element.find('.main-content')
					//	Inserto la tabla junto al filtro y paginador
					this.table
					=	new	Frame.Table(
							this.$content
						,	{
								view:				options.view_table
							,	model:				Aleph.Model.Item
							,	defaultErrorMsg:	'Ocurrio un error al buscar los Articulos. <br> Por favor intente nuevamente.'
							,	view_pagination:	options.view_pagination
							}
						)
					//	Inserto el modal
					can.append(
						this.element
					,	can.view(
							this.options.view_amount
						)
					)
					//	Busco el modal y lo asigno a una variable del controlador
					this.$quantityModal
					=	this.element.find('#itemQuantity')
					//	Seteo las validaciones del formulario
					this
						.$quantityModal
							.find('form')
								.bootstrapValidator(
									{
										fields:
										{
											quantity:
											{
												validators:
												{
													between:
													{
														min:		1
													,	max:		20
													,	message:	'El valor ingresado es incorrecto. Ver Stock.'
													}
												}
											}
										}
									}
								)
				}
			//	Actualizo el item actual
			,	updateCurrentItem: function(item)
				{
					//	Actualizo la variable del controlador con el item actual
					this.currentItem
					=	item
					//	Actualizo la data de la vista con el item actual
					this
						.viewData
							.attr(
								'currentItem'
							,	this.currentItem
							)
				}
			//	Obtiene el valor total de la compra
			,	getPurchaseOrderAmount: function()
				{
					//	Tomo una variable local y la igualo a 0
					var	amount
					=	0
					//	Recorro los items del carrito
					this
						.viewData
							.attr('shopCart')
								.each(
									function(item)
									{
										//	Sumo la cantida por el valor
										amount += (item.quantity*item.marketPrice)
									}
								)
					//	Devuelvo el valor total
					return amount
				}
			//	Obtiene si es valido o no el formulario de quantity
			,	isValidQuantity: function()
				{
					//	Verifica si es valido o no el form de quantity
					return	this
								.$quantityModal
									.find('form')
										.bootstrapValidator('isValid')
				}
			//	Escucho que se aprete sobre algun tr de la tabla de items disponibles
			,	'table#itemsAvailable tbody tr click': function(el,ev)
				{
					//	Actualizo el item actual
					this.updateCurrentItem(can.$(el).data('item'))
				}
			//	Escucho que se aprte el boton de cancelar item
			,	'button.cancel-item click': function()
				{
					//	Actualizo el item actual
					this.updateCurrentItem(undefined)
				}
			//	Escucho que se aprete el boton agregar cantidad
			,	'button.add-quantity click': function(el,ev)
				{
					//	Actualizo el vaor del stock
					this
						.$quantityModal
							.find('form')
								.bootstrapValidator('updateOption','quantity', 'between', 'max', this.currentItem.attr('stock'))
					//	Muestra el modal
					this.$quantityModal.modal('show')
				}
			//	Escucho que se aprete el boton agregar item al carrito
			,	'button.add-item click': function(el,ev)
				{
					if	(this.isValidQuantity())	{
						//	Oculto el modal
						this.$quantityModal.modal('hide')
						//	Obtengo el nuevo item de carrito
						var	newCartItem
						=	this.currentItem
						//	Le agrego al item su nueva posicion segun la longitiud del carrito
						newCartItem
							.attr(
								{
									itemPos:	this.viewData.attr('shopCart').length + 1
								,	quantity:	parseInt(this.$quantityModal.find('input[name=quantity]').val())
								}
							)
						//	Agrego el item al carrito
						this
							.viewData
								.attr('shopCart')
									.push(
										newCartItem
									)
						//	Actualizo el monto total de la compra
						this
							.viewData
								.attr('amount',this.getPurchaseOrderAmount())
						//	Actualizo el item actual
						this.updateCurrentItem(undefined)
					}
				}
			//	Escucho que se aprete el boton minimizar de cualquier panel
			,	'.panel-heading .fa-minus click': function(el,ev)
				{
					//	Oculto el cuerpo del panel
					can.$(el)
						.parents('.panel')
							.find('.panel-body')
								.hide()
					//	Cambio el icono de minimizar por el de maximizar
					can.$(el)
						.removeClass('fa-minus')
						.addClass('fa-plus')
				}
			//	Escucho que se aprete el boton maximizar de cualquier panel
			,	'.panel-heading .fa-plus click': function(el,ev)
				{
					//	Muestro el cuerpo del panel
					can.$(el)
						.parents('.panel')
							.find('.panel-body')
								.show()
					//	Cambio el icono de maximizar por del minimizar
					can.$(el)
						.removeClass('fa-plus')
						.addClass('fa-minus')
				}
			}
		)
	}
)