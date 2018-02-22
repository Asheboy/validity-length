# validity-length

Validity style validator to ensure the length of a property

## Installation

```
npm install validity-length --save
```

```
yarn add validity-length
```

## Usage

Below is a simple example for usage with schemata and save:

``` js
var length = require('validity-length')
  , schemata = require('schemata')

var schema = schemata(
    { width:
      { type: String
      , validators: { [ length(1,10) ] }
      }
    })
```
