
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);

describe('server', () => {

    it('test the thing', () => {
        chai.expect(true).to.eq(true)
    });

    it('test the thing', () => {
        chai.request(app)
        .get('/item/1')
        .end((err, res) => {
            chai.expect(res.status).to.eq(200);
            chai.expect(res.name).to.eq("Harry Potter");
            done();
        })
        chai.expect(true).to.eq(true)
    });
    
})



module.exports = app;