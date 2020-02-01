import * as Express from "express";
import { PlatingService } from "../services/plating-service";
import { JobCardModel } from '../../jobcardui/src/app/models/JobCardModel';
import * as express from "express";
//var express = require('express');

var router = express.Router();

router.get('/images/:id', async (req: Express.Request, res: Express.Response, next) =>{
	const model = await PlatingService.retrieve(req.query.db, req.query.collection, req.params.id);	
	if (model instanceof JobCardModel){
		let index: number = Number(req.query.q || "0")
		return res.status(200).json(await PlatingService.getPictures(model, index));
	} else {
		return res.status(400).json({error: "No picture for db/collection"});
	}
	
});
router.get('/', async (req: Express.Request, res: Express.Response, next)=>{
	res.status(400).json({error: "Invalid METHOD"});
});



/* adds a new jobCard to the list */
router.post('/search', async (req: Express.Request, res: Express.Response, next) =>
{
	try
	{
		const models = await PlatingService.search(req.body);		
		return res.status(201).json(models);
	}
	catch(err)
	{
		return res.status(500).json({ error: typeof err === "string" ? err : err.message || "Server error creating"});	
	}
});

router.post('/new', async (req: Express.Request, res: Express.Response, next) =>
{	
	try
	{
		if (req.query.collection !== "settings"){
			const model = await PlatingService.create(req.query.db, req.query.collection, req.body);
			return res.status(201).json(model);
		} else {
			throw new Error("Settings create not supported");
		}		
	}
	catch(err)
	{
		return res.status(500).json({ error: typeof err === "string" ? err : err.message || "Server error creating"});	
	}
});

/* retrieves a jobCard by uid */
router.get('/:id', async (req: Express.Request, res: Express.Response, next) =>
{
	try
	{
		const model = await PlatingService.retrieve(req.query.db, req.query.collection, req.params.id);
		return res.json(model);
	}
	catch(err)
	{
		// unexpected error
		return res.status(400).json({ error: typeof err === "string" ? err : err.message || "Server error retrieving"});	
	}
});

/* updates the jobCard by uid */
router.patch('/:id', async (req: Express.Request, res: Express.Response, next) =>
{
	try
	{
		return await PlatingService.patch(req.query.db, req.query.collection, req.params.id, req.params.body);		
	}
	catch(err)
	{
		return res.status(500).json({ error: typeof err === "string" ? err : err.message || "Server error patching"});	
	}
});

/* removes the jobCard from the jobCard list by uid */
router.delete('/:id', async (req: Express.Request, res: Express.Response, next) =>
{
	try
	{
		await PlatingService.delete(req.query.db, req.query.collection, req.params.id);		
	}
	catch(err)
	{
		return res.status(500).json({ error: typeof err === "string" ? err : err.message || "Server error deleting"});	
	}
});

module.exports = router;