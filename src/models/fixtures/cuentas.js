import fixture from 'can-fixture';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /cuentas': store.findAll,
  'GET /cuentas/{id}': store.findOne,
  'POST /cuentas': store.create,
  'PUT /cuentas/{id}': store.update,
  'DELETE /cuentas/{id}': store.destroy
});

export default store;
