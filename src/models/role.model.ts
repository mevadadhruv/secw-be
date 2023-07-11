import mongoose, { Schema, Types } from 'mongoose';

const Roleschema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: 'Please enter role name'
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model('Role', Roleschema);
