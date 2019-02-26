const express = require('express')
const app = express()

const Web3 = require('web3')

const ABI = {
    zeronetDb: require('./abi/zeronetDb'),
    zeroCache: require('./abi/zeroCache')
}

const DEFAULT_GAS = '200000'
const DEFAULT_PORT = 3000

// const SOCKET_URL = 'https://socket.etherdelta.com'
const SOCKET_URL = 'https://socket.forkdelta.app'

const MAINNET_PROVIDER = 'https://mainnet.infura.io/v3/f949bf662a6e4abca81bf0201f06b97d'
const ROPSTEN_PROVIDER = 'https://ropsten.infura.io/v3/f949bf662a6e4abca81bf0201f06b97d'

const web3 = {
    mainnet: new Web3(new Web3.providers.HttpProvider(MAINNET_PROVIDER)),
    ropsten: new Web3(new Web3.providers.HttpProvider(ROPSTEN_PROVIDER))
}

/* Add CORS. */
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

const _retrieveData = function (_network, _func, _key) {
    /* Initialize promise. */
    return new Promise(function (_resolve, _reject) {
        // console.log('KEY', key)

        /* Initialize contract address. */
        let contractAddress = ''

        /* Set network. */
        if (_network === 'mainnet') {
            contractAddress = '0xE865Fe1A1A3b342bF0E2fcB11fF4E3BCe58263af'
        } else {
            contractAddress = '0x4C2f68bCdEEB88764b1031eC330aD4DF8d6F64D6'
        }

        /* Initilize abi. */
        const abi = ABI.zeronetDb

        /* Initialize contract. */
        const myContract = new web3[_network]['eth'].Contract(
            abi, contractAddress)

        const options = { }

        const handler = function (_error, _result) {
            if (_error) return _reject(_error)

            console.log('RESULT', _result)

            return _resolve(_result)
        }

        switch(_func) {
        case 'getAddress':
            return myContract.methods
                .getAddress(_key).call(options, handler)
        case 'getBool':
            return myContract.methods
                .getBool(_key).call(options, handler)
        case 'getBytes':
            return myContract.methods
                .getBytes(_key).call(options, handler)
        case 'getInt':
            return myContract.methods
                .getInt(_key).call(options, handler)
        case 'getString':
            return myContract.methods
                .getString(_key).call(options, handler)
        case 'getUint':
            return myContract.methods
                .getUint(_key).call(options, handler)
        default:
            return _reject('Oops! That function DOES NOT exist!')
        }
    })
}

/*******************************************************************************

  MAINNET

*******************************************************************************/

// https://db.0net.io/v1/getAddress
app.get('/v1/getAddress/:key', async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('mainnet', 'getAddress', hashKey)

    /* Return data. */
    res.json(data)
})

// https://db.0net.io/v1/getBool
app.get('/v1/getBool/:key', async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('mainnet', 'getBool', hashKey)

    /* Return data. */
    res.json(data)
})

// https://db.0net.io/v1/getBytes
app.get('/v1/getBytes/:key', async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('mainnet', 'getBytes', hashKey)

    /* Return data. */
    res.json(data)
})

// https://db.0net.io/v1/getInt
app.get('/v1/getInt/:key', async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('mainnet', 'getInt', hashKey)

    /* Return data. */
    res.json(data)
})

// https://db.0net.io/v1/getString
app.get('/v1/getString/:key', async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('mainnet', 'getString', hashKey)

    /* Return data. */
    res.json(data)
})

// https://db.0net.io/v1/getUint
app.get('/v1/getUint/:key', async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('mainnet', 'getUint', hashKey)

    /* Return data. */
    res.json(data)
})

/*******************************************************************************

  ROPSTEN

*******************************************************************************/

// https://db.0net.io/v1/ropsten/getAddress
app.get('/v1/ropsten/getAddress/:key', async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('ropsten', 'getAddress', hashKey)

    /* Return data. */
    res.json(data)
})

// https://db.0net.io/v1/ropsten/getBool
app.get('/v1/ropsten/getBool/:key', async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('ropsten', 'getBool', hashKey)

    /* Return data. */
    res.json(data)
})

// https://db.0net.io/v1/ropsten/getBytes
app.get('/v1/ropsten/getBytes/:key', async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('ropsten', 'getBytes', hashKey)

    /* Return data. */
    res.json(data)
})

// https://db.0net.io/v1/ropsten/getInt
app.get('/v1/ropsten/getInt/:key', async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('ropsten', 'getInt', hashKey)

    /* Return data. */
    res.json(data)
})

// https://db.0net.io/v1/ropsten/getString
app.get('/v1/ropsten/getString/:key', async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('ropsten', 'getString', hashKey)

    /* Return data. */
    res.json(data)
})

// https://db.0net.io/v1/ropsten/getUint
app.get('/v1/ropsten/getUint/:key', async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('ropsten', 'getUint', hashKey)

    /* Return data. */
    res.json(data)
})

/* Initialize default route. */
app.get('*', (req, res) => res.send('Welcome to the Zer0netDb Gateway..'))

/* Start listening. */
app.listen(DEFAULT_PORT, () => {
    console.log(`Zer0net Database is listening on port ${DEFAULT_PORT}!`)
})
