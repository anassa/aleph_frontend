import Component from 'can-component';
import Map from 'can-define/map/map';
import './nuevo_articulo.less!';
import template from './nuevo_articulo.stache!';

import UnidadesDeMedida from 'aleph-frontend/models/unidadesDeMedida';
import Articulos from 'aleph-frontend/models/articulos';
import Proveedores from 'aleph-frontend/models/proveedores';

export const ViewModel = Map.extend(
	{
		unidadesDeMedida:
		{
			value: function()
			{
				return UnidadesDeMedida.getList();
			}
		}
	,	articulo:
		{
			value:	Articulos
		,	set: function(a)
			{
				this.resetPaginadorProveedores = !this.resetPaginadorProveedores;
				$('a[href="#datos"]').click();
				return a;
			}
		}
	,	proveedores:
		{
			value: function()
			{
				return	Proveedores.getList()
			}
		}
	,	resetPaginadorProveedores:
		{
			value:	false
		}
	,	resetPaginador:
		{
			value:	false
		}
	,	errorMsg:
		{
			value:	null
		}
	,	query:
		{
			value: function()
			{
				var self
				=	this;

				var query
				=	new Map(
						{
							$skip: 0
						}
					);

				query
					.bind(
						'change'
					,	function()
						{
							self.proveedores
							=	Proveedores.getList(query.get());
						}
					);

				return query;
			}
		}
	,	searchInput:
		{
			value:	undefined
		}
	,	listQuery:
		{
			value: function()
			{
				var self
				=	this;

				var query
				=	new Map(
						{
							current:
							{
								firstPage:	0
							,	lastPage:	4
							}
						}
					);

				query
					.bind(
						'change'
					,	function()
						{
							self.articulo.proveedores
								.map(
									function(prov, i)
									{
										prov.visible
										=	(i >= query.current.firstPage && i <= query.current.lastPage);
									}
								);
						}
					);

				return query;
			}
		}
	,	searchProveedor: function(value)
		{
			var value
			=	this.searchInput
			,	fields
			=	[
					{
						name: 'denominacion'
					,	type: String	
					}
				,	{
						name: 'dni_cuit'
					,	type: String	
					}
				];

			this.query.$or
			=	value.length
				?	createQuery(fields,value)
				:	undefined;
		}
	,	addProveedor: function(prov)
		{
			if (this.articulo.proveedores.indexOf(prov) == -1) {
				prov.visible = true;
				this.articulo.proveedores.push(prov);
			} else {
				$.notify(
					{
						message:	'El Proveedor '+prov.denominacion+' ya fue agregado al articulo.' 
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
		}
	,	removeProveedor: function(el)
		{
			this.articulo.proveedores.splice($(el).parents('tr').index(),1);
		}
	,	toggleAjuste: function(el)
		{
			if (!$(el).is(':checked')) {
				this.articulo.ajuste = '';
				$('[name="ajuste"]').val('')
			}

			$('[name="ajuste"]')
				.attr(
					'disabled'
				,	(!$(el).is(':checked'))
					?	'disabled'
					:	null
				);
		}
	,	cancelArticulo: function()
		{
			this.articulo = new Articulos({});
		}
	,	saveArticulo: function(el)
		{
			var $button
			=	$(el)
			,	self
			=	this;

			$button.button('loading');

			var	newMode
			=	self.articulo.isNew();

			self.articulo.save()
				.then(
					function(data)
					{
						$button.button('reset');

						if (newMode) {
							self.articulo = new Articulos({});
						} else {
							$(el).parents('.modal').modal('hide')
							self.articulo.tempStock = data.stock;
							$('#ajuste-switch').click();
						}

						$.notify(
							{
								message:	'Artículo '+(newMode ? 'creado' : 'actualizado')+' correctamente.' 
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

						$('#nuevo-articulo-form').find('[name]').each(
							function()
							{
								$(this).parents('.form-group')
									.removeClass('has-error has-success')
							}
						);

						self.errorMsg = '';

					}
				,	function(data)
					{
						if (data.code == 409)
							data.errors[data.message.match( /\w*_1\w*/)[0].split('_1')[0]] = 'duplicado'
						
						$('#nuevo-articulo-form').find('[name]').each(
							function()
							{
								$(this).parents('.form-group')
									.removeClass('has-error has-success')
									.addClass(
										(data.errors[$(this).attr('name')])
										?	'has-error'
										:	'has-success'
									)
							}
						);

						self.errorMsg = 'Datos incorrectos, verifique los datos ingresados.';

						$button.button('reset');
					}
				)
		}
	}
);

export default Component.extend(
	{
		tag: 'aleph-stock-nuevo-articulo'
	,	viewModel: ViewModel
	,	view: template
	}
);