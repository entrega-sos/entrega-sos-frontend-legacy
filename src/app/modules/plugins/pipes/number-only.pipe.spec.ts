import { NumberOnlyPipe } from './number-only.pipe';

describe('NumberOnlyPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberOnlyPipe();
    expect(pipe).toBeTruthy();
  });
});
