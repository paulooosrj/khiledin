#!/usr/bin/env node

// import core from '../lib/core';
const core  = require('../lib/core');
const arg = require('arg');

const argsss = arg({
    '--out': String,
    '--generate': String
});

const trate = argumentInput => {
    const data = {};
    Object
        .keys(argumentInput)
        .filter(key => key !== "_")
        .map((key) => data[key.replace('--', '')] = argumentInput[key]);
    return data;
};

if(Object.keys(argsss).length > 0){
    core(trate(argsss));
}