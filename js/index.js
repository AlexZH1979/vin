const CONTRACT_ADDRESS = "n1wKCgN67DEi2SdXYyymr35vqJFmiEXaNL6";

class ContractApi {
    constructor(contractAddress = CONTRACT_ADDRESS) {
        let NebPay = require("nebpay");
        this.nebPay = new NebPay();
        this._contractAddress = contractAddress;
    }

    _simulateCall({value = "0", callArgs = "[]", callFunction, callback, listener}) {
        this.nebPay.simulateCall(this._contractAddress, value, callFunction, callArgs, {
            callback: function (resp) {
                if (callback) {
                    callback(resp);
                }
            },
            listener: function (resp) {
                if (listener) {
                    listener(resp);
                }
            }
        });
    }

    _call({value = "0", callArgs = "[]", callFunction, callback,listener}) {
        var serialNumber = this.nebPay.call(this._contractAddress, value, callFunction, callArgs, {
            callback: function (resp) {
                if (callback) {
                    callback(resp);
                }
            },
            listener: function (resp) {
                if (listener) {
                    listener(resp);
                }
            }
        });
    }

}

class VenicleInformationContractApi extends ContractApi {
    add(obj, cb) {
        const data = Base64.encode(JSON.stringify(obj));
        this._call({
            callArgs: `["${data}"]`,
            callFunction: "add",
            callback: cb
        });
    }

    get(data, cb, ls) {
        var serialNumber = this._call({
            callArgs: `["${data}"]`,
            callFunction: "getByVin",
            callback: cb,
            listener: ls
        });
    }
    getByWallet(text, cb) {
        this._call({
            callArgs:  [text],
            callFunction: "getByWallet",
            callback: cb
        });
    }
}