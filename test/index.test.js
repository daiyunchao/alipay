import fs from 'fs'
import path from 'path'
import assert from 'assert'
import sinon from 'sinon'
import urllib from 'urllib'
import Alipay from '~/index'
import { signAlgorithm } from '../src/utils';


const read = filename => {
  return fs.readFileSync(path.resolve(__dirname, filename))
}

const options = {
  app_id: '2016080100137766',
  appPrivKeyFile: read('./keys/app_priv_key.pem'),
  alipayPubKeyFile: read('./keys/alipay_public_key.pem')
}

const service = new Alipay(options)

describe('ALIPAY unit test', function () {
  it('should allow create order', () => {
    const data = {
      subject: '辣条',
      out_trade_no: '1232423',
      total_amount: '100'
    }
    return service.createAppOrder(data)
      .then(result => {
        assert(result.code == 0, result.message)
        assert(result.message == 'success', result.message)
      })
  })

  // it('should allow create query order', () => {
  //   const data = {
  //     subject: 'TTFuckYou',
  //     out_trade_no: '1232423',
  //     total_amount: '0.1'
  //   }
  //   const return_url = "http://www.baidu.com"
  //   return service.createWebOrderURL(data, { return_url })
  //   .then(result => {
  //     assert(result.code == 0, result.message)
  //     assert(result.message == 'success', result.message)
  //   })
  // })

  // it('should allow query order', () => {
  //   const outTradeNo = '1232423'
  //   return service.queryOrder({ out_trade_no: outTradeNo })
  //   .then(result => {
  //     assert(result.code == -1, result.message)
  //     assert(result.message == 'error', result.message)
  //     assert(result.data.code === '40004')
  //     assert(result.data.sub_msg === '交易不存在')
  //   })
  // })

  // it('should reject makeNotifyResponse', () => {
  //   return service.makeNotifyResponse({})
  //     .then(result => {
  //       assert(result.code == -1, result.message)
  //     })
  // })
  //
  // it('should allow toaccountTransfer', () => {
  //   const sandbox = sinon.createSandbox()
  //   sandbox.stub(urllib, "create").callsFake(function () {
  //     return {
  //       request: () => Promise.resolve({
  //         data: {
  //           "alipay_fund_trans_toaccount_transfer_response": {
  //             "code": "10000",
  //             "msg": "Success",
  //             "out_biz_no": "3142321423432",
  //             "order_id": "20160627110070001502260006780837",
  //             "pay_date": "2013-01-01 08:08:08"
  //           },
  //           "sign": "ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE"
  //         }
  //       })
  //     }
  //   })
  //   return service.toaccountTransfer({
  //     out_biz_no: "1234",
  //     payee_type: 'ALIPAY_LOGONID',
  //     payee_account: "user666",
  //     amount: "100"
  //   }, {})
  //     .then(result => {
  //       sandbox.verifyAndRestore()
  //     })
  // });

  // it('should allow queryTransferOrder  ', () => {
  //   const data = {
  //     out_biz_no: '3142321423432',
  //     order_id: '20160627110070001502260006780837'
  //   }
  //   return service.queryTransferOrder(data).then(result => {
  //     assert(result["code"]==-1);
  //     assert(result.message == 'error', result.message);
  //     assert(result.data.code === '40004');
  //     assert(result.data.sub_msg === '转账订单不存在');
  //   });
  // })

  // it('should allow createAliPaySign ',()=>{
  //   const data={
  //     "apiname":"com.alipay.account.auth",
  //     "method":"alipay.open.auth.sdk.code.get",
  //     "app_id":"2016080100137766",
  //     "app_name":"mc",
  //     "biz_type":"openservice",
  //     "pid":"2088711543147294",
  //     "product_id":"APP_FAST_LOGIN",
  //     "scope":"kuaijie",
  //     "target_id":Date.now()+"",
  //     "auth_type":"AUTHACCOUNT",
  //     "sign_type":"RSA2"
  //   };
  //   return service.createAliPaySign(data).then(result => {
  //     console.log("sign ==>",result["sign"]);
  //     console.log("signStr ==>",result["signStr"]);
  //   })
  // })

  // it("should allow getUserInfoShare ",()=>{
  //   const data={
  //      "auth_token":"sdfdfd"
  //   };
  //   return service.getUserInfoShare({},data).then(result=>{
  //     assert(result["code"]==-1);
  //     assert(result.message == 'error', result.message);
  //     assert(result.data.code === '20001');
  //     assert(result.data.sub_msg === '无效的访问令牌');
  //   })
  // })


  it("should allow getSystemOAuthToken ", () => {
    const data = {
      "grant_type": "authorization_code",
      "code": "be724515676a461f92472b5056a1VA79"
    };
    return service.getSystemOAuthToken({},data).then(result => {
       console.log("result ==>",result);
       assert(result["code"] == -1);
       assert(result.message == 'error', result.message);
      
    })
  })
})