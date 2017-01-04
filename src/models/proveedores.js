import connect from 'can-connect';
import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import set from "can-set";
import feathers from 'aleph-frontend/feathers';

//	service related
import feathersServiceBehavior from 'can-connect-feathers/service';
import dataParse from 'can-connect/data/parse/';
import realtime from 'can-connect/real-time/';
import construct from 'can-connect/constructor/';
import constructStore from 'can-connect/constructor/store/';
import constructOnce from 'can-connect/constructor/callbacks-once/';
import canMap from 'can-connect/can/map/';
import canRef from 'can-connect/can/ref/';
import dataCallbacks from 'can-connect/data/callbacks/';

//	app models
import Cuentas from 'aleph-frontend/models/cuentas';

// Use feathersClient.service(url) to create a service
const proveedoresService = feathers.service('/api/proveedores');

export const Proveedores = Map.extend(
	{
		articulos:
		{
			value: List
		,	serialize: function(list)
			{
				return	_.map(
							list.get()
						,	function(art)
							{
								return	_.omit(
											art
										,	['proveedores', 'usuario']
										)
							}
						)
			}
		}
	,	etiquetas:
		{
			value: List
		,	set: function(e)
			{	
				this.parsedEtiquetas
				=	e.map(
						function(e)
						{
							return	e.descripcion
						}
					).join(', ')

				return e;
			}
		,	serialize: function(list)
			{
				return 	list.map(
							function(i)
							{
								return	{
											tipo:			i.tipo
										,	descripcion:	i.descripcion
										}
							}
						).get()
			}
		}
	,	parsedEtiquetas:
		{
			serialize: function()
			{
				return undefined;
			}
		}
	,	cuenta:
		{
			value: Cuentas
		,	set: function(a)
			{
				this.tieneCuenta = a ? a._id : false;
				return a;
			}
		,	serialize: function(acc)
			{
				return this.tieneCuenta ? acc.get() : undefined;
			}
		}
	,	tempMontoLimite:
		{
			value: ''
		,	serialize: function()
			{
				return undefined;
			}
		}
	,	tieneCuenta:
		{
			value: false
		,	type: Boolean
		,	set: function(s)
			{
				if (this.cuenta)
					if (s) {
						this.cuenta.montoLimite = this.tempMontoLimite;
						this.tempMontoLimite = 0;
					}	else {
						this.tempMontoLimite = this.cuenta.montoLimite;
						this.cuenta.montoLimite = '';
					}

				return s
			}
		,	serialize: function()
			{
				return undefined;
			}
		}
	}
);

Proveedores.List = List.extend(
	{
		'#': Proveedores
	}
);

Proveedores.algebra = new set.Algebra(
	set.comparators.id('_id')
);

Proveedores.connection = connect(
	[
		feathersServiceBehavior
	,	dataParse
	,	construct
	,	constructStore
	,	constructOnce
	,	canMap
	,	canRef
	,	dataCallbacks
	,	realtime
	]
,	{
		idProp:	'_id'
	,	Map:	Proveedores
	,	List:	Proveedores.List
	,	name:	'proveedores'
	,	feathersService: proveedoresService
	,	algebra: Proveedores.algebra
	}
);

tag('proveedores-model', Proveedores.connection);

export default Proveedores;