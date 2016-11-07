import fixture from 'can-fixture';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /solicitudes': store.findAll,
  'GET /solicitudes/{id}': store.findOne,
  'POST /solicitudes': store.create,
  'PUT /solicitudes/{id}': store.update,
  'DELETE /solicitudes/{id}': store.destroy
});

export default store;
