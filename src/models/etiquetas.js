import can from 'can';
import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import 'can/map/define/define';

export const Etiquetas = can.Map.extend(
	{
		define:
		{
			saved:
			{
				serialize: function()
				{
					return undefined;
				}
			}
		,	descripcion:
			{
				value: ''
			}
		,	tipo:
			{
				value: 'label-success'	
			}
		}
	}
);

Etiquetas.List = can.List.extend(
	{
		Map: Etiquetas
	}
,	{}
);

export default Etiquetas;
