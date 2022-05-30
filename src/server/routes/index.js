// import dataRoute from './data'
const dataRoute = require('./data');
const email = require('./mail');

const wrap = fn => (...args) => fn(...args).catch(args[2])

exports.routes = (app) => {
//   app.get('/api/getContents', wrap(dataRoute.GetContents))
    app.post('/api/updateFootprint', wrap(dataRoute.UpdateFootprint));
    app.post('/api/addUser', wrap(dataRoute.AddUser));
    app.post('/api/updateUser', wrap(dataRoute.UpdateUser));
    app.post('/api/updateConfirmedRooms', wrap(dataRoute.UpdateConfirmedRooms));
    app.post('/api/sendEmail', wrap(email.sendEmail));
}
