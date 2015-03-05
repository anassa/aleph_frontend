(function () {
	// HTML5 Shiv v3.6.2 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed (Suporte HTML5 para navegadores viejos, ejemplo IE8)
	var supportsUnknownElements = false;

	(function () {
		try {
			var a = document.createElement('a');
			a.innerHTML = '<xyz></xyz>';

			supportsUnknownElements = a.childNodes.length == 1 || (function () {
				(document.createElement)('a');
				var frag = document.createDocumentFragment();
				return (
					typeof frag.cloneNode == 'undefined' ||
						typeof frag.createDocumentFragment == 'undefined' ||
						typeof frag.createElement == 'undefined'
					);
			}());
		} catch (e) {
			supportsUnknownElements = true;
		}
	}());


	System
		.config(
			{
				map:
				{
					'jquery/jquery':	'jquery'
				,	'can':				'bower_components/canjs/amd/can'
				//	APP MAP
				,	'plugins':			'app/plugins'
				,	'models':			'app/models'
				,	'styles':			'app/styles'
				,	'controls':			'app/controls'
				,	'util':				'app/util'
				,	'views':			'app/views'
				}
			,	paths:
				{
				//	$.jQuery
					'jquery':			'bower_components/jquery/dist/jquery.js'
				//	Twitter Bootstrap
				,	'bootstrap':		'bower_components/bootstrap/dist/js/bootstrap.js'
				,	'bootstrap.css':	'bower_components/bootstrap/dist/css/bootstrap.csscss'
				//	Bootstrap Validation
				,	'validator':		'bower_components/bootstrapvalidator/dist/js/bootstrapValidator.js'
				,	'validator.css':	'bower_components/bootstrapvalidator/dist/css/bootstrapValidator.csscss'
				//	FontAwesome
				,	'fontawesome.css':	'bower_components/fontawesome/css/font-awesome.csscss'
				//	Accounting
				,	'accounting':		'bower_components/accounting.js/accounting.js'
				//	Lodash
				,	'lodash':			'bower_components/lodash/lodash.js'
				}
			,	meta:
				{
					'jquery':
					{
						'exports':		'jQuery'
					,	'deps':			supportsUnknownElements ? undefined : ['can/lib/html5shiv.js']
					}
				}
			,	ext:
				{
					'mustache':			'util/mustache'
				}
			}
		);
	}
)();


System.buildConfig
=	{
		map:
		{	
			'can/util/util':	'can/util/domless/domless'
		}
	};