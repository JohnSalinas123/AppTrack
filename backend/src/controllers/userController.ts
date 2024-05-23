import { Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, {IUser} from '../models/User';

// register new user
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

// login user
export const login = async (req: Request, res: Response): Promise<Response> => {

    const {email, password} = req.body;
    try {
        const user: IUser | null = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: "Incorrect email or password"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message: "Incorrect email or password"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: '1h'})
        return res.json({token});
    } catch (error: unknown) {
        const typedError = error as Error;
        return res.status(500).json({error: typedError.message})
    }

}

// get user data
export const getUser = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.body

    try {
        const user: IUser | null = await User.findById(id).select('-password')
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        return res.json(user);

    } catch(error) {
        const typedEror = error as Error;
        return res.status(500).json({error: typedEror.message})
    }
}