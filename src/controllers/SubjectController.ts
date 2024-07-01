import { Request, Response } from 'express';
import { subjectRepository } from '../repositories/SubjectRepository';

export class SubjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: 'O nome é obrigatório' });

    try {
      const subject = subjectRepository.create({ name });
      await subjectRepository.save(subject);

      return res.status(201).json(subject);
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
