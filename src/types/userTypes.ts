export declare type CreateUser = {
    emailId : String,
    password : String
};

export declare type UpdateUser = {
    emailId : String,
    password : String
};

export declare type GetUser = {
    id ?: String,
    emailId? : String,
    password ?: String,
    createdAt? : Date,
    updatedAt ?: Date,
    lastLoginAt ?: Date
};

export declare type RegisterUser = {
    Address?:String,
    first_name : String | undefined,
    last_name : String | undefined,
    phone_number? : String,
    emailId? : String,
    password? :String,
    userId ?: String
};

export declare type GetRegisterUser = {
    id ?: String,
    Address?: String,
    first_name? : String,
    last_name? : String,
    phone_number? : String;
    emailId? : String;
    password? : String;
};