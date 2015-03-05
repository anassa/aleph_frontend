import	'can/construct'
import	'can/construct/super'
import	'can/control'

//	Toggle del atributo disabled
$.fn.toggleDisabled
=	function()
	{
		return	this
					.each(
						function()
						{
							this.disabled	=	!this.disabled;
						}
					)
	}
//	Cuenta la cantidad de atributos que hay en un objeto.
can.objectLength = function(ob)
{
	var count = 0;
	for (var k in ob) {
		if (ob.hasOwnProperty(k)) {
			++count;
		}
	}
	return	count
}
//	Obtiene los datos del formulario
can.getFormData = function($form,visible)
{
	return	can.deparam(
				$form.serialize()
			)

}
//	Resetea un formulario
can.resetForm = function($form)
{
	return	$form[0].reset()
}