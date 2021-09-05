/**
 * Code Attribution
 */

class BaseResponse{
  constructor(code, msg, data){
    this.code=code;
    this.msg = msg;
    this.data=data;
  }

  toObject(){
    return {
      'code': this.code,
      'msg': this.msg,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString
    }
  }
}

module.exports = BaseResponse;
