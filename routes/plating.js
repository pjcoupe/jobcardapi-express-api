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
const plating_service_1 = require("../services/plating-service");
var express = require('express');
var router = express.Router();
router.get('/images/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jobCard = yield plating_service_1.PlatingService.retrieve(req.params.id);
    if (jobCard) {
        let index = Number(req.query.q || "0");
        return res.status(200).json(yield plating_service_1.PlatingService.getPictures(jobCard, index));
    }
    else {
        return res.status(400).json({ error: "No such jobID" });
    }
}));
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ error: "Invalid METHOD" });
}));
/* adds a new jobCard to the list */
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const jobCards = yield plating_service_1.PlatingService.search(body);
        // created the jobCard! 
        return res.status(201).json(jobCards);
    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
}));
/* retrieves a jobCard by uid */
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobCard = yield plating_service_1.PlatingService.retrieve(req.params.id);
        return res.json({ jobCard: jobCard });
    }
    catch (err) {
        // unexpected error
        return next(err);
    }
}));
/* updates the jobCard by uid */
router.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobCard = yield plating_service_1.PlatingService.update(req.params.idreq.body);
        return res.json({ jobCard: jobCard });
    }
    catch (err) {
        // unexpected error
        return next(err);
    }
}));
/* removes the jobCard from the jobCard list by uid */
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobCard = yield plating_service_1.PlatingService.delete(req.params.id);
        return res.json({ success: true });
    }
    catch (err) {
        // unexpected error
        return next(err);
    }
}));
module.exports = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxpRUFBNkQ7QUFDN0QsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRWpDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUU5QixNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFPLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNyRixNQUFNLE9BQU8sR0FBRyxNQUFNLGdDQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFN0QsSUFBSSxPQUFPLEVBQUM7UUFDWCxJQUFJLEtBQUssR0FBVyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUE7UUFDOUMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLGdDQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQzlFO1NBQU07UUFDTixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLGVBQWUsRUFBQyxDQUFDLENBQUM7S0FDdEQ7QUFFRixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBTyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBSSxFQUFDLEVBQUU7SUFDMUUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUlILG9DQUFvQztBQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFPLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUU1RSxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBRXRCLElBQ0E7UUFDQyxNQUFNLFFBQVEsR0FBRyxNQUFNLGdDQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5ELHdCQUF3QjtRQUN4QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3RDO0lBQ0QsT0FBTSxHQUFHLEVBQ1Q7UUFDQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBRXBEO0FBQ0YsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILGdDQUFnQztBQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFPLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUU5RSxJQUNBO1FBQ0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxnQ0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTdELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ3RDO0lBQ0QsT0FBTSxHQUFHLEVBQ1Q7UUFDQyxtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakI7QUFDRixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBRUgsZ0NBQWdDO0FBQ2hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQU8sR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQUksRUFBRSxFQUFFO0lBRTlFLElBQ0E7UUFDQyxNQUFNLE9BQU8sR0FBRyxNQUFNLGdDQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5FLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ3RDO0lBQ0QsT0FBTSxHQUFHLEVBQ1Q7UUFDQyxtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakI7QUFDRixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBRUgsc0RBQXNEO0FBQ3RELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQU8sR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQUksRUFBRSxFQUFFO0lBRWpGLElBQ0E7UUFDQyxNQUFNLE9BQU8sR0FBRyxNQUFNLGdDQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFM0QsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7S0FDakM7SUFDRCxPQUFNLEdBQUcsRUFDVDtRQUNDLG1CQUFtQjtRQUNuQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNqQjtBQUNGLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IFBsYXRpbmdTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL3BsYXRpbmctc2VydmljZVwiO1xudmFyIGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5cbnZhciByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5yb3V0ZXIuZ2V0KCcvaW1hZ2VzLzppZCcsIGFzeW5jIChyZXE6IEV4cHJlc3MuUmVxdWVzdCwgcmVzOiBFeHByZXNzLlJlc3BvbnNlLCBuZXh0KSA9Pntcblx0Y29uc3Qgam9iQ2FyZCA9IGF3YWl0IFBsYXRpbmdTZXJ2aWNlLnJldHJpZXZlKHJlcS5wYXJhbXMuaWQpO1xuXHRcblx0aWYgKGpvYkNhcmQpe1xuXHRcdGxldCBpbmRleDogbnVtYmVyID0gTnVtYmVyKHJlcS5xdWVyeS5xIHx8IFwiMFwiKVxuXHRcdHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbihhd2FpdCBQbGF0aW5nU2VydmljZS5nZXRQaWN0dXJlcyhqb2JDYXJkLCBpbmRleCkpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7ZXJyb3I6IFwiTm8gc3VjaCBqb2JJRFwifSk7XG5cdH1cblx0XG59KTtcbnJvdXRlci5nZXQoJy8nLCBhc3luYyAocmVxOiBFeHByZXNzLlJlcXVlc3QsIHJlczogRXhwcmVzcy5SZXNwb25zZSwgbmV4dCk9Pntcblx0cmVzLmpzb24oe2Vycm9yOiBcIkludmFsaWQgTUVUSE9EXCJ9KTtcbn0pO1xuXG5cblxuLyogYWRkcyBhIG5ldyBqb2JDYXJkIHRvIHRoZSBsaXN0ICovXG5yb3V0ZXIucG9zdCgnLycsIGFzeW5jIChyZXE6IEV4cHJlc3MuUmVxdWVzdCwgcmVzOiBFeHByZXNzLlJlc3BvbnNlLCBuZXh0KSA9Plxue1xuXHRjb25zdCBib2R5ID0gcmVxLmJvZHk7XG5cblx0dHJ5XG5cdHtcblx0XHRjb25zdCBqb2JDYXJkcyA9IGF3YWl0IFBsYXRpbmdTZXJ2aWNlLnNlYXJjaChib2R5KTtcblxuXHRcdC8vIGNyZWF0ZWQgdGhlIGpvYkNhcmQhIFxuXHRcdHJldHVybiByZXMuc3RhdHVzKDIwMSkuanNvbihqb2JDYXJkcyk7XG5cdH1cblx0Y2F0Y2goZXJyKVxuXHR7XG5cdFx0cmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IGVyci5tZXNzYWdlIH0pO1xuXHRcdFxuXHR9XG59KTtcblxuLyogcmV0cmlldmVzIGEgam9iQ2FyZCBieSB1aWQgKi9cbnJvdXRlci5nZXQoJy86aWQnLCBhc3luYyAocmVxOiBFeHByZXNzLlJlcXVlc3QsIHJlczogRXhwcmVzcy5SZXNwb25zZSwgbmV4dCkgPT5cbntcblx0dHJ5XG5cdHtcblx0XHRjb25zdCBqb2JDYXJkID0gYXdhaXQgUGxhdGluZ1NlcnZpY2UucmV0cmlldmUocmVxLnBhcmFtcy5pZCk7XG5cblx0XHRyZXR1cm4gcmVzLmpzb24oeyBqb2JDYXJkOiBqb2JDYXJkIH0pO1xuXHR9XG5cdGNhdGNoKGVycilcblx0e1xuXHRcdC8vIHVuZXhwZWN0ZWQgZXJyb3Jcblx0XHRyZXR1cm4gbmV4dChlcnIpO1xuXHR9XG59KTtcblxuLyogdXBkYXRlcyB0aGUgam9iQ2FyZCBieSB1aWQgKi9cbnJvdXRlci5wdXQoJy86aWQnLCBhc3luYyAocmVxOiBFeHByZXNzLlJlcXVlc3QsIHJlczogRXhwcmVzcy5SZXNwb25zZSwgbmV4dCkgPT5cbntcblx0dHJ5XG5cdHtcblx0XHRjb25zdCBqb2JDYXJkID0gYXdhaXQgUGxhdGluZ1NlcnZpY2UudXBkYXRlKHJlcS5wYXJhbXMuaWRyZXEuYm9keSk7XG5cblx0XHRyZXR1cm4gcmVzLmpzb24oeyBqb2JDYXJkOiBqb2JDYXJkIH0pO1xuXHR9XG5cdGNhdGNoKGVycilcblx0e1xuXHRcdC8vIHVuZXhwZWN0ZWQgZXJyb3Jcblx0XHRyZXR1cm4gbmV4dChlcnIpO1xuXHR9XG59KTtcblxuLyogcmVtb3ZlcyB0aGUgam9iQ2FyZCBmcm9tIHRoZSBqb2JDYXJkIGxpc3QgYnkgdWlkICovXG5yb3V0ZXIuZGVsZXRlKCcvOmlkJywgYXN5bmMgKHJlcTogRXhwcmVzcy5SZXF1ZXN0LCByZXM6IEV4cHJlc3MuUmVzcG9uc2UsIG5leHQpID0+XG57XG5cdHRyeVxuXHR7XG5cdFx0Y29uc3Qgam9iQ2FyZCA9IGF3YWl0IFBsYXRpbmdTZXJ2aWNlLmRlbGV0ZShyZXEucGFyYW1zLmlkKTtcblxuXHRcdHJldHVybiByZXMuanNvbih7c3VjY2VzczogdHJ1ZX0pO1xuXHR9XG5cdGNhdGNoKGVycilcblx0e1xuXHRcdC8vIHVuZXhwZWN0ZWQgZXJyb3Jcblx0XHRyZXR1cm4gbmV4dChlcnIpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7Il19