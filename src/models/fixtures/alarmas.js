import fixture from 'can-fixture';

const store = fixture.store([{
  _id: 0,
  description: 'First item'
}, {
  _id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /alarmas': store.findAll,
  'GET /alarmas/{_id}': store.findOne,
  'POST /alarmas': store.create,
  'PUT /alarmas/{_id}': store.update,
  'DELETE /alarmas/{_id}': store.destroy
});

export default store;
