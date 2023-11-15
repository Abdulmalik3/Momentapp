export class iPost {
    userAvatar: string;
    userName: string;
    postId: string;
    postTime: string;
    postDate: string;
    postImage: string;
    postCaption: string;
    isNightPost: boolean;
    showRections?: boolean;
    peopleReactions: iPeopleReactions[];
}

export class iFriend {
    userProfile: string;
    username: string;
    userEmail: string;
}

export class iChat {
    userProfile: string;
    username: string;
    lastMessage: string;
    lastMsgTime: string;
}

export class iMessage {
    message: string;
    timestamp: number;
    uid: string;
    image: string;
    key: string;
}

export class iNotification {
    userProfile: string;
    username: string;
    comment: string;
    commentTime: string;
}

export class iAvailableFriendsForChat {
    userProfile: string;
    name: string;
    username: string;
}

export class iPeopleReactions {
    userAvatar: string;
    reaction: string;
}