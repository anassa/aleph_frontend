import QUnit from 'steal-qunit';
import { ViewModel } from './registros_usuario';

// ViewModel unit tests
QUnit.module('aleph-frontend/admin/registros_usuario');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the aleph-admin-registros-usuario component');
});
