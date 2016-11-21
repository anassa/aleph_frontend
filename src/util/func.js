function createQuery(fields,value)
{
	return	fields.map(
				function(f)
				{
					var	fquery
					=	{};

					fquery[f.name]
					=	(f.type == String)
						?	{
								$regex:		value
							,	$options:	'i'
							}
						:	(f.type(value) || undefined)

					return	 fquery
				}
			);
}