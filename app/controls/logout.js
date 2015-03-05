import	'can/control'
import	logoutModalView from 'views/common/logout.mustache!'

can.Control(
	'Aleph.Logout'
,	{
		defaults:
		{
			view:	logoutModalView
		,	user:	undefined
		}
	}
,	{
		init: function(element, options)
		{
			//	Inserto la vista del modal
			can.append(
				element
			,	can.view(
					options.view	
				)
			)
		}
	//	Escucho que se aprete el boton log-me-out
	,	'.log-me-out click': function(el, ev)
		{
			//	Muestro el modal
			this.element.find('#logoutModal').modal('show')
		}
	//	El deslogeo fue satisfactorio
	,	succededToLogout: function()
		{
			//	Notifico qu el logeo fue satisfactorio
			console.log("LOGOUT SUCCESFULL", arguments)
			//	Oculto el modal
			this.element.find('#logoutModal').modal('hide')
			//	Limpio el hash
			window.location.hash=""
			//	Recargo la ventan
			window.location.reload()
		}
	//	El deslogeo fallo
	,	failedToLogout: function()
		{
			//	Notifico que fallo el deslogeo
			console.log("LOGOUT FAILED", arguments)
		}
	//	Escucho que se aprete el boton salir
	,	'#logoutModal .btn-primary click': function(el, ev)
		{
			//	Activo el boton "Saliendo..."
			$(el).button('loading')
			//	Solicito el deslogeo
			this.options.user
				.logout()
				.then(
					can.proxy(this.succededToLogout,this)
				,	can.proxy(this.failedToLogout,this)
				).always(
					function()
					{
						//	Desactivo el boton "Guardando..."
						$(el).button('reset')
					}
				)
		}
	}
)