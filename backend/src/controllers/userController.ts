import { Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, {IUser} from '../models/User';

export const register = async (req: Request, res: Response): Promise<Response> => {

    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser: IUser = new User({email, password: hashedPassword});
        await newUser.save();

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET as string, {expiresIn: '1h'});
        return res.status(201).json({token});

    } catch(error: unknown) {
        const typedError = error as Error;
        return res.status(500).json({error: typedError.message})
    }

}