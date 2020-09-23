

describe('ApiController', () => {

  let apiController;

  beforeEach(() => {
    jest.resetModules();
    apiController = require('../../controllers/apiController.js');
    console.log(apiController)
  });

  describe('apiController: Promise<object> ', () => {
    it('deve validar o tipo', () => {

      jest.mock('../../models/user.js', () => {
        return jest.fn(() => 42);
      });

      console.log(apiController)

      expect(typeof apiController).toEqual("object");

    });
  });
});
