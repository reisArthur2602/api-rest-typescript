import { Request, Response } from 'express';
import { roomRepository } from '../repositories/RoomRepository';
import { videoRepository } from '../repositories/VideoRepository';
import { subjectRepository } from '../repositories/SubjectRepository';

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

  async roomSubject(req: Request, res: Response) {
    const { subject_id } = req.body;
    const { room_id } = req.params;

    try {
      const room = await roomRepository.findOneBy({ id: parseInt(room_id) });
      if (!room) return res.status(404).json({ messsage: 'Aula não existe' });

      const subject = await subjectRepository.findOneBy({ id: subject_id });
      if (!subject)
        return res.status(404).json({ messsage: 'Disciplina não existe' });

      const roomUpdate = {
        ...room,
        subjects: [subject],
      };
      await roomRepository.save(roomUpdate);

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const rooms = await roomRepository.find({
        relations: {
          subjects: true,
          videos: true,
        },
      });

      return res.status(200).json(rooms);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
