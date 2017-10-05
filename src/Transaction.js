"use strict";

import Wallet from './Wallet';
import Config from './Config';

export default class Transaction {

  constructor(id, sender, receiver, amount, timestamp, hash=void 0) {
    this._id = id;
    this._sender = sender;
    this._receiver = receiver;
    this._amount = amount;
    this._timestamp = timestamp === void 0 ? new Date() : timestamp;
    this._hash = hash !== void 0 ? hash : this.Hash;
  }
  
  get Id() {
    return this._id;
  }
  
  set Id(id) {
    this._hash = false;
    this._id = id;
  }
  
  get Sender() {
    return this._sender;
  }
  
  get Receiver() {
    return this._receiver;
  }
  
  get Amount() {
    return this._amount;
  }
  
  get Timestamp() {
    return this._timestamp;
  }

  get Hash() {
    if(!this._hash) {
      this._hash = Config.HASH_FUNC(this.HashFields.join(''));
    }
    return this._hash;
  }
  
  get HashFields() {
    return [this.Id, this.Sender, this.Receiver, this.Amount, this.Timestamp.toISOString()];
  }

  static fromJSON(json) {
    let nt = new Transaction(parseInt(json.id), 
                             new Wallet(json.sender), 
                             new Wallet(json.receiver), 
                             parseFloat(json.amount), 
                             new Date(timestamp));
    let hash = nt.Hash.toString();
    if(hash !== json.hash) {
      throw new Error('Hash mismatch in deserialized transaction!');
    }
    return nt;
  }
  
  toJSON() {
    return {
      id: this.Id,
      sender: this.Sender.Id,
      receiver: this.Receiver.Id,
      amount: this.Amount,
      timestamp: this.Timestamp.toISOString(),
      hash: this.Hash.toString()
    };
  }
  
  toString() {
    return JSON.stringify(this.toJSON());
  }

  pretty() {
      return JSON.stringify(this.toJSON(), false, 2);
  }
}
