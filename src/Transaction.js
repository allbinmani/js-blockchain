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
  
  // @return {Wallet|null}
  get Sender() {
    return this._sender;
  }
  
  // @return {Wallet|null}
  get Receiver() {
    return this._receiver;
  }
  
  // @return {Number}
  get Amount() {
    return Number(this._amount||0);
  }

  // @return {Date}
  get Timestamp() {
    return this._timestamp;
  }

  // @return {Hash} The Hash object
  get Hash() {
    if(!this._hash) {
      this._hash = Config.HASH_FUNC(this.HashFields.join(''));
    }
    return this._hash;
  }
  
  // @return {Array} The transaction field values
  get HashFields() {
    return [this.Id, this.Sender, this.Receiver, this.Amount, this.Timestamp.toISOString()];
  }

  static fromJSON(json, blockchain) {
    let nt = new Transaction(parseInt(json.id), 
                             new Wallet(json.sender, blockchain), 
                             new Wallet(json.receiver, blockchain), 
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
