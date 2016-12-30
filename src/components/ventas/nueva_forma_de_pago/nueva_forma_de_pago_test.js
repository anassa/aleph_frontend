import QUnit from 'steal-qunit';
import { ViewModel } from './nueva_forma_de_pago';

// ViewModel unit tests
QUnit.module('aleph-frontend/ventas/nueva_forma_de_pago');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the aleph-ventas-nueva-forma-de-pagos component');
});
