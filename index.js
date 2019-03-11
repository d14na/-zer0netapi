const express = require('express')
const app = express()

const Web3 = require('web3')

const ABI = {
    zeronetDb: require('./abi/zeronetDb'),
    zeroCache: require('./abi/zeroCache')
}

const DEFAULT_GAS = '200000'
// const DEFAULT_PORT = 3000

// const SOCKET_URL = 'https://socket.etherdelta.com'
const SOCKET_URL = 'https://socket.forkdelta.app'

/* Initialize blockchain provider. */
let provider = null

/* Select (http) provider. */
if (process.env.NODE_ENV === 'production') {
    provider = 'https://mainnet.infura.io/v3/f949bf662a6e4abca81bf0201f06b97d'
} else {
    provider = 'https://ropsten.infura.io/v3/f949bf662a6e4abca81bf0201f06b97d'
}

/* Initialize web3. */
const web3 = new Web3(new Web3.providers.HttpProvider(provider))

/* Add CORS. */
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

/**
 * Retrieve the endpoint.
 */
const _getEndpoint = function (_path) {
    /* Set current version. */
    const version = 'v1'

    if (process.env.NODE_ENV === 'production') {
        return `/${version}/${_path}`
    } else {
        return `/${version}/ropsten/${_path}`
    }
}

/**
 * Retrieve the data.
 */
const _retrieveData = function (_func, _key) {
    /* Initialize promise. */
    return new Promise(function (_resolve, _reject) {
        // console.log('KEY', key)

        /* Initialize contract address. */
        let contractAddress = ''

        /* Initialize network. */
        let network = null

        if (process.env.NODE_ENV === 'production') {
            // Mainnet
            contractAddress = '0xE865Fe1A1A3b342bF0E2fcB11fF4E3BCe58263af'
        } else {
            // Ropsten
            contractAddress = '0x4C2f68bCdEEB88764b1031eC330aD4DF8d6F64D6'
        }

        /* Initilize abi. */
        const abi = ABI.zeronetDb

        /* Initialize contract. */
        const myContract = new web3['eth'].Contract(
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

// https://db.0net.io/v1/getAddress
app.get(_getEndpoint('getAddress/:key'), async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('getAddress', hashKey)

    /* Return data. */
    res.json(data)
})

// https://db.0net.io/v1/getBool
app.get(_getEndpoint('getBool/:key'), async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('getBool', hashKey)

    /* Return data. */
    res.json(data)
})

// https://db.0net.io/v1/getBytes
app.get(_getEndpoint('getBytes/:key'), async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('getBytes', hashKey)

    /* Return data. */
    res.json(data)
})

// https://db.0net.io/v1/getInt
app.get(_getEndpoint('getInt/:key'), async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('getInt', hashKey)

    /* Return data. */
    res.json(data)
})

// https://db.0net.io/v1/getString
app.get(_getEndpoint('getString/:key'), async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('getString', hashKey)

    /* Return data. */
    res.json(data)
})

// https://db.0net.io/v1/getUint
app.get(_getEndpoint('getUint/:key'), async (req, res) => {
    /* Retrieve hash key. */
    const hashKey = req['params'].key

    /* Retrieve data. */
    const data = await _retrieveData('getUint', hashKey)

    /* Return data. */
    res.json(data)
})

/* Start listening. */
if (process.env.NODE_ENV === 'production') {
    /* Initialize default route. */
    app.get('*', (req, res) => res.send('<h3>Zer0net Eternal Database Gateway<br />[ MAINNET ]</h3>'))

    app.listen(3000, () => {
        console.log('\nStarted Zer0net Database v19.3.10 [ MAINNET ]\n')
    })
} else {
    /* Initialize default route. */
    app.get('*', (req, res) => res.send('<h3>Zer0net Eternal Database Gateway<br />[ ROPSTEN ]</h3>'))

    app.listen(4000, () => {
        console.log('\nStarted Zer0net Database v19.3.10 [ ROPSTEN ]\n')
    })
}
