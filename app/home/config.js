require
	.config(
		{
			//	Mapeos del requirejs
			map:
			{
				'*':
				{
					//	Se mapea que si se comienza la carga con css!, lo que se cargue va a pasar primero por el require-css
					'css':	'bower_components/require-css/css'
				} 
			}
			//	Caminos cortos para determinar donde buscar los componentes, asi no se escribe la url completa.
		,   paths:
			{
				'jquery':				'bower_components/jquery/dist/jquery.min'
			,	'can':					'bower_components/canjs/amd/can'
			,	'bootstrap':			'bower_components/bootstrap'
			,	'fontawesome':			'bower_components/fontawesome'
			,	'localstorage':			'bower_components/canjs-localstorage/can.localstorage'
			,	'typeahead':			'bower_components/typeahead/bootstrap3-typeahead'
			,	'lodash':				'bower_components/lodash/dist/lodash'	
			,	'draggabilly':			'bower_components/draggabilly/draggabilly'
			//	Start Draggabilly Dependencies
			,	'classie':				'bower_components/classie'
			,	'eventie':				'bower_components/eventie'
			,	'get-style-property':	'bower_components/get-style-property'
			,	'eventEmitter':			'bower_components/eventEmitter'
			,	'get-size':				'bower_components/get-size'
			//	End
			,	'datetimepicker':		'bower_components/bootstrap3-datetimepicker/build'
			//	Start DateTimerPicker Dependencies
			,	'moment':				'bower_components/moment/moment'
			,	'time-locale-es':		'bower_components/bootstrap3-datetimepicker/src/js/locales/bootstrap-datetimepicker.es'
			//	END
			,	'validator':			'bower_components/bootstrapValidator/dist'
			,	'iCheck':				'bower_components/iCheck'
			//	Modulos
			,	'venta':	'app/venta'
			,	'compra':	'app/compra'
			,	'stock':	'app/stock'
			,	'usuario':	'app/usuario'
			,	'reporte':	'app/reporte'
			,	'home':		'app/home'
			}
			//	Carga de modulos no-amd. Bootstrap y plugins de jQuery.
		,	shim:
			{
				//	Bootstrap Affix (http://getbootstrap.com/javascript/#affix)
				'bootstrap/js/affix':
				{
					deps:	['jquery']
				,	exports:'$.fn.affix'
				}
				//	Bootstrap Alert (http://getbootstrap.com/javascript/#alerts)
			,	'bootstrap/js/alert':
				{
					deps:	['jquery']
				,	exports:'$.fn.alert'
				}
				//	Bootstrap Buttons (http://getbootstrap.com/javascript/#buttons)
			,	'bootstrap/js/button':
				{
					deps:	['jquery']
				,	exports:'$.fn.button'
				}
				//	Bootstrap Carousel (http://getbootstrap.com/javascript/#carousel)
			,	'bootstrap/js/carousel':
				{
					deps:	['jquery']
				,	exports:'$.fn.carousel' }
				//	Bootstrap Collapse (http://getbootstrap.com/javascript/#collapse)
			,	'bootstrap/js/collapse':
				{
					deps:	['jquery']
				,	exports:'$.fn.collapse'
				}
				//	(http://getbootstrap.com/javascript/#dropdowns)
			,	'bootstrap/js/dropdown':
				{
					deps:	['jquery']
				,	exports:'$.fn.dropdown'
				}
				//	Bootstrap Modal (http://getbootstrap.com/javascript/#modals)
			,	'bootstrap/js/modal':
				{
					deps:	['jquery']
				,	exports:'$.fn.modal'
				}
				//	Bootstrap Popover (http://getbootstrap.com/javascript/#popovers)
			,	'bootstrap/js/popover':
				{
					deps:	['jquery','bootstrap/js/tooltip']
				,	exports:'$.fn.popover'
				}
				//	Bootstrap Scrollspy (http://getbootstrap.com/javascript/#scrollspy)
			,	'bootstrap/js/scrollspy':
				{
					deps:	['jquery']
				,	exports:'$.fn.scrollspy'
				}
				//	Bootstrap Tab (http://getbootstrap.com/javascript/#tabs)
			,	'bootstrap/js/tab':
				{
					deps:	['jquery']
				,	exports:'$.fn.tab'
				}
				//	Bootstrap Tooltip (http://getbootstrap.com/javascript/#tooltips)
			,	'bootstrap/js/tooltip':
				{
					deps:	['jquery']
				,	exports:'$.fn.tooltip'
				}
				//	Bootstrap Transition (http://getbootstrap.com/javascript/#transitions)
			,	'bootstrap/js/transition':
				{
					deps:	['jquery']
				,	exports:'$.fn.transition'
				}
				//	Bootstrap 3 Typeahead (https://github.com/bassjobsen/Bootstrap-3-Typeahead)
			,	'typeahead':
				{
					deps:	['jquery']
				,	exports:'$.fn.typeahead'
				}
				//	BootstrapValidator (http://bootstrapvalidator.com)
			,	'validator/js/bootstrapValidator':
				{
					deps:	['jquery']
				,	exports:'$.fn.bootstrapValidator'
				}
				//	jQuery iCheck (http://fronteed.com/iCheck/)
			,	'iCheck/icheck':
				{
					deps:	['jquery']
				,	exports:'$.fn.iCheck'
				}
				//	Bootstrap 3 DateTimePicker (https://github.com/Eonasdan/bootstrap-datetimepicker)
			,	'datetimepicker/js/bootstrap-datetimepicker.min':
				{
					deps:	['jquery']
				,	exports:'$.fn.datetimepicker'
				}
			}
		}
	)