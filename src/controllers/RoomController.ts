import { Request, Response } from 'express';
import { roomRepository } from '../repositories/RoomRepository';
import { videoRepository } from '../repositories/VideoRepository';
import { subjectRepository } from '../repositories/SubjectRepository';
import { BadRequestError, NotFoundError } from '../helpers/error';

export class RoomController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;
    if (!name || !description)
      throw new BadRequestError('Preencha os dados corretamente');
    const room = roomRepository.create({ name, description });
    await roomRepository.save(room);
    return res.status(201).json(room);
  }

  async createRoom(req: Request, res: Response) {
    const { title, url } = req.body;
    const { room_id } = req.params;

    if (!title || !url || !room_id)
      throw new BadRequestError('Preencha os dados corretamente');

    const room = await roomRepository.findOneBy({ id: parseInt(room_id) });
    if (!room) throw new NotFoundError('Aula não existe');

    const video = videoRepository.create({ title, url, room });
    await videoRepository.save(video);
    return res.status(201).json(video);
  }

  async roomSubject(req: Request, res: Response) {
    const { subject_id } = req.body;
    const { room_id } = req.params;

    const room = await roomRepository.findOneBy({ id: parseInt(room_id) });
    if (!room) throw new NotFoundError('Aula não existe');

    const subject = await subjectRepository.findOneBy({ id: subject_id });
    if (!subject) throw new NotFoundError('Disciplina não existe');

    const roomUpdate = {
      ...room,
      subjects: [subject],
    };
    await roomRepository.save(roomUpdate);

    return res.status(204).send();
  }

  async list(req: Request, res: Response) {
    const rooms = await roomRepository.find({
      relations: {
        subjects: true,
        videos: true,
      },
    });
    if (!rooms) throw new NotFoundError('Nenhuma aula foi encontrada');

    return res.status(200).json(rooms);
  }
}
