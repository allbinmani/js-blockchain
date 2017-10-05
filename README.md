# js-blockchain

## Description

Proof of concept javascript blockchain with basic wallet and miner.

## Disclaimer

This is simply a Proof of Concept implementation to familiarize myself with blockchains, it most likely is wrong in a lot of places, lacks any (thought of) any security features, and will most likely only serve well as an enjoyable reading excercise for bored peers.


## Usage

Clone repository, install dependencies:

```sh
bash$ git clone git@github.com:allbinmani/js-blockchain.git
bash$ cd js-blockchain; npm i
```

Generate code for your own unique blockchain, with it's unique `COINBASE1`, `GENESIS_WALLET`, `GENESIS_AMOUNT` and `HASH_FUNC`:

```sh
bash$ DIFFICULTY=5 COINBASE1=012345678A0B0C0D0E0F0D0E0A0D0C0DE0010C01337400000000000000000000 \
GENESIS_WALLET=I_AM_GENESIS GENESIS_AMOUNT=10000000 \
VERSION=1.0 HASH_FUNC=SHA256 \
	  npm run build
```

`HASH_FUNC` can be selected from any hashing function provided by [`ezcrypto`](https://www.npmjs.com/package/ezcrypto), namely `SHA1`, `SHA256` and `MD5`. 
The `Block` hash is always double-hashed, transaction hashes are single hashed, but not using [Merkle Trees]() yet.

Create blockchain and initial blocks / transactions:

```sh
sh$ npm run init_blockchain
```

The first block (the genesis block) is generated, containing a single transaction from and to the `GENESIS_WALLET` with `amount` set to `GENESIS_AMOUNT`.

Another block is also mined, with a few dummy transactions back and forth to two temporary wallets. Once that block has been mined, its added to the blockchain, which is then printed as a JSON struct to stdout.


## Roadmap

    - Implement basic blockchain. DONE
    - Implement fundaental miner. DONE
    - Implement fundamental wallet. DONE
    
    - TODO: Merkle trees
    - TODO: (De)serialization to/from disk

    - FUTURE: Networking, confirmations, consensus, etc etc etc ?


## Contributing

Read the code, understand it's style and inner workings, then fork and submit pull requests, I might merge them, I might not.


## Donate

I hear it's a good idea to have your wallets exposed these days. If you appreciate the work, consider dropping off a few cents.

**BTC**: `34xzza81xCAtGEceZpPgMAJqw9MW2pHTFR`
**ZEC**: `t1fmXwQR4whaGCXAsfjAZn9vJb1oGUe3eF3`
**XMR**: `47KecbLbAfQUdBLvusz7dbWzrcgLsMLhs1kBQxsamGfth5GXuUttfnzjXqrT3anyZ22j7DEE74GkbVcQFyH2nNiC3eeiE4T`
**BCN**: `27WeDqwNuqJApsvks5JtBFDuShsz6iqrmVV48yXjuMai2x4BBAK28Nidi7ok6B5SQT6UXUtQgusruCoXbqUZm8VJAgbnitW`

Any tiny coin is appreciated, and will encourage me to produce and share more free code.
