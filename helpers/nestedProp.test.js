const nestedProp = require('./nestedProp');

describe('nestedProp(obj, ...props)', () => {
  it('returns a nested property', () => {
    const obj = { first: { second: { third: 'foo' }}};

    const result = nestedProp(obj, 'first', 'second', 'third');

    expect(result).toStrictEqual('foo');
  });
  it('otherwise returns null', () => {
    const noFirst = {};
    const noThirdNull = { first: { second: null}};
    const noThirdEmpty = { first: { second: {}}};

    const resultOfNoFirst = nestedProp(noFirst, 'first', 'second', 'third');
    const resultOfNoThirdNull = nestedProp(noThirdNull, 'first', 'second', 'third');
    const resultOfNoThirdEmpty = nestedProp(noThirdEmpty, 'first', 'second', 'third');

    expect(resultOfNoFirst).toBeNull();
    expect(resultOfNoThirdNull).toBeNull();
    expect(resultOfNoThirdEmpty).toBeNull();
  });
});