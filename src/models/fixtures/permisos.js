import fixture from 'can-fixture';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /permisos': store.findAll,
  'GET /permisos/{id}': store.findOne,
  'POST /permisos': store.create,
  'PUT /permisos/{id}': store.update,
  'DELETE /permisos/{id}': store.destroy
});

export default store;
