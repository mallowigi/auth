import { connect }                                                  from 'mongoose';
import * as mongoosePaginate                                        from 'mongoose-paginate';
import { createSchema, ExtractDoc, ExtractProps, Type, typedModel } from 'ts-mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

connect(`${MONGODB_URL}/auth`, { useNewUrlParser: true });

const AuthSchema = createSchema({
  token:  Type.string({ required: true, unique: true }),
  userId: Type.string({ required: true, unique: true }),
});

AuthSchema.plugin(mongoosePaginate);

// Exports
export type AuthDocument = ExtractDoc<typeof AuthSchema>;
export type AuthProps = ExtractProps<typeof AuthSchema>;
export const AuthModel = typedModel('Auth', AuthSchema);
