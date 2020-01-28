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
        const jobCard = yield plating_service_1.PlatingService.update(req.params.id, req.body);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxpRUFBNkQ7QUFDN0QsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRWpDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUU5QixNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFPLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNyRixNQUFNLE9BQU8sR0FBRyxNQUFNLGdDQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFN0QsSUFBSSxPQUFPLEVBQUM7UUFDWCxJQUFJLEtBQUssR0FBVyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUE7UUFDOUMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLGdDQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQzlFO1NBQU07UUFDTixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLGVBQWUsRUFBQyxDQUFDLENBQUM7S0FDdEQ7QUFFRixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBTyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBSSxFQUFDLEVBQUU7SUFDMUUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUlILG9DQUFvQztBQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFPLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUU1RSxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBRXRCLElBQ0E7UUFDQyxNQUFNLFFBQVEsR0FBRyxNQUFNLGdDQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5ELHdCQUF3QjtRQUN4QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3RDO0lBQ0QsT0FBTSxHQUFHLEVBQ1Q7UUFDQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBRXBEO0FBQ0YsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILGdDQUFnQztBQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFPLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUU5RSxJQUNBO1FBQ0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxnQ0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTdELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ3RDO0lBQ0QsT0FBTSxHQUFHLEVBQ1Q7UUFDQyxtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakI7QUFDRixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBRUgsZ0NBQWdDO0FBQ2hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQU8sR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQUksRUFBRSxFQUFFO0lBRTlFLElBQ0E7UUFDQyxNQUFNLE9BQU8sR0FBRyxNQUFNLGdDQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztLQUN0QztJQUNELE9BQU0sR0FBRyxFQUNUO1FBQ0MsbUJBQW1CO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2pCO0FBQ0YsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILHNEQUFzRDtBQUN0RCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFPLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUVqRixJQUNBO1FBQ0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxnQ0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTNELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0tBQ2pDO0lBQ0QsT0FBTSxHQUFHLEVBQ1Q7UUFDQyxtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakI7QUFDRixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBFeHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBQbGF0aW5nU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9wbGF0aW5nLXNlcnZpY2VcIjtcbnZhciBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuXG52YXIgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxucm91dGVyLmdldCgnL2ltYWdlcy86aWQnLCBhc3luYyAocmVxOiBFeHByZXNzLlJlcXVlc3QsIHJlczogRXhwcmVzcy5SZXNwb25zZSwgbmV4dCkgPT57XG5cdGNvbnN0IGpvYkNhcmQgPSBhd2FpdCBQbGF0aW5nU2VydmljZS5yZXRyaWV2ZShyZXEucGFyYW1zLmlkKTtcblx0XG5cdGlmIChqb2JDYXJkKXtcblx0XHRsZXQgaW5kZXg6IG51bWJlciA9IE51bWJlcihyZXEucXVlcnkucSB8fCBcIjBcIilcblx0XHRyZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oYXdhaXQgUGxhdGluZ1NlcnZpY2UuZ2V0UGljdHVyZXMoam9iQ2FyZCwgaW5kZXgpKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe2Vycm9yOiBcIk5vIHN1Y2ggam9iSURcIn0pO1xuXHR9XG5cdFxufSk7XG5yb3V0ZXIuZ2V0KCcvJywgYXN5bmMgKHJlcTogRXhwcmVzcy5SZXF1ZXN0LCByZXM6IEV4cHJlc3MuUmVzcG9uc2UsIG5leHQpPT57XG5cdHJlcy5qc29uKHtlcnJvcjogXCJJbnZhbGlkIE1FVEhPRFwifSk7XG59KTtcblxuXG5cbi8qIGFkZHMgYSBuZXcgam9iQ2FyZCB0byB0aGUgbGlzdCAqL1xucm91dGVyLnBvc3QoJy8nLCBhc3luYyAocmVxOiBFeHByZXNzLlJlcXVlc3QsIHJlczogRXhwcmVzcy5SZXNwb25zZSwgbmV4dCkgPT5cbntcblx0Y29uc3QgYm9keSA9IHJlcS5ib2R5O1xuXG5cdHRyeVxuXHR7XG5cdFx0Y29uc3Qgam9iQ2FyZHMgPSBhd2FpdCBQbGF0aW5nU2VydmljZS5zZWFyY2goYm9keSk7XG5cblx0XHQvLyBjcmVhdGVkIHRoZSBqb2JDYXJkISBcblx0XHRyZXR1cm4gcmVzLnN0YXR1cygyMDEpLmpzb24oam9iQ2FyZHMpO1xuXHR9XG5cdGNhdGNoKGVycilcblx0e1xuXHRcdHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBlcnIubWVzc2FnZSB9KTtcblx0XHRcblx0fVxufSk7XG5cbi8qIHJldHJpZXZlcyBhIGpvYkNhcmQgYnkgdWlkICovXG5yb3V0ZXIuZ2V0KCcvOmlkJywgYXN5bmMgKHJlcTogRXhwcmVzcy5SZXF1ZXN0LCByZXM6IEV4cHJlc3MuUmVzcG9uc2UsIG5leHQpID0+XG57XG5cdHRyeVxuXHR7XG5cdFx0Y29uc3Qgam9iQ2FyZCA9IGF3YWl0IFBsYXRpbmdTZXJ2aWNlLnJldHJpZXZlKHJlcS5wYXJhbXMuaWQpO1xuXG5cdFx0cmV0dXJuIHJlcy5qc29uKHsgam9iQ2FyZDogam9iQ2FyZCB9KTtcblx0fVxuXHRjYXRjaChlcnIpXG5cdHtcblx0XHQvLyB1bmV4cGVjdGVkIGVycm9yXG5cdFx0cmV0dXJuIG5leHQoZXJyKTtcblx0fVxufSk7XG5cbi8qIHVwZGF0ZXMgdGhlIGpvYkNhcmQgYnkgdWlkICovXG5yb3V0ZXIucHV0KCcvOmlkJywgYXN5bmMgKHJlcTogRXhwcmVzcy5SZXF1ZXN0LCByZXM6IEV4cHJlc3MuUmVzcG9uc2UsIG5leHQpID0+XG57XG5cdHRyeVxuXHR7XG5cdFx0Y29uc3Qgam9iQ2FyZCA9IGF3YWl0IFBsYXRpbmdTZXJ2aWNlLnVwZGF0ZShyZXEucGFyYW1zLmlkLCByZXEuYm9keSk7XG5cblx0XHRyZXR1cm4gcmVzLmpzb24oeyBqb2JDYXJkOiBqb2JDYXJkIH0pO1xuXHR9XG5cdGNhdGNoKGVycilcblx0e1xuXHRcdC8vIHVuZXhwZWN0ZWQgZXJyb3Jcblx0XHRyZXR1cm4gbmV4dChlcnIpO1xuXHR9XG59KTtcblxuLyogcmVtb3ZlcyB0aGUgam9iQ2FyZCBmcm9tIHRoZSBqb2JDYXJkIGxpc3QgYnkgdWlkICovXG5yb3V0ZXIuZGVsZXRlKCcvOmlkJywgYXN5bmMgKHJlcTogRXhwcmVzcy5SZXF1ZXN0LCByZXM6IEV4cHJlc3MuUmVzcG9uc2UsIG5leHQpID0+XG57XG5cdHRyeVxuXHR7XG5cdFx0Y29uc3Qgam9iQ2FyZCA9IGF3YWl0IFBsYXRpbmdTZXJ2aWNlLmRlbGV0ZShyZXEucGFyYW1zLmlkKTtcblxuXHRcdHJldHVybiByZXMuanNvbih7c3VjY2VzczogdHJ1ZX0pO1xuXHR9XG5cdGNhdGNoKGVycilcblx0e1xuXHRcdC8vIHVuZXhwZWN0ZWQgZXJyb3Jcblx0XHRyZXR1cm4gbmV4dChlcnIpO1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7Il19