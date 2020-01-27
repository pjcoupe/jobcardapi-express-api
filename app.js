"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_service_1 = require("./mongo-service");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var plating = require('./routes/plating');
let reporter = function (type, ...rest) {
    // remote reporter logic goes here
};
/* handle an uncaught exception & exit the process */
process.on('uncaughtException', (err) => __awaiter(void 0, void 0, void 0, function* () {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    yield mongo_service_1.MongoService.getInstance().closeConnection();
    reporter("uncaughtException", (new Date).toUTCString(), err.message, err.stack);
    process.exit(1);
}));
/* handle an unhandled promise rejection */
process.on('unhandledRejection', (reason, promise) => {
    console.error('unhandled rejection:', reason.message || reason);
    reporter("uncaughtException", (new Date).toUTCString(), reason.message || reason);
});
var mongoService = mongo_service_1.MongoService.getInstance();
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api/platingSearch', plating);
module.exports = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbURBQStDO0FBRS9DLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzVDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUV4QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUUxQyxJQUFJLFFBQVEsR0FBRyxVQUFVLElBQUksRUFBRSxHQUFHLElBQUk7SUFFckMsa0NBQWtDO0FBQ25DLENBQUMsQ0FBQztBQUVGLHFEQUFxRDtBQUNyRCxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQU8sR0FBRyxFQUFDLEVBQUU7SUFFNUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcscUJBQXFCLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdFLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sNEJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNuRCxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILDJDQUEyQztBQUMzQyxPQUFPLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFHLENBQUMsTUFBVyxFQUFFLE9BQU8sRUFBQyxFQUFFO0lBRXpELE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsQ0FBQztJQUVoRSxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLENBQUM7QUFDbkYsQ0FBQyxDQUFDLENBQUE7QUFFRixJQUFJLFlBQVksR0FBRyw0QkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzlDLElBQUksR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBRXBCLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNwRCxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUE7QUFFdkIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtJQUM3QixHQUFHLENBQUMsTUFBTSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLEdBQUcsQ0FBQyxNQUFNLENBQUMsOEJBQThCLEVBQUUsZ0RBQWdELENBQUMsQ0FBQztJQUM3RixJQUFJLEVBQUUsQ0FBQztBQUNULENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUV2QyxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvU2VydmljZSB9IGZyb20gJy4vbW9uZ28tc2VydmljZSc7XG5cbnZhciBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG52YXIgY29va2llUGFyc2VyID0gcmVxdWlyZSgnY29va2llLXBhcnNlcicpO1xudmFyIGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuXG52YXIgcGxhdGluZyA9IHJlcXVpcmUoJy4vcm91dGVzL3BsYXRpbmcnKTtcblxubGV0IHJlcG9ydGVyID0gZnVuY3Rpb24gKHR5cGUsIC4uLnJlc3QpXG57XG5cdC8vIHJlbW90ZSByZXBvcnRlciBsb2dpYyBnb2VzIGhlcmVcbn07XG5cbi8qIGhhbmRsZSBhbiB1bmNhdWdodCBleGNlcHRpb24gJiBleGl0IHRoZSBwcm9jZXNzICovXG5wcm9jZXNzLm9uKCd1bmNhdWdodEV4Y2VwdGlvbicsIGFzeW5jIChlcnIpPT5cbntcblx0Y29uc29sZS5lcnJvcigobmV3IERhdGUpLnRvVVRDU3RyaW5nKCkgKyAnIHVuY2F1Z2h0RXhjZXB0aW9uOicsIGVyci5tZXNzYWdlKTtcblx0Y29uc29sZS5lcnJvcihlcnIuc3RhY2spO1xuXHRhd2FpdCBNb25nb1NlcnZpY2UuZ2V0SW5zdGFuY2UoKS5jbG9zZUNvbm5lY3Rpb24oKTtcblx0cmVwb3J0ZXIoXCJ1bmNhdWdodEV4Y2VwdGlvblwiLCAobmV3IERhdGUpLnRvVVRDU3RyaW5nKCksIGVyci5tZXNzYWdlLCBlcnIuc3RhY2spO1xuXG5cdHByb2Nlc3MuZXhpdCgxKTtcbn0pO1xuXG4vKiBoYW5kbGUgYW4gdW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uICovXG5wcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCAgKHJlYXNvbjogYW55LCBwcm9taXNlKT0+XG57XG5cdGNvbnNvbGUuZXJyb3IoJ3VuaGFuZGxlZCByZWplY3Rpb246JywgcmVhc29uLm1lc3NhZ2UgfHwgcmVhc29uKTtcblxuXHRyZXBvcnRlcihcInVuY2F1Z2h0RXhjZXB0aW9uXCIsIChuZXcgRGF0ZSkudG9VVENTdHJpbmcoKSwgcmVhc29uLm1lc3NhZ2UgfHwgcmVhc29uKTtcbn0pXG5cbnZhciBtb25nb1NlcnZpY2UgPSBNb25nb1NlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbnZhciBhcHAgPSBleHByZXNzKCk7XG5cbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpO1xuYXBwLnVzZShjb29raWVQYXJzZXIoKSlcblxuYXBwLnVzZShmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuICByZXMuaGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcbiAgcmVzLmhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIiwgXCJPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0XCIpO1xuICBuZXh0KCk7XG59KTtcblxuYXBwLnVzZSgnL2FwaS9wbGF0aW5nU2VhcmNoJywgcGxhdGluZyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwO1xuIl19