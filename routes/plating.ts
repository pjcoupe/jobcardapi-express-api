import * as Express from "express";
import { PlatingService } from "../services/plating-service";
var express = require('express');

var router = express.Router();

router.get('/images/:id', async (req: Express.Request, res: Express.Response, next) =>{
	const jobCard = await PlatingService.retrieve(req.params.id);
	if (jobCard){
		return res.status(200).json(await PlatingService.getPictures(jobCard));
	} else {
		return res.status(400).json({error: "No such jobID"});
	}
	
});
router.get('/', async (req: Express.Request, res: Express.Response, next)=>{
	res.json({error: "Invalid METHOD"});
});



/* adds a new jobCard to the list */
router.post('/', async (req: Express.Request, res: Express.Response, next) =>
{
	const body = req.body;

	try
	{
		const jobCards = await PlatingService.search(body);

		// created the jobCard! 
		return res.status(201).json(jobCards);
	}
	catch(err)
	{
		return res.status(400).json({ error: err.message });
		
	}
});

/* retrieves a jobCard by uid */
router.get('/:id', async (req: Express.Request, res: Express.Response, next) =>
{
	try
	{
		const jobCard = await PlatingService.retrieve(req.params.id);

		return res.json({ jobCard: jobCard });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* updates the jobCard by uid */
router.put('/:id', async (req: Express.Request, res: Express.Response, next) =>
{
	try
	{
		const jobCard = await PlatingService.update(req.params.id, req.body);

		return res.json({ jobCard: jobCard });
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

/* removes the jobCard from the jobCard list by uid */
router.delete('/:id', async (req: Express.Request, res: Express.Response, next) =>
{
	try
	{
		const jobCard = await PlatingService.delete(req.params.id);

		return res.json({success: true});
	}
	catch(err)
	{
		// unexpected error
		return next(err);
	}
});

module.exports = router;