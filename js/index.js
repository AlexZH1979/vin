const CONTRACT_ADDRESS = "n1pzf1DmNXJvCKmrMjD8f8tDv4pQZKAYPeN";

class ContractApi{
    constructor(contractAddress = CONTRACT_ADDRESS) {
        let NebPay = require("nebpay");
        this.nebPay = new NebPay();
        this._contractAddress = contractAddress;
    }

    _simulateCall({ value = "0", callArgs = "[]", callFunction , callback }) {
        this.nebPay.simulateCall(this._contractAddress, value, callFunction, callArgs, {
            callback: function(resp){
                if(callback){
                    callback(resp);
                }
            }
        });
    }

    _call({ value = "0", callArgs = "[]", callFunction , callback }) {
        this.nebPay.call(this._contractAddress, value, callFunction, callArgs, {
            callback: function(resp){
                if(callback){
                    callback(resp);
                }
            }
        });
    }

}

class VenicleInformationContractApi extends ContractApi {
    add(text, cb) {
        this._simulateCall({
            callArgs : `["${text}"]`,
            callFunction : "add",
            callback: cb
        });
    }

    get(text, cb) {
        this._simulateCall({
            callArgs : `["${text}"]`,
            callFunction : "get",
            callback: cb
        });
    }
}