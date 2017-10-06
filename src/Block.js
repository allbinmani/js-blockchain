"use strict";

import Config from './Config';
import Transaction from './Transaction';

export default class Block {

  constructor(id, version, timestamp, transactions=[], previousHash=false, nonce=0) {
    this._id = id;
    this._version = version;
    this._timestamp = timestamp;
    this._transactions = transactions;
    this._previousHash = previousHash;
    this._nonce = nonce;
    this._hash = false;
  }
  
  addTransaction(transaction) {
    transaction.Id = this._transactions.length;
    this._transactions.push(transaction);
    this._hash = false;
    this._thash = false;
  }
  
  get Id() {
    return this._id;
  }
  
  get Version() {
    return this._version;
  }
  
  get Timestamp() {
    return this._timestamp;
  }
  
  set Timestamp(new_timestamp) {
    this._timestamp = new_timestamp;
    this._hash = false; // new timestamp, new hash
  }
  
  get Transactions() {
    return this._transactions;
  }
  
  // @return {String}
  get PreviousHash() {
    return this._previousHash;
  }
  
  // @return {String}
  set PreviousHash(previousHash) {
    this._previousHash = Util.zeropad(previousHash);
    this._hash = false; // new previous hash, new hash
  }
  
  // @param {Number} New nonce / invalidates any currently calculated hash
  set Nonce(nonce) {
    this._hash = false; // new nonce, new hash
    this._nonce = nonce;
  }
  
  // @return {Number} Nonce
  get Nonce() {
    return Number(this._nonce);
  }

  get Hash() {
    if(this._hash === false) {
        this._hash = Config.HASH_FUNC(Config.HASH_FUNC(this.HashFields.join('')).toString());
    }
    return this._hash;
  }
  
  get TransactionsHash() {
    if(!this._thash) {
      // TODO: Merkle Root the transactions
      this._thash = Config.HASH_FUNC(this.Transactions.map(t => t.Hash.toString()).join('')).toString();
    }
    return this._thash;
  }
  
  get HashFields() {
    return [this.Version, 
            this.Id, 
            this.Timestamp.toISOString(), 
            this.TransactionsHash, 
            this.PreviousHash, 
            Config.COINBASE1, 
            this.Nonce.toString(16)];
  }

  static fromJSON(json) {

  }

  toJSON() {
    return {id: this.Id,
            version: this.Version,
            timestamp: this.Timestamp,
            thash: this.TransactionsHash,
            phash: this.PreviousHash,
            nonce: this.Nonce.toString(16),
            transactions: this.Transactions.map(t => t.toJSON()),
            hash: this.PreviousHash ? this.Hash.toString() : undefined
          };
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }

  pretty() {
      return JSON.stringify(this.toJSON(), false, 2);
  }
}
