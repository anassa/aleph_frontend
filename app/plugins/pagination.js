import	'can/control'
import	'can/construct/super'
import	'can/control/plugin'
import	'can/observe'
import	'can/event'
import	'can/view'

/*
	@nombre
	Frame.Pagination
	
	@descripción

	Manejo del Paginador, renderiza un paginador.
	
	@utilización

	Se debe instanciar el controlador en un elemento html. 
*/
can.Control(
	'can.Pagination'
,	{
		pluginName:	'pagination'
	,	defaults:
		{
		//	Limite de items por pagina
			limit:		5
		//	Cantidad de items por defecto
		,	count:		0
		//	Cantidad de paginas a mostrar
		,	maxIndex:	5
		//	Vista del paginador
		,	view:		undefined
		//	Numero de pagina por defecto
		,	defaultPage:1
		,	samePageError: false
		,	invalidPageError: false
		}
	}
,	{
	//	Inicializo la tabla
		init: function(element,options)
		{
			this.viewData
			=	new can.Map(
					{
						page:	[]			
					}
				)
			this.config()
			//	Inserto el paginador
			can.append(
				element
			,	can.view(
					options.view
				,	this.viewData
				)
			)
			//	Obtengo el UL
			this.$pages
			=	element.find('ul.pagination')
			//	Obtengo el Ir a
			this.$goTo
			=	element.find('form input[name=page]')
			//	Obtengo el select limit
			this.$itemPerPage
			=	element.find('form select[name=limit]')
			//	Activo la primer page
			this.activatePage(this.options.defaultPage)
		}
		//	Configuro el plugin
	,	config: function()
		{
			//	Valido que el maxIndex sea un numero impar, si no lo es, le sumo 1
			this.options.maxIndex
			=	(this.options.maxIndex % 2)
				?	this.options.maxIndex
				:	(this.options.maxIndex + 1)
			//	Seteo la pagina medio de rango
			this.middlePage
			=	Math.ceil(this.options.maxIndex/2)
			//	Creo el offset seguro segun el maxIndex
			this.safeOffset
			=	(this.options.maxIndex -1)/2
			//	Obtengo el numero de paginas dividiendo count/limit y redondeandolo hacia arriba
			this.numberOfPages
			=	Math.ceil(this.options.count/this.options.limit)
			//	Seteo una lista con las paginas
			this.paginationPages
			=	this.getPageList()
			//	Obtengo las paginas visibles definidas por el maxIndex
			var pagesList
			=	this.getVisiblePages()
			//	Modifico el viewData con las paginas, si tengo que mostrar la lista
			this.viewData.attr('page',(pagesList.length > 0) ? new can.List(pagesList) : false)
		}
	//	Obtengo las paginas disponibles en base al count y al limit
	,	getPageList: function()
		{
			//	Obtengo un listado de paginas, ejemplo, si numberOfPages = 5 -> listOfPages = [{page: 1}, {page: 2},...,{page: 5}]
			var	listOfPages
			=	[]
			for (var i = 0; i < this.numberOfPages; i++)
				listOfPages.push({pageNumber: (i+1)})
			//	Devuelvo un lista observable con las  paginas
			return	listOfPages
		}
	//	Obtengo las paginas visibles en base al medio de rango
	,	getVisiblePages: function()
		{
			var	leftOffset
			=	this.middlePage - this.safeOffset
			,	rightOffset
			=	this.middlePage + this.safeOffset

			return	this.paginationPages.filter(
						function(page,i)
						{
							return	page.pageNumber >= leftOffset
								&&	page.pageNumber <= rightOffset
						}
					)
		}
	//	Activa la pagina
	,	activatePage: function(pageNumber)
		{
			//	Guardo el numero de pagina
			this.currentPage
			=	pageNumber
			//	Busco la pagina activa y la desactivo
			this
				.$pages
					.find('li.active')
							.removeClass('active')
			//	Busco la pagina que se pasa como argumento y la activo
			this
				.$pages
					.find('a[jump-key='+pageNumber+']')
						.parent('li')
							.addClass('active')
			//	Modficio el placeholder del Ir a
			this.$goTo.attr('placeholder',pageNumber)
			//	Lanzo el evento indicando que se cambio de pagina
			this
				.element
					.trigger(
						'pagechange.can.pagination'
					,	{
							page:	pageNumber
						,	limit:	this.options.limit
						}
					)
			//	Habilito las paginas correspondientes
			this.enablePages()
			//	Habilito los dots
			this.enableDots()
		}
	//	Setea la pagina actual
	,	setPage: function(pageNumber)
		{
			this.middlePage
			=	(pageNumber <=	this.safeOffset)
				?	Math.ceil(this.options.maxIndex/2)
				:	(pageNumber >=	(this.paginationPages.length - this.safeOffset))
					?	this.paginationPages.length - this.safeOffset
					:	pageNumber
			//	Verifico que la pagina actual no se vaya del medio de rango
			this.viewData.attr('page',this.getVisiblePages())
			//	Activo la pagina
			this.activatePage(pageNumber)
		}
	//	Deshabilito las paginas
	,	disablePages: function()
		{
			//	Deshabilito todos los li
			this.$pages.find('li:not(.dots)').addClass('disabled')
			//	Deshabilito el input
			this.$goTo.addClass('disabled')
			//	Deshabilito el select
			this.$itemPerPage.addClass('disabled')
		}
	//	Habilito las paginas
	,	enablePages: function()
		{
			//	Habilitos todos
			this.$pages.find('li:not(.dots)').removeClass('disabled')
			//	Deshabilito los li anterior y primero si estoy en la pagina uno
			if	(this.currentPage ==  1)
				this.$pages.find('li:not(.dots) a.jump-previous,li:not(.dots)  a.jump-first').parent('li').addClass('disabled')
			//	Deshabilito los li siguiente y ultimo si estoy en la ultima pagina
			if	(this.currentPage ==  this.paginationPages.length)
				this.$pages.find('li:not(.dots) a.jump-next,li:not(.dots)  a.jump-last').parent('li').addClass('disabled')
			//	Habilito el input
			this.$goTo.removeClass('disabled')
			//	Habilito el select
			this.$itemPerPage.removeClass('disabled')
		}
	//	Habilito los dots
	,	enableDots: function()
		{
			//	Obtengo la primer pagina
			var	firstVisiblePage
			=	this.viewData.attr('page').attr(0).attr('pageNumber')
			//	Obtengo la ultima pagina
			,	lastVisiblePage
			=	this.viewData.attr('page').attr(this.viewData.attr('page').length-1).attr('pageNumber')
			//	Verifico si la primer pagina visible es la primer pagina del paginador
			if	(firstVisiblePage == 1)
				this.element.find('.dots:first').remove()
			else
				this.$pages.find('.jump-to:first').parent().before(
					can.$('<li>').addClass('disabled dots').append(can.$('<a>').addClass('link').html('...'))
				)
			//	Verifico si la ultima pagina visible es la ultima pagina del paginador
			if	(lastVisiblePage == this.numberOfPages)
				this.element.find('.dots:last').remove()
			else
				this.$pages.find('.jump-to:last').parent().after(
					can.$('<li>').addClass('disabled dots').append(can.$('<a>').addClass('link').html('...'))
				)

		}
	//	Valido la pagina del input page
	,	isValidPage: function(pageNumber)
		{
			//	Valido que sea diferente a la pagina actual
			if	(pageNumber == this.currentPage)	{
				this.options.samePageError && this.options.samePageError(this.$goTo)
				return	false
			}
			//	Valido que sea exista la pagina
			if 	((pageNumber < 1 && pageNumber) || (pageNumber > this.paginationPages.length))	{
				this.options.invalidPageError && this.options.InvalidPageError(this.$goTo)
				return	false
			}
			return	true
		}
	//	Escucho cuando se oculte el tooltipo
	,	'hidden.bs.tooltip': function(el,ev)
		{
			//	Destruyo el tooltip
			this.$goTo.tooltip('destroy')
		}
	//	Escucho que se aprete la primer pagina
	,	'ul.pagination li:not(".disabled") a.jump-first click': function(el,ev)
		{
			//	Deshabilito todos los li para evitar que vuelvan apretar una pagina y se envieen varias peticiones
			this.disablePages()
			//	Triggeo el cambio de pagina
			this.setPage(1)
		}
	//	Escucho que se aprete el boton pagina anterior
	,	'ul.pagination li:not(".disabled") a.jump-previous click': function(el,ev)
		{
			//	Deshabilito todos los li para evitar que vuelvan apretar una pagina y se envieen varias peticiones
			this.disablePages()
			//	Triggeo el cambio de pagina
			this.setPage(this.currentPage-1)
		}
	//	Escucho que se aprete una pagina
	,	'ul.pagination li:not(".disabled") a.jump-to click': function(el,ev)
		{
			//	Deshabilito todos los li para evitar que vuelvan apretar una pagina y se envieen varias peticiones
			this.disablePages()
			//	Triggeo el cambio de pagina
			this.setPage(parseInt(can.$(el).attr('jump-key')))
		}
	//	Escucho que se aprete el boton pagina siguiente
	,	'ul.pagination li:not(".disabled") a.jump-next click': function(el,ev)
		{
			//	Deshabilito todos los li para evitar que vuelvan apretar una pagina y se envieen varias peticiones
			this.disablePages()
			//	Triggeo el cambio de pagina
			this.setPage(this.currentPage+1)
		}
	//	Escucho que se aprete la ultima pagina
	,	'ul.pagination li:not(".disabled") a.jump-last click': function(el,ev)
		{
			//	Deshabilito todos los li para evitar que vuelvan apretar una pagina y se envieen varias peticiones
			this.disablePages()
			//	Triggeo el cambio de pagina
			this.setPage(this.paginationPages.length)
		}
	//	Escucho que cambie el valor del input page
	,	'form.pagination input[name=page] change': function(el,ev)
		{
			//	Valido que la pagina sea valida
			if	(this.isValidPage(parseInt(can.$(el).val())))	{
				//	Deshabilito todos los li para evitar que vuelvan apretar una pagina y se envieen varias peticiones
				this.disablePages()
				//	Triggeo el cambio de pagina
				this.setPage(parseInt(can.$(el).val()))
			}
		}
	//	Escucho que cambie el valor del select limi
	,	'form.pagination select[name=limit] change': function(el,ev)
		{
			//	Deshabilito todos los li para evitar que vuelvan apretar una pagina y se envieen varias peticiones
			this.disablePages()
			//	Cambio el valor maximo
			this.options.limit = parseInt(can.$(el).val())
			//	Reconfiguro el plugin
			this.config()
			//	activo la pagina uno
			this.activatePage(1)
		}
	}
)