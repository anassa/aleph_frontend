import fixture from 'can-fixture';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /proveedores': store.findAll,
  'GET /proveedores/{id}': store.findOne,
  'POST /proveedores': store.create,
  'PUT /proveedores/{id}': store.update,
  'DELETE /proveedores/{id}': store.destroy
});

export default store;
