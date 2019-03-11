# Zer0net Database

> A public clearnet / internet gateway to the zer0net's eternal (blockchain) database.

## Endpoints

Mainnet - __https://db.0net.io/v1/__

Ropsten - __https://db-ropsten.0net.io/v1/__

## Data Keys

> Generated from the keccak256 hash of the data identifier.

`keccak256('aname.zerocache')`

> returns

`0x75341c765d2ccac618fa566b11618076575bdb7620692a552e9ac9ff23a5540c`

## Examples

##### Retrieve ZeroCache address

> aname.zerocache

`https://db.0net.io/v1/getAddress/0x75341c765d2ccac618fa566b11618076575bdb7620692a552e9ac9ff23a5540c`

##### ZeroPriceIndex [ 0GOLD / DAI ] Last

> zpi.0GOLD.DAI

`https://db.0net.io/v1/getUint/0x3cf0b17677519ce01176e2dde0338a4d8962be5853b2d83217cc99c527d5629a`
