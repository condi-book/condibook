export interface userIdInput {
    user_id: number;
}

export interface userInterface {
    user_id?: number;
    email?: string;
    nickname?: string;
    image_url?: string;
    intro?: string;
    errorMessage?: Error;
}
