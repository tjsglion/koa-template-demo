
const expect = require('chai').expect;
const SafeRequest = require('../../utils/safeRequest');
function sum (a, b) {
  return a + b;
}

// describe('测试sum', () => {
//   it('测试sum(1,2) toBe 3', () => {
//     expect(sum(1,2)).to.be.equal(3);
//   });
// });

describe('测试safeRequest.js接口', () => {
  it('测试fetch接口', async () => {
    let url = `/sdhighway/events/getEvents?pageNo=1&pageSize=10`;
    const safeRequest = new SafeRequest(url);
    const result = await safeRequest.fetch();
    console.log(result);
    expect(result).to.be.an('object');
  });
});