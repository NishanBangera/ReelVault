import mongoose, {Schema, model, models} from "mongoose";
import bcrypt from "bcryptjs";

export interface UserDetails {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<UserDetails>(
{
    email: {type: String,required: true, unique:true},
    password: {type: String, required: true}
},{timestamps: true});

// pre-save hook is used when user changes his password
userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const User = models?.User || model<UserDetails>("User", userSchema) // checks if model has already been created

export default User
