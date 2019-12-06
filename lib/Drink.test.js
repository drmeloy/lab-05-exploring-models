const Drink = require('./Drink');

describe('Drink', () => {
  describe('name', () => {
    it('requires a name', () => {
      const drink = new Drink({
        isLiquid: true,
        isAlcoholic: false,
        size: '12 oz',
        bestEnjoyedWhen: 'morning'
      });

      const { errors } = drink.validateSync();
      expect(errors.name.message).toEqual('Path `name` is required.');
    });
  });

  describe('isLiquid', () => {
    it('requires isLiquid', () => {
      const drink = new Drink({
        name: 'coffee',
        isAlcoholic: false,
        size: '12 oz',
        bestEnjoyedWhen: 'morning'
      });

      const { errors } = drink.validateSync();
      expect(errors.isLiquid.message).toEqual('Path `isLiquid` is required.');
    });
  });

  describe('isAlcoholic', () => {
    it('requires isAlcoholic', () => {
      const drink = new Drink({
        name: 'coffee',
        isLiquid: true,
        size: '12 oz',
        bestEnjoyedWhen: 'morning'
      });
  
      const { errors } = drink.validateSync();
      expect(errors.isAlcoholic.message).toEqual('Path `isAlcoholic` is required.');
    });
  });

  describe('size', () => {
    it('requires size', () => {
      const drink = new Drink({
        name: 'coffee',
        isLiquid: true,
        isAlcoholic: false,
        bestEnjoyedWhen: 'morning'
      });
  
      const { errors } = drink.validateSync();
      expect(errors.size.message).toEqual('Path `size` is required.');
    });
  });

  describe('bestEnjoyedWhen', () => {
    it('requires bestEnjoyedWhen', () => {
      const drink = new Drink({
        name: 'coffee',
        isLiquid: true,
        isAlcoholic: false,
        size: '12 oz'
      });
  
      const { errors } = drink.validateSync();
      expect(errors.bestEnjoyedWhen.message).toEqual('Path `bestEnjoyedWhen` is required.');
    });

    it('must be either morning, afternoon, or evening', () => {
      const drink = new Drink({
        name: 'coffee',
        isLiquid: true,
        isAlcoholic: false,
        size: '12 oz',
        bestEnjoyedWhen: 'always'
      });

      const { errors } = drink.validateSync();
      expect(errors.bestEnjoyedWhen.message).toEqual('`always` is not a valid enum value for path `bestEnjoyedWhen`.');
    });
  });
});
