"use strict";

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

var bot = {};

bot.calls = {};
bot.entrys = [];

bot.train = function(msg, out) {
  bot.entrys.push({
    input: new RegExp("^" + msg + "$", "i"),
    output: out
  });
};

bot.run_train = function(msg) {
  return bot.entrys.map(function(entry) {
    var input = entry.input;
    var output = entry.output;
    var level = entry.level;
    var status = input.test(msg);

    return {
      input: input,
      output: output,
      status: status
    };
  });
};

bot.respond = function() {
  for (
    var _len = arguments.length, entrys = Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    entrys[_key] = arguments[_key];
  }

  return {
    run: function run(call) {
      return {
        save: function save(intent) {
          entrys.map(function(entry) {
            return bot.train(entry, intent);
          });
          bot.calls[intent] = call;
        }
      };
    }
  };
};

bot.run = async function(msg, callback = function(){}) {
  var run = bot.run_train(msg);
  var bot_active = run.filter(function(e) {
    return e.status;
  });
  bot_active =
    Array.isArray(bot_active) && bot_active.length > 0 ? bot_active[0] : null;
  if (bot_active !== null) {
    var fn = bot_active.output;
    var input = bot_active.input;
    var _args = Array.from(msg.match(input)) || [];
    _args = _args.length > 0 ? _args.slice(1) : [];
    await bot.calls[fn]
      .bind({
        receive: msg,
        intent: fn,
        args: function args() {
          return _args;
        },
        retorno: callback
      })
      .apply(undefined, _toConsumableArray(_args));
  }
};

module.exports = bot;
