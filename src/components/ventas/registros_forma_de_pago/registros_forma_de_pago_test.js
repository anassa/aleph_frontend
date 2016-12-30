import QUnit from 'steal-qunit';
import { ViewModel } from './registros_forma_de_pago';

// ViewModel unit tests
QUnit.module('aleph-frontend/ventas/registros_forma_de_pago');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the aleph-ventas-registros-forma-de-pagos component');
});
