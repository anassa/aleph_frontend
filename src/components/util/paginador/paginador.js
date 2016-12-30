import Component from 'can-component';
import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import './paginador.less!';
import template from './paginador.stache!';

export const ViewModel = Map.extend(
	{
		configured:
		{
			value: false
		}
	,	data:
		{
			value: undefined
		,	set: function(promise)
			{
				var	self
				=	this;

				promise
					.then(
						function(result)
						{
							if (!self.configured) {
								self.count = result.total;
								self.offset = result.skip;
								self.limit = result.limit;
								self.createPages();
								self.configured = true;
							}
						}
					);

				return promise;	
			}
		}
	,	reset:
		{
			set: function(r)
			{
				var	self
				=	this;

				this.data
					.then(
						function(result)
						{
							self.count = result.total;
							self.offset = 0;
							self.limit = result.limit;
							self.createPages();
						}
					)
				return r;
			}
		}
	,	count:
		{
			value:	0
		}
	,	offset:
		{
			value:	0
		}
	,	limit:
		{
			value:	5
		}
	,	pages:
		{
			value: 0
		}
		// set current page
	,	setPage: function(page)
		{
			this.offset = ( parseInt(page.number) - 1 ) * this.limit;
			
			this.pages.each(
				function(p)
				{
					if (p.active) {
						p.active = false;
					}
				}
			);

			page.active = true;
		}
		// create pages array
	,	createPages: function()
		{
			var	self
			=	this;

			self.pages
			=	Array.from(Array(self.pageCount()).keys())
					.map(
						function(x)
						{
							return	{
										number:	x+1
									,	active: (x == self.page()) ? true : false
									}
						}
					);
		}
		// move to next page
	,	next: function()
		{
			this.setPage(this.pages[this.page()+1]);
		}
		// move to previus page
	,	prev : function()
		{
			this.setPage(this.pages[this.page()-1]);
		}
		//	check next
	,	canNext : function()
		{
			return this.offset < (this.count - this.limit);
		}
		//	check prev
	,	canPrev: function()
		{
			return this.offset > 0;
		}
		//	get page
	,	page: function(newVal)
		{
			return Math.floor( this.offset / this.limit );
		}
	//	get page count
	,	pageCount: function()
		{
			return	this.count
					?	Math.ceil( this.count / this.limit )
					:	1;
		}
	,	init: function()
		{
			var	self
			=	this;

			this
				.bind(
					'offset'
				,	function(obj,newVal,oldVal)
					{
						if (newVal != undefined) {
							self.query.$skip = newVal;
						}
					}
				)
		}
	}
);

export default Component.extend({
  tag: 'aleph-paginador',
  viewModel: ViewModel,
  view: template
});