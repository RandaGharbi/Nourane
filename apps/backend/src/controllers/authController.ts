import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import appleSignin from 'apple-signin-auth';
import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';

export const signup = async (req: Request, res: Response) => {
  console.log('Signup request:', req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as jwt.JwtPayload;
    const userId = typeof decoded === 'object' && decoded.userId ? decoded.userId : null;
    if (!userId) return res.status(401).json({ message: 'Invalid token payload' });
    const user = await User.findById(userId).select('name email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.json({ message: 'Déconnexion réussie' });
};

export const appleSignIn = async (req: Request, res: Response) => {
  const { token } = req.body;
  console.log('Apple identityToken reçu:', token);
  try {
    const appleUser = await appleSignin.verifyIdToken(token, {
      audience: 'com.rindaa.Nourane',
      ignoreExpiration: true,
    });
    let user = await User.findOne({ appleId: appleUser.sub });
    if (!user) {
      user = await User.create({
        appleId: appleUser.sub,
        email: appleUser.email,
        name: appleUser.email?.split('@')[0] || 'AppleUser',
      });
    }
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token: jwtToken, user });
  } catch (err) {
    res.status(401).json({ error: 'Invalid Apple token' });
  }
};

export const googleSignIn = async (req: Request, res: Response) => {
  const { token } = req.body;
  const client = new OAuth2Client();
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: 'TON_CLIENT_ID_WEB.apps.googleusercontent.com', // Remplace par ton vrai clientId Google
    });
    const payload = ticket.getPayload();
    if (!payload) return res.status(401).json({ error: 'Invalid Google token' });

    let user = await User.findOne({ googleId: payload.sub });
    if (!user) {
      user = await User.create({
        googleId: payload.sub,
        email: payload.email,
        name: payload.name || payload.email?.split('@')[0] || 'GoogleUser',
      });
    }
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token: jwtToken, user });
  } catch (err) {
    res.status(401).json({ error: 'Invalid Google token' });
  }
}; 