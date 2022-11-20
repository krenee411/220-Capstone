import React from 'react'
import axios from 'axios'

const axios = require('axios');

axios.get('http://webcode.me').then(resp => {

    console.log(resp.data);
});