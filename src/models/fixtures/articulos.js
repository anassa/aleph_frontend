import fixture from 'can-fixture';

const store = fixture.store([{
  _id: 0,
  description: 'First item'
}, {
  _id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /articulos': store.findAll,
  'GET /articulos/{_id}': store.findOne,
  'POST /articulos': store.create,
  'PUT /articulos/{_id}': store.update,
  'DELETE /articulos/{_id}': store.destroy
});

export default store;
