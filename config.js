require
	.config(
		{
			paths:
			{
				'jquery':				'jquery/jquery.1.11.1.min'
			,	'can':					'canjs/can.custom'
			/*
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
			*/
			}
			//	Carga de modulos no-amd. Bootstrap y plugins de jQuery.
		,	shim:
			{
				'canjs/can.custom':
				{
					deps:	['jquery']
				}
			}
		}
	)