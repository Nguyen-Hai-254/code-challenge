import { Request, Response } from "express";
import User from "../models/User";

export default class UserController {
    static getUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const query: any = {};
            if (req.query.age) {
                const age = Number(req.query.age);

                if (age == 20) query.age = { $lt: 20 }
                else if (age == 30) query.age = { $gte: 20, $lt: 30 }
                else if (age == 40) query.age = { $gte: 30, $lt: 40 }
                else if (age == 50) query.age = { $gte: 40, $lt: 50 }
                else query.age = { $gte: 50 }
            }

            if (req.query.salary) {
                const salary = Number(req.query.salary);

                if (salary == 10000000) query.salary = { $lt: 10000000 }
                else if (salary == 20000000) query.salary = { $gte: 10000000, $lt: 20000000 }
                else if (salary == 30000000) query.salary = { $gte: 20000000, $lt: 30000000 }
                else if (salary == 40000000) query.salary = { $gte: 30000000, $lt: 40000000 }
                else if (salary == 50000000) query.salary = { $gte: 40000000, $lt: 50000000 }
                else query.salary = { $gte: 50000000 }
            }

            const users = await User.find(query);
            return res.json({ message: 'OK', data: users });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    static getUserById = async (req: Request, res: Response): Promise<any> => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ message: "Không tìm thấy user" });
            return res.json({ message: 'OK', data: user });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    };

    static createUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const { name, email, age, salary, phone } = req.body;
            const findEmail = await User.findOne({ email: email });

            if (findEmail) return res.status(404).json({
                message: 'This email already exists!',
                data: null
            });

            const user = new User({ name, email, age, salary, phone, avatar: '/assets/avatar-' + Math.floor(Math.random() * 10 + 1) + '.png' });
            await user.save();

            return res.status(201).json({
                message: 'User created successfully',
                user
            }
            );
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    };

    static updateUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const { name, email, age, salary, phone } = req.body;
            if (!email) {
                return res.status(404).json({ message: "Email is required" });
            }
            const user = await User.findByIdAndUpdate(
                req.params.id,
                { name, email, age, salary, phone, avatar: '/assets/avatar-' + Math.floor(Math.random() * 10 + 1) + '.png' },
                { new: true }
            );

            if (!user) return res.status(404).json({ message: "User not found" });
            return res.json({ message: 'User updated successfully', user });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    };

    static deleteUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) return res.status(404).json({ message: "User not found" });
            return res.json({ message: "User deleted successfully" });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    };
}