import { Router } from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/',  async (req, res) => {});

subscriptionRouter.get('/:id',  async (req, res) => {});

subscriptionRouter.post('/',  async (req, res) => {});

subscriptionRouter.put('/:id',  async (req, res) => {});

subscriptionRouter.delete('/:id',  async (req, res) => {});

subscriptionRouter.put('/cancel/:id',  async (req, res) => {});

subscriptionRouter.get('/upcoming-renewals',  async (req, res) => {});

subscriptionRouter.get('/user/:id',  async (req, res) => {});

export default subscriptionRouter;