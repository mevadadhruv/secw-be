export declare type createUser = {
	emailId: String;
	password: string;
	token?: string;
};

export declare type updateUser = {
	emailId: String;
	password: String;
};

export declare type getUser = {
	id?: String;
	emailId?: String;
	password?: String;
	createdAt?: Date;
	updatedAt?: Date;
	lastLoginAt?: Date;
};

export declare type registerUser = {
	address?: String;
	firstName: String | undefined;
	lastName: String | undefined;
	phoneNumber?: String;
	emailId?: String;
	password?: String;
	userId?: String;
	sId?: String;
};

export declare type getRegisterUser = {
	id?: String;
	address?: String;
	firstName?: String;
	lastName?: String;
	phoneNumber?: String;
	emailId?: String;
	password?: String;
};

export declare type documentType = {
	id?: string;
	name?: string;
	description?: string;
	attachment: string;
	extension?: string;
	size?: string;
};

export declare type getDocument = {
	id: string;
	name: string;
	description: string;
	attachment: string;
	extension: string;
	size: string;
};

export declare type vendor = {
	id?: string;
	name: string;
	logo: string;
};

export declare type getVendor = {
	id?: string;
	name: string;
	logo: string;
};

export declare type role = {
	id?: string;
	name?: string;
	createdAt?: Date;
	updatedAt?: Date;
};