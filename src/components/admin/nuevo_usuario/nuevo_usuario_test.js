import QUnit from 'steal-qunit';
import { ViewModel } from './nuevo_usuario';

// ViewModel unit tests
QUnit.module('aleph-frontend/admin/nuevo_usuario');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the aleph-admin-nuevo-usuario component');
});
