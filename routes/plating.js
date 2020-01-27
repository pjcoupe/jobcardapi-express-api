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
        return res.status(200).json(yield plating_service_1.PlatingService.getPictures(jobCard));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxpRUFBNkQ7QUFDN0QsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRWpDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUU5QixNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFPLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNyRixNQUFNLE9BQU8sR0FBRyxNQUFNLGdDQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0QsSUFBSSxPQUFPLEVBQUM7UUFDWCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sZ0NBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUN2RTtTQUFNO1FBQ04sT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxlQUFlLEVBQUMsQ0FBQyxDQUFDO0tBQ3REO0FBRUYsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQU8sR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQUksRUFBQyxFQUFFO0lBQzFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFJSCxvQ0FBb0M7QUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBTyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFFNUUsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUV0QixJQUNBO1FBQ0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxnQ0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuRCx3QkFBd0I7UUFDeEIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN0QztJQUNELE9BQU0sR0FBRyxFQUNUO1FBQ0MsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztLQUVwRDtBQUNGLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFSCxnQ0FBZ0M7QUFDaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBTyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFFOUUsSUFDQTtRQUNDLE1BQU0sT0FBTyxHQUFHLE1BQU0sZ0NBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUU3RCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztLQUN0QztJQUNELE9BQU0sR0FBRyxFQUNUO1FBQ0MsbUJBQW1CO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2pCO0FBQ0YsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILGdDQUFnQztBQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFPLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUU5RSxJQUNBO1FBQ0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxnQ0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckUsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7S0FDdEM7SUFDRCxPQUFNLEdBQUcsRUFDVDtRQUNDLG1CQUFtQjtRQUNuQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNqQjtBQUNGLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFSCxzREFBc0Q7QUFDdEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBTyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFFakYsSUFDQTtRQUNDLE1BQU0sT0FBTyxHQUFHLE1BQU0sZ0NBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUzRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztLQUNqQztJQUNELE9BQU0sR0FBRyxFQUNUO1FBQ0MsbUJBQW1CO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2pCO0FBQ0YsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgRXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgUGxhdGluZ1NlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvcGxhdGluZy1zZXJ2aWNlXCI7XG52YXIgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcblxudmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbnJvdXRlci5nZXQoJy9pbWFnZXMvOmlkJywgYXN5bmMgKHJlcTogRXhwcmVzcy5SZXF1ZXN0LCByZXM6IEV4cHJlc3MuUmVzcG9uc2UsIG5leHQpID0+e1xuXHRjb25zdCBqb2JDYXJkID0gYXdhaXQgUGxhdGluZ1NlcnZpY2UucmV0cmlldmUocmVxLnBhcmFtcy5pZCk7XG5cdGlmIChqb2JDYXJkKXtcblx0XHRyZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oYXdhaXQgUGxhdGluZ1NlcnZpY2UuZ2V0UGljdHVyZXMoam9iQ2FyZCkpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7ZXJyb3I6IFwiTm8gc3VjaCBqb2JJRFwifSk7XG5cdH1cblx0XG59KTtcbnJvdXRlci5nZXQoJy8nLCBhc3luYyAocmVxOiBFeHByZXNzLlJlcXVlc3QsIHJlczogRXhwcmVzcy5SZXNwb25zZSwgbmV4dCk9Pntcblx0cmVzLmpzb24oe2Vycm9yOiBcIkludmFsaWQgTUVUSE9EXCJ9KTtcbn0pO1xuXG5cblxuLyogYWRkcyBhIG5ldyBqb2JDYXJkIHRvIHRoZSBsaXN0ICovXG5yb3V0ZXIucG9zdCgnLycsIGFzeW5jIChyZXE6IEV4cHJlc3MuUmVxdWVzdCwgcmVzOiBFeHByZXNzLlJlc3BvbnNlLCBuZXh0KSA9Plxue1xuXHRjb25zdCBib2R5ID0gcmVxLmJvZHk7XG5cblx0dHJ5XG5cdHtcblx0XHRjb25zdCBqb2JDYXJkcyA9IGF3YWl0IFBsYXRpbmdTZXJ2aWNlLnNlYXJjaChib2R5KTtcblxuXHRcdC8vIGNyZWF0ZWQgdGhlIGpvYkNhcmQhIFxuXHRcdHJldHVybiByZXMuc3RhdHVzKDIwMSkuanNvbihqb2JDYXJkcyk7XG5cdH1cblx0Y2F0Y2goZXJyKVxuXHR7XG5cdFx0cmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IGVyci5tZXNzYWdlIH0pO1xuXHRcdFxuXHR9XG59KTtcblxuLyogcmV0cmlldmVzIGEgam9iQ2FyZCBieSB1aWQgKi9cbnJvdXRlci5nZXQoJy86aWQnLCBhc3luYyAocmVxOiBFeHByZXNzLlJlcXVlc3QsIHJlczogRXhwcmVzcy5SZXNwb25zZSwgbmV4dCkgPT5cbntcblx0dHJ5XG5cdHtcblx0XHRjb25zdCBqb2JDYXJkID0gYXdhaXQgUGxhdGluZ1NlcnZpY2UucmV0cmlldmUocmVxLnBhcmFtcy5pZCk7XG5cblx0XHRyZXR1cm4gcmVzLmpzb24oeyBqb2JDYXJkOiBqb2JDYXJkIH0pO1xuXHR9XG5cdGNhdGNoKGVycilcblx0e1xuXHRcdC8vIHVuZXhwZWN0ZWQgZXJyb3Jcblx0XHRyZXR1cm4gbmV4dChlcnIpO1xuXHR9XG59KTtcblxuLyogdXBkYXRlcyB0aGUgam9iQ2FyZCBieSB1aWQgKi9cbnJvdXRlci5wdXQoJy86aWQnLCBhc3luYyAocmVxOiBFeHByZXNzLlJlcXVlc3QsIHJlczogRXhwcmVzcy5SZXNwb25zZSwgbmV4dCkgPT5cbntcblx0dHJ5XG5cdHtcblx0XHRjb25zdCBqb2JDYXJkID0gYXdhaXQgUGxhdGluZ1NlcnZpY2UudXBkYXRlKHJlcS5wYXJhbXMuaWQsIHJlcS5ib2R5KTtcblxuXHRcdHJldHVybiByZXMuanNvbih7IGpvYkNhcmQ6IGpvYkNhcmQgfSk7XG5cdH1cblx0Y2F0Y2goZXJyKVxuXHR7XG5cdFx0Ly8gdW5leHBlY3RlZCBlcnJvclxuXHRcdHJldHVybiBuZXh0KGVycik7XG5cdH1cbn0pO1xuXG4vKiByZW1vdmVzIHRoZSBqb2JDYXJkIGZyb20gdGhlIGpvYkNhcmQgbGlzdCBieSB1aWQgKi9cbnJvdXRlci5kZWxldGUoJy86aWQnLCBhc3luYyAocmVxOiBFeHByZXNzLlJlcXVlc3QsIHJlczogRXhwcmVzcy5SZXNwb25zZSwgbmV4dCkgPT5cbntcblx0dHJ5XG5cdHtcblx0XHRjb25zdCBqb2JDYXJkID0gYXdhaXQgUGxhdGluZ1NlcnZpY2UuZGVsZXRlKHJlcS5wYXJhbXMuaWQpO1xuXG5cdFx0cmV0dXJuIHJlcy5qc29uKHtzdWNjZXNzOiB0cnVlfSk7XG5cdH1cblx0Y2F0Y2goZXJyKVxuXHR7XG5cdFx0Ly8gdW5leHBlY3RlZCBlcnJvclxuXHRcdHJldHVybiBuZXh0KGVycik7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlcjsiXX0=