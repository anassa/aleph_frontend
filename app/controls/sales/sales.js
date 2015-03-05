//	Importo librerias de CanJS
import	'can/control'
import	'can/construct/super'
//	Importo los modelos
import	'models/item'
//	Importo plugins externos
import	'validator'
import	'validator.css!'
import	'plugins/table'
//	Importo las vistas
import	salesView from 'views/sales/sales.mustache!'
import	itemTableView from 'views/items/table.mustache!'
import	paymentWizardView from 'views/sales/paymentWizard.mustache!'

can.Control(
	'Aleph.Sales.Sales'
,	{
		defaults:
		{
			view:	salesView
		}
	}
,	{
		init: function(element, options)
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
			//	Inicializo la tabla dentro del content
			new	can.Table(
				can.$('<div>').appendTo(
					this.element.find('.main-content')
				)
			,	{
					view:	itemTableView
				,	model:	Aleph.Model.Item
				}
			)	
						//	Configuro el modal de cantidad de items a agregar al carrito
			this.initQuantityModal()
			//	Inicializo el wizard del carrito de compras
			/*

			*/
			//	Busco el modal de confirmacion y lo asigno a variable del controlador
			this.$confirmRemoveModal
			=	this.element.find('#removeItem')
		}
	//	Configuracion del modal de cantidad de items a agregar
	,	initQuantityModal: function()
		{
			//	Busco el modal de cantidad de items y lo asigno a una variable del controlador
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
	}
)