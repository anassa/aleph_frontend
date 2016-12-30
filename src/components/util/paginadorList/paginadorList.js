import Component from 'can-component';
import Map from 'can-define/map/map';
import List from 'can-define/list/list';
import 'can-map-define';
import './paginadorList.less!';
import template from './paginadorList.stache!';

export const ViewModel = Map.extend(
	{
		define:
		{
			data:
			{
				value: List
			,	set: function(list)
				{
					this.attr('count', list.length);
					this.createPages();
					return list;
				}
			}
		,	reset:
			{
				set: function(r)
				{
					this.attr('count', 0);
					this.attr('offset',0);
					this.createPages();
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
		}
		// set current page
	,	setPage: function(page)
		{
			this.attr('offset', ( parseInt(page.number) - 1 ) * this.attr('limit') );
			this.attr('pages').each(
				function(p)
				{
					if (p.active) {
						p.attr('active',false);
					}
				}
			)
			page.attr('active',true)
			this.attr(
				'query.current'
			,	{
					firstPage:	this.attr('offset')
				,	lastPage:	this.attr('offset') + this.attr('limit') - 1
				}
			)
		}
		// create pages array
	,	createPages: function()
		{
			var	self
			=	this;

			self.attr(
				'pages'
			,	Array.from(Array(self.pageCount()).keys())
					.map(
						function(x)
						{
							return	{
										number:	x+1
									,	active: (x == self.page()) ? true : false
									}
						}
					)
			);
		}
		// move to next page
	,	next: function()
		{
			this.setPage(this.attr('pages').attr(this.page()+1))
		}
		// move to previus page
	,	prev : function()
		{
			this.setPage(this.attr('pages').attr(this.page()-1))
		}
		//	check next
	,	canNext : function()
		{
			return this.attr('offset') < this.attr('count') - this.attr('limit')
		}
		//	check prev
	,	canPrev: function()
		{
			return this.attr('offset') > 0
		}
		//	get page
	,	page: function(newVal)
		{
			return Math.floor( this.attr('offset') / this.attr('limit') );
		}
	//	get page count
	,	pageCount: function()
		{
			return	this.attr('count')
					?	Math.ceil( this.attr('count')	/ this.attr('limit') )
					:	1;
		}
	,	updateQuery: function()
		{
			this.attr(
				'query.current'
			,	{
					firstPage:	this.attr('offset')
				,	lastPage:	this.attr('offset') + this.attr('limit') - 1
				}
			);
		}
	,	init: function()
		{
			var	self
			=	this;

			this.attr('data')
				.bind(
					'change'
				,	function(event, index, action)
					{
						self.attr('count',self.attr('data').length)
						self.createPages()
						switch(action) {
							case 'remove':
								self.attr(
									'query.current'
								,	{
										firstPage:	self.attr('offset')
									,	lastPage:	self.attr('offset') + self.attr('limit') - 1
									}
								);
							case 'add':
								self.setPage(self.attr('pages').attr(self.attr('pages').length-1))
								break;
						}
					}
				);
		}
	}
);

export default Component.extend({
  tag: 'aleph-paginadorList',
  viewModel: ViewModel,
  view: template
});