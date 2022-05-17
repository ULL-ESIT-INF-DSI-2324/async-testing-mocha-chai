import 'mocha';
import {expect} from 'chai';
import {weatherInfoPromises} from '../src/asyncFunctionsPromises';

describe('Asynchronous function weatherInfoPromises tests (using async/await)', () => {
  it('weatherInfoPromises should get weather information', async () => {
    const data = await weatherInfoPromises('Tenerife, Spain');
    expect(data.body.location.name).to.be.equal('Tenerife');
  });

  it('weatherInfoPromises should provide an error', async () => {
    try {
      await weatherInfoPromises('12wherever');
    } catch (err) {
      expect(err).to.be.equal('request_failed');
    }
  });
});
