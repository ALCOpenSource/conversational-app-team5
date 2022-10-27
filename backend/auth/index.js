import { initializeApp } from 'firebase-admin/app';


process.env['FIREBASE_AUTH_EMULATOR_HOST'] = 'localhost:9099'


const app = initializeApp();

