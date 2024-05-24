import {Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/express';
import JobApplication ,{ IJobApplication } from '../models/JobApplication';
import User, {IUser} from '../models/User'

export const addJobApplication = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    const {jobTitle, companyName, applicationDate, jobDescription, statusIds } = req.body;

    try {
        const user: IUser | null = await User.findById(req.user.id).select('jobStatuses');
        if (!user) {
            return res.status(404).json({ message: 'User not found!'});
        }

        const statuses = statusIds.filter((id: string) => user.jobStatuses.some(status => status._id.equals(id)));
        if (statuses.length !== statusIds.length) {
            return res.status(400).json({message: "One or more status IDs are invalid"})
        }

        const newJobAplication: IJobApplication = new JobApplication({
            user: req.user._id,
            jobTitle,
            companyName,
            applicationDate,
            jobDescription,
            statuses
        })
        await newJobAplication.save();
        return res.status(201).json(newJobAplication);
        
    } catch (error: unknown) {
        const typedError = error as Error;
        return res.status(500).json({error: typedError.message})
    }

}