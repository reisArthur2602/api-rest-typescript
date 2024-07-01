import { Request, Response } from 'express';
import { subjectRepository } from '../repositories/SubjectRepository';
import { BadRequestError } from '../helpers/error';

export class SubjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body;
    
    if (!name) throw new BadRequestError('O nome é obrigatório');

    const subject = subjectRepository.create({ name });
    await subjectRepository.save(subject);
    return res.status(201).json(subject);
  }
}
