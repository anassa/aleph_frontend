import	'can/control'
import	'can/construct/super'
import	'can/control/plugin'
import	'can/observe'
import	'can/event'
import	'can/view'

/**
 * @module {function} lib/typeahead/ <typeahead>
 * @parent can
 * @inherits can.Control 
 */
can.Control(
	'can.Typeahead'
,	{
		/**
	 	 * @signature `<$input.typeahead(options={})>`
		 * Creates a typeahead control.
		*/
		pluginName:	'typeahead'
	,	defaults:
		{
		/**
		 * @param {{}} params A parameter object with the following options:
		 * @option {Number} [minLength] The minimum character length needed before suggestions start getting rendered. Defaults to 3.
		 * @option {String} [displayKey] The Item key to display. Defaults to name.
		 * @option {Number} [timeout] The number of miliseconds to wait before requesting a suggestion. Defaults to 400.
		 * @option {EJS|Mustache|Stache} [view] Typeahead view.
		 * @option {Array|Object|function(query)} [source] Source data. Array of Objects, Array of Strings. Ajax Object or a function that shoudld return a deferred. 
		 * @option {Object} [query] Extra query to perfom on the request of suggestions.
		*/
			minLength:	3
		,	displayKey:	'name'
		,	timeout:	400
		,	view:	undefined
		,	source:		undefined
		,	query:		{}
		}
	}
,	{
		/**
		 * Initilalize the typeahead plugin.
		 * @param {node} HTML node element where the typeahead plugin will be initialized.
		 * @param {object} Typeahead plugin options. 
		 */
		init: function(element, options)
		{	
			this.suggestions
			=	new can.Map({items: []})
			
			this.$menu
			=	can.$('<div>')
					.css('position','relative')
					.appendTo(
						this.element.parent()
					)

			can.append(
				this.$menu
			,	can.view(
					this.options.view
				,	this.suggestions
				)
			)
		
			this.$menu.on(
				{
					mouseenter:	can.proxy(this.mouseenter,this)
				,	mouseleave:	can.proxy(this.mouseleave,this)
				}
			)
		}
		/**
		 * Build the query to be used in the ajax request or function.
		 * @param {String} Input value.
		 */
	,	buildQuery: function(query)
		{
			return	can.extend(
						{
							query:	query
						}
					,	this.options.query
					)
		}
		/**
		 * Create a filtered list using the query and render the menu
		 * @param {Array} Source Array to be filtered.
		 */
	,	filter: function(array)
		{
			var filtered
			=	array.filter(can.proxy(this.validateQuery,this))
			
			this.render(filtered)
		}
		/**
		 * Make an ajax request and render the menu.
		 * @param {Object} Ajax options to be mixed with the query.
		 */
	,	ajax: function(ajaxObject)
		{
			can.ajax(
				can.extend(
					ajaxObject	
				,	{
						data:	this.buildQuery(this.query)
					}
				)
			).then(
				can.proxy(this.render,this)
			)
		}
		/**
		 * Evaluate the source function.
		 * @param {Function(query)} Function to be evaluated.
		 */
	,	model: function(Model)
		{
			Model(this.buildQuery(this.query))
				.then(
					can.proxy(this.render,this)	
				)
		}
		/**
		 * Render the menu.
		 * @param {Array} Source Array filtered to be rendered.
		 */
	,	render: function(filtered)
		{
			this.suggestions.attr('items',filtered)
			
			filtered.forEach(can.proxy(this.setDataAndHighlight,this))
			
			this.$menu.find('a').on(
				{
					click:			can.proxy(this.select,this)
				,	onmouseover:	can.proxy(this.hover,this)
				}
			)
			
			this.$active
			=	this.$menu.find('li:first')
			
			this.$active.addClass('active')
			
			this.show()
		}
		/**
		 * Get the item string to be displayed.
		 * @param {Object|String|Map} String to be returned, plain javascript object or can.Map instance to select the display attribute from.
		 */
	,	getItemDisplay: function(item)
		{
			return	can.isPlainObject(item)
					?	item[this.options.displayKey]
					:	item instanceof can.Map
						?	item.attr(this.options.displayKey)
						:	item
		}
		/**
		 * Evaluate if the current item contains the query.
		 * @param {Object|String|Map} Item to be evualated.
		 */
	,	validateQuery: function(item)
		{
			return	this.getItemDisplay(item).toLowerCase().indexOf(this.query.toLowerCase()) > -1
		}
		/**
		 * Search looking for suggestions to be displayed depending on the typeahead source.
		 * @param {String} Query used to search.
		 */
	,	search: function(query)
		{
			this.query = query
			
			if	(can.isArray(this.options.source))
				this.filter(this.options.source)
			else
				if	(can.isPlainObject(this.options.source))
					this.ajax(this.options.source)
				else
					this.model(this.options.source)
		}
		/**
		 * Set the item data into the link and highlight the text queried.
		 * @param {Object|String|Map} Item to setted.
		 * @param {Number} Index of the item in the menu.
		 */
	,	setDataAndHighlight: function(item, index)
		{
			var $a
			=	can.$(this.$menu.find('a')[index])
			,	i
			=	this.getItemDisplay(item).toLowerCase().indexOf(this.query.toLowerCase())
			,	leftPart
			=	this.getItemDisplay(item).substr(0, i)
			,	middlePart
			=	this.getItemDisplay(item).substr(i, this.query.length)
			,	rightPart
			=	this.getItemDisplay(item).substr(i + this.query.length)

			$a
				.data('item',item)
				.html(
					$a.html()
						.replace(
							this.getItemDisplay(item)
						,	leftPart+'<strong>'+middlePart+'</strong>'+rightPart
						)
				)
		}

	,	lookup: function(el)
		{
			var	self = this
			this.searchTimer && clearTimeout(this.searchTimer)
			if	(can.$(el).val().length >= this.options.minLength)
				this.searchTimer
				=	setTimeout(
						function()
						{
							self.search(can.$(el).val())
						}
					,	this.options.timeout
					)
			else
				if	(this.shown == true)
					this.hide()
		}
	
	,	select: function(ev)
		{
			var	$a
			=	(ev)
				?	can.$(ev.target)
				:	this.$menu.find('li.active a')
			
			this.element.val(this.getItemDisplay(this.getItemDisplay($a.data('item'))))
			
			this.element.data('value',$a.data('item'))
			
			this.hide()
			
			this.$menu.find('li.active').removeClass('active')
			
			$a.parent().addClass('active')

			this.element.trigger('can.typeahead.selected')
		}
	
	,	move: function(keyCode)
		{
			switch(keyCode) {
				case 38:	//	arriba
					this.prev()
					break

				case 40:	//	abajo
					this.next()
					break
			}
		}
	
  	,	next: function(event)
		{
			this.$active.removeClass('active')
			
			var $next = this.$active.next()
		
			if	(!$next.length)
				$next = this.$menu.find('li:first')

			$next.addClass('active')

			this.$active = $next

			this.element.trigger('can.typeahead.move.next')
		}

	,	prev: function()
		{
			this.$active.removeClass('active')
			
			var	$prev = this.$active.prev()

			if (!$prev.length)
				$prev = this.$menu.find('li:last')

			$prev.addClass('active')
			
			this.$active = $prev
		
			this.element.trigger('can.typeahead.move.prev')
		}
	
	,	show: function()
		{
			this.element.trigger('can.typeahead.move.show')
			this.$menu.find('ul').css('display','block')
			this.shown = true
			this.element.trigger('can.typeahead.move.shown')
		}
	
	,	hide: function()
		{
			this.element.trigger('can.typeahead.move.hide')
			this.$menu.find('ul').css('display','none')
			this.shown = false
			this.element.trigger('can.typeahead.move.hidden')
		}
	
	,	'keyup': function(el, ev)
		{
			switch(ev.keyCode) {
				case 40:	// abajo
				case 38:	// arriba
					if (!this.shown || ev.shiftKey) return
					ev.preventDefault()
					ev.stopPropagation()
					this.move(ev.keyCode)
					break
				
				case 9:		// tab
				case 13:	// enter
					if (!this.shown) return
					this.select()
					break
				
				case 27:	// escape
					if (!this.shown) return
					this.hide()
					break
				
				default:
					this.lookup(el)
			}
		}
	
	,	'focus': function(el, ev)
		{
			this.focused = true
			if	(can.$(el).val().length >= this.options.minLength)
				this.show()
		}
	
	,	'blur': function (el, ev)
		{
			this.focused = false
			if (!this.mouseover && this.shown)
				this.hide()
		}
	
	,	hover:	function(ev)
		{
			this.$menu.find('li.active').removeClass('active')
			can.$(ev.target).parent().addClass('active')
		}
	
	,	mouseenter: function(ev)
		{
			this.mouseover = true
		}
	
	,	mouseleave: function(ev)
		{
			this.mouseover = false
			if (!this.focused && this.shown)
				this.hide()
		}
	}
)