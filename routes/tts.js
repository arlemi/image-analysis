/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var watson = require('watson-developer-cloud'),
  util = require('../util');

var textToSpeech = watson.text_to_speech({
  version: 'v1',
  username: process.env.USERNAME || '77a312f2-341a-4c65-bb87-12353cc4ca56',
  password: process.env.PASSWORD || 'TduoQUUsFbjy'
});

module.exports.voices = function(req, res, next) {
  textToSpeech.voices({}, function(error, result) {
    if (error)
      return next(error);
    else
      return res.json(result);
  });
};

module.exports.speak = function(req, res, next) {
  var params = {
    text: req.body.text,
    voice: req.body.voice || 'en-US_MichaelVoice',
    accept: 'audio/wav'
  };
  var stream = textToSpeech.synthesize(params);

  stream.on('error', next);

  return stream.pipe(res);
};