(
	{
		baseUrl: "."
	,	map:
		{
			'*':
			{
				'css':	'bower_components/require-css/css'
			} 
		}
	,	paths:
		{
		//	Librerias
			'jquery':		'bower_components/jquery/dist/jquery.min'
		,	'can':			'bower_components/canjs/amd/can'
		,	'bootstrap':	'bower_components/bootstrap/dist'
		,	'fontawesome':	'bower_components/fontawesome'
		//	Accessos APP
		//	Base
		,	'common':	'app/common'
		,	'models':	'app/models'
		,	'views':	'app/views'
		,	'images':	'app/images'
		,	'styles':	'app/styles'
		//	Modulos
		,	'venta':	'app/venta'
		,	'compra':	'app/compra'
		,	'stock':	'app/stock'
		,	'usuario':	'app/usuario'
		,	'reporte':	'app/reporte'
		}
	,	modules: [
		{
			name: 	'app/aleph',
			exclude:['bower_components/require-css/normalize'],
		}
	,	optimizeCss: "node"
	}
)