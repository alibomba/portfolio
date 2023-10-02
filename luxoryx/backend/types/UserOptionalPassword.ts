export default interface UserOptionalPassword{
    id: string;
    username: string;
    profile_picture: string | null;
    email: string;
    phone_number: string;
    password?: string;
    created_at: Date;
}