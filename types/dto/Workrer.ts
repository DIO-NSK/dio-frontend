export type Worker = {
    name : string,
    phoneNumber : string,
    type : WorkerType
}

export type WorkerType = "admin" | "moderator" | "employee"