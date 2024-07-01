import { Request, Response } from 'express';
import { roomRepository } from '../repositories/RoomRepository';
import { videoRepository } from '../repositories/VideoRepository';

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

  async createRoom(req: Request, res: Response) {
    const { title, url } = req.body;
    const { room_id } = req.params;
    try {
      const room = await roomRepository.findOneBy({ id: parseInt(room_id) });
      if (!room) return res.status(404).json({ messsage: 'Aula não existe' });

      const video = videoRepository.create({ title, url, room });
      await videoRepository.save(video);
      return res.status(201).json(video);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
