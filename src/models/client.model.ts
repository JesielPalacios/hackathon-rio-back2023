import mongoose, { model, Schema } from 'mongoose';
import { decryptPassword, encryptPassword } from '../utils/cryptojs';

export class Client {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly firstSurname: string,
    public readonly gender: string,
    public readonly preferences: [],
    public readonly _id?: string,
    public readonly files?: any,
    public readonly secondName?: string,
    public readonly secondSurname?: string
  ) {}
}

export interface IClient extends mongoose.Document {
  email: string;
  password: string;
  firstName: string;
  secondName?: string;
  firstSurname: string;
  secondSurname?: string;
  gender: string;
  preferences: [];
  image_public_id?: string;
  image_secure_url?: string;
  verifyPassword(encryptedPassword: string): Promise<boolean>;
  _doc: any;
}

const clientSchema: Schema = new Schema<IClient>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 45,
      trim: true,
    },
    secondName: {
      type: String,
      min: 3,
      max: 45,
      trim: true,
    },
    firstSurname: {
      type: String,
      required: true,
      min: 3,
      max: 45,
      // lowercase: true,
      trim: true,
    },
    secondSurname: {
      type: String,
      min: 3,
      max: 45,
      // lowercase: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      default: 'Masculino',
      enum: ['Masculino', 'Femenino'],
    },
    preferences: {
      type: [],
      required: true,
    },
    // typeCitizenshipNumberId: {
    //   type: String,
    //   required: true,
    //   default: 'Cédula de ciudadanía',
    //   enum: [
    //     'Cédula de ciudadanía',
    //     'Tarjeta de identidad',
    //     'Cédula de extranjería',
    //     'Visa',
    //     'Pasaporte',
    //     'Registro Civil',
    //   ],
    // },
    // citizenshipNumberId: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    // },
    // cellPhoneNumber: {
    //   type: String,
    //   max: 20,
    //   trim: true,
    // },
    // address: {
    //   type: String,
    //   min: 6,
    //   max: 100,
    //   trim: true,
    // },
    // birthDate: {
    //   type: Date,
    //   required: true,
    //   trim: true,
    // },
    // birthCountry: {
    //   type: String,
    //   required: true,
    //   max: 65,
    //   trim: true,
    // },
    // birthDepartment: {
    //   type: String,
    //   required: true,
    //   max: 65,
    //   trim: true,
    // },
    // birthCity: {
    //   type: String,
    //   required: true,
    //   max: 65,
    //   trim: true,
    // },

    image_public_id: {
      type: String,
      trim: true,
    },
    image_secure_url: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

clientSchema.methods.verifyPassword = async function (
  password: string
): Promise<boolean> {
  const client = this;
  return password === decryptPassword(client.password);
};

// Middleware pre-save
clientSchema.pre('save', async function (next) {
  const client = this;
  if (!client.isModified('password')) {
    return next();
  }

  client.password = encryptPassword(client.password);
  next();
});

export default model<IClient>('Client', clientSchema);
