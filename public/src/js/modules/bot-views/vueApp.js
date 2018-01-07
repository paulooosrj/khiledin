module.exports = (data = {}) => {
    var app = new Vue({
        'el': '.app',
        'data': data
    });
    return app;
};