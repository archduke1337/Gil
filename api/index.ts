import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { expressApp } from '../server';

const app = expressApp;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await app(req, res);
}