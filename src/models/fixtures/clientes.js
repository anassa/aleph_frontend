import fixture from 'can-fixture';

const store = fixture.store([{
  _id: 0,
  description: 'First item'
}, {
  _id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /clientes': store.findAll,
  'GET /clientes/{_id}': store.findOne,
  'POST /clientes': store.create,
  'PUT /clientes/{_id}': store.update,
  'DELETE /clientes/{_id}': store.destroy
});

export default store;
