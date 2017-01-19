import Component from 'can-component';
import Map from 'can-define/map/map';
import './nuevo_remito.less!';
import template from './nuevo_remito.stache!';
import 'bootstrap-datepicker/js/bootstrap-datepicker.js'
import 'bootstrap-datepicker/js/locales/bootstrap-datepicker.es.js'
// Importamos el modelo ordenes de compra.
import OrdenesDeCompra from 'aleph-frontend/models/ordenesDeCompra';
// Traemos el modelo de remitos
import Remitos from 'aleph-frontend/models/remitos';

export const ViewModel = Map.extend(
	{
		// Traemos las ordenes de compras
		ordenesDeCompra:
		{
			// Se traen todas las ordenes de compra de la DB.
			value: function(){
				// console.log(OrdenesDeCompra.getList())
				return	OrdenesDeCompra.getList()
			}
		}
		// Variable donde vamos a cargar la OC seleccionada.
	,	ordenDeCompraSelected:{
			value: null
		}
		
		// No se para que voy a usar esta query, pero neri lo hace... XD
	,	query:
		{
			value: function()
			{
				var self = this;
				var query =	new Map({ $skip: 0 });

				query
					.bind(
						'change'
					,	function()
						{
					
							self.ordenesDeCompra
							=	OrdenesDeCompra.getList(query.get());
						}
					);

				return query;
			}
		}	
		// Funcion para agregar una OC al remito
	,	addOrdenDeCompra: function(oc)
		{
			// Se carga en la variable orden de compra la seleccionada.
			this.ordenDeCompraSelected = oc;
		} 
		// Funcion para cancelar el remito nuevo.
	,	cancelRemito: function(el)
		{
			this.ordenDeCompraSelected = null;
		}
		// Filtrar las OC por fechas.
	,	findRemitoFecha: function(el)
		{
			/*Te cuento algo? ...
			lo que mas odio en mi vida es trabajar con fechas....
			saludos.
			*/

			// Capturamos la fecha desde los datepicker
			var desde
			,	hasta;
			
			// Esto que estoy haciendo, es muy desprolijo. pero funciona... ya fue.
			if(
				$('#desde').val() && 
				$('#hasta').val()
			) {
				desde = $('#desde').val() + ' 00:00:00.000Z'
				hasta = $('#hasta').val() + ' 00:00:00.000Z'
			}else {
				desde = '2001-01-01 01:01:01.000Z'
				hasta = '2070-01-01 01:01:01.000Z'
			}
		 
			// Traemos las ordenes filtradas, y las seteamos
			// en la var ordenesDeCompra
			this.ordenesDeCompra 
			=	OrdenesDeCompra.getList(
					{
						// Parametros de fecha.
						createdAt:
						{
							$gte: desde
						,	$lt: hasta
						}
					}
				);

			// Utilizar este formato.
			// $gte: '2016-12-22 05:15:13.648Z',
			// $lt: '2017-12-22 05:15:13.648Z'
			 
		}
		// funcion para crear un nuevo remito
	,	nuevoRemito: function(el){

			// Esto se hace porque sino hay cosas que no funcionan
			var esta = this;
			var thisordenDeCompra = this.ordenDeCompraSelected;
			
			// Creamos el remito seteando los parametros, y lo guardamos a lo negro.
			var nuevoRemito = new Remitos(
				{
					codigo: 5454
				,	codigoProv: 5454
				,	codigoOC: 54545
				,	articulos: this.ordenDeCompraSelected.articulos.get()
				}
			).save()
				.then(
					// Funcion success
					function(data)
					{

						// Data contien el remito guardado
						// Lo asociamos a nuestra Orden de compra
						thisordenDeCompra.remitos.push(data)
						// Modificamos atributos de la observacion
						thisordenDeCompra.observacion
						=	$('#observacion').val();

						// La actualizamos
						thisordenDeCompra.save()
						
						// Lanzamos una notificacion de que todo funciono bien.
						$.notify(
							{
								message:'Remito creado correctamente'
							}
						,	{ 
								type: 'success'
						,		placement:
								{
									from: 'bottom'
								,	align: 'right'
								}
							}
						)

						// Se borra la OC actualmente seleccionada
						esta.ordenDeCompraSelected = null;
						
						// Se borra la descripcion
						esta.descripcion = null;

					}
				// funcion BARDO.
				,	function()
					{
					
						// Lanzamos una notificacion de error, para que el man
						// se enoje con la vida.
						$.notify(
							{
								message:	'No se pudo crear el remito'
							}
						,	{ 
								type: 'danger'
							,	placement:
								{
									from: 'bottom'
								,	align: 'right'
								}
							}
						);
					}
				)
				// Aca termina el then.
		}
	}
);

export default Component.extend(
	{
		tag: 'aleph-stock-nuevo-remito'
	,	viewModel: ViewModel
	,	events:
		{
			'inserted': function(el, ev){
				$('.date input').datepicker({
					language: 'es',
					format: 'yyyy-mm-dd',
					autoclose: true
				});
			}
		}
	,	view: template
	}
);