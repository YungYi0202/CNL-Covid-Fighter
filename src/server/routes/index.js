// import dataRoute from './data'
const dataRoute = require('./data');

const wrap = fn => (...args) => fn(...args).catch(args[2])

exports.routes = (app) => {
//   app.get('/api/getContents', wrap(dataRoute.GetContents))
    app.post('/api/addFootprint', wrap(dataRoute.AddFootprint));
    app.post('/api/addUser', wrap(dataRoute.AddUser));
}
