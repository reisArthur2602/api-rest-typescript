import { Request, Response } from 'express';
import { roomRepository } from '../repositories/RoomRepository';

export class RoomController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;
    try {
      const room = roomRepository.create({ name, description });
      await roomRepository.save(room);
      return res.status(201).json(room);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
