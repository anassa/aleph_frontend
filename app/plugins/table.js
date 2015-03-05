import	'can/control'
import	'can/construct/super'
import	'can/control/plugin'
import	'can/observe'
import	'can/event'
import	'can/view'

can.Control(
	'can.Table'
,	{

		pluginName:	'table'
	,	defaults:
		{
			view:		false
		,	model:		undefined
		,	pagination:	false
		,	sort:		false
		,	search:		false
		}
	}
,	{
		init: function(element, options)
		{
			this.data
			=	new can.Map()

			this.filter
			=	new can.Map(
					{
						query:	{}
					,	limit:	this.options.pagination.limit	||	null
					,	skip:	this.options.pagination.skip	||	0
					}
				)

			can.append(
				this.element
			,	can.view(
					this.options.view
				,	this.data
				)
			)

			this.sort()

			this.fetch()

			this.filter.bind(
				'change'
			,	can.proxy(this.fetch,this)
			)
		}

	,	sort: function()
		{
			if	(this.options.sort)
				this.element.find('th.sorteable')
					.each(
						can.proxy(this.setSort,this)
					)
		}

	,	fetch: function()
		{
			this.element.trigger('fetch.can.table')

			this.options.model
				.findAll(
					this.filter.attr()
				).then(
					can.proxy(this.success,this)
				,	can.proxy(this.fail,this)
				)
		}

	,	success: function(response)
		{
			this.data.attr(response)

			this.count = this.data.attr('count')

			this.element.trigger('success.can.table')

			if	(this.options.pagination && !this.$pager)
				System.import('pagination')
					.then(
						can.proxy(this.setPagination,this)
					)
		}

	,	fail: function(response)
		{
			this.element.trigger('fail.can.table')
		}

	,	setPagination: function()
		{
			this.$pager
			=	can.$('<div>')
					.addClass('table-pagination')
					.appendTo(this.element)
					.pagination(
						{
							limit:		this.options.pagination.limit || 5
						,	count:		this.count
						,	maxIndex:	this.options.pagination.maxIndex || 5
						,	view:		this.options.pagination.view
						}
					)
		}

	,	setSort: function(index, th)
		{
			can.$(th)
				.append(
					can.$('<i>')
						.addClass('sort')
						.addClass(this.options.sort.plugin)
						.addClass(this.getSort('desc', can.$(th)))
				)
		}

	,	getSort: function(type,th)
		{
			return	can.isFunction(this.options.sort[type])
					?	this.options.sort[type]($th)
					:	this.options.sort[type]	
		}

	,	'.table-pagination pagechange.can.pagination': function(el, ev, pagination)
		{
			this.filter.attr(
				{
					limit:	pagination.limit
				,	skip:	pagination.page*pagination.limit - pagination.limit
				}
			)
		}

	,	'.table-form change.can.form': function(el, ev, query)
		{
			this.filter.attr(
				{
					query: 	query
				}
			)
		}

	,	'th.sorteable .sort click': function(i, ev)
		{
			this.filter.attr(
				'sort'
			,	can.sub(
					'{attr} {type}'
				,	{
						attr:	can.$(i).parent().attr('sort-attr')
					,	type:	can.$(i).hasClass(this.getSort('desc',can.$(i).parent())) ?	'ASC' : 'DESC'
					}
				)
			)

			can.$(i).toggleClass(this.getSort('desc',can.$(i)) +' '+ this.getSort('asc',can.$(i)))

		}

	}
)