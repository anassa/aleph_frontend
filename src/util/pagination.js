import can from 'can';

var Paginate = can.Observe({
		defaults :
		{
			count: Infinity,
			offset: 0,
			limit: 5
		}
	}
,	{
		// Prevent negative counts
		setCount: function(newCount, success, error)
		{
			return newCount < 0 ? 0 : newCount;
		}
		// Prevent negative offsets
	,	setOffset: function(newOffset)
		{
			return newOffset < 0
					?	0
					:	Math.min(newOffset, ! isNaN(this.count - 1) ? this.count - 1 : Infinity )
		}
		// move next
	,	next: function()
		{
			this.attr('offset', this.offset + this.limit);
		}
		// move prev
	,	prev : function()
		{
			this.attr('offset', this.offset - this.limit )
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
		//	set page
	,	page: function(newVal)
		{
			if(newVal === undefined){
				return Math.floor( this.attr('offset') / this.attr('limit') )+1;
			} else {
				this.attr('offset', ( parseInt(newVal) - 1 ) * this.attr('limit') );
			}
		}
	//	get page count
	,	pageCount: function()
		{
			return	this.attr('count')
					?	Math.ceil( this.attr('count')	/ this.attr('limit') )
					:	null;
		}
	}
);

export default Paginate;