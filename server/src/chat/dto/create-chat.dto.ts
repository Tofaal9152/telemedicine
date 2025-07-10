export class CreateChatDto {
    senderId: number;
    receiverId: number;
    message: string;
    timestamp: Date;
    isRead: boolean;
    chatType: 'text' | 'image' | 'video' | 'file';
    attachmentUrl?: string; // Optional field for attachments
    chatRoomId?: number; // Optional field for chat room ID, if applicable  
    
}

