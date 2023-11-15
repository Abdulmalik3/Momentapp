import { Injectable } from '@angular/core';
import { iAvailableFriendsForChat, iChat, iFriend, iNotification, iPost } from './models';

export enum ReactionType {
  LOVE = 'love',
  INLOVE = 'inlove',
  LAUGH = 'laugh',
  SAD = 'sad',
  LIKE = 'like',
  DISLIKE = 'dislike',
};

export const Reactions = {
  [ReactionType.LOVE]: '../../assets/images/love.png',
  [ReactionType.LAUGH]: '../../assets/images/laughing.png',
  [ReactionType.LIKE]: '../../assets/images/like.png',
  [ReactionType.DISLIKE]: '../../assets/images/dislike.png',
  [ReactionType.SAD]: '../../assets/images/sad.png',
  [ReactionType.INLOVE]: '../../assets/images/in-love.png',
};

@Injectable({
  providedIn: 'root'
})
export class DataHelperService {

  allFriends: iFriend[] = [
    {
      userProfile: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'David Warner',
      userEmail: 'david@gmail.com'
    },
    {
      userProfile: 'https://images.pexels.com/photos/716411/pexels-photo-716411.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Ben Stoke',
      userEmail: 'Ben@gmail.com'
    },
    {
      userProfile: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Jos Buttler',
      userEmail: 'buttler@gmail.com'
    },
    {
      userProfile: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Cristiane Happle',
      userEmail: 'Cristiane@gmail.com'
    },
    {
      userProfile: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'John Smith',
      userEmail: 'john@gmail.com'
    },
    {
      userProfile: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Mush James',
      userEmail: 'Mush@gmail.com'
    }, {
      userProfile: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Vinicius Wiesehofer',
      userEmail: 'Vinicius@gmail.com'
    },
  ];

  allPosts: iPost[] = [
    {
      postId: '1',
      isNightPost: true,
      userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      userName: 'David Smith',
      postTime: '30 min ago',
      postDate: '30 March 2023',
      postCaption: 'Amazing day',
      postImage: 'https://cdn.pixabay.com/photo/2018/09/09/13/32/fantasy-3664586__480.jpg',
      peopleReactions: [
        {
          userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LOVE
        },
        {
          userAvatar: 'https://images.pexels.com/photos/716411/pexels-photo-716411.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.INLOVE
        },
        {
          userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LIKE
        }
      ]
    },
    {
      postId: '2',
      isNightPost: false,
      userAvatar: 'https://images.pexels.com/photos/716411/pexels-photo-716411.jpeg?auto=compress&cs=tinysrgb&w=600',
      userName: 'Andrea John',
      postTime: '53 min ago',
      postDate: '30 March 2023',
      postCaption: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum sapiente labore sunt voluptas corporis aut. Fugiat obcaecati dolorem quibusdam quia perferendis sequi optio voluptatem, minus dolorum quos in eos eligendi.',
      postImage: '',
      peopleReactions: [
        {
          userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.SAD
        },
        {
          userAvatar: 'https://images.pexels.com/photos/716411/pexels-photo-716411.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LIKE
        },
        {
          userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.SAD
        }
      ]
    },
    {
      postId: '3',
      isNightPost: false,
      userAvatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
      userName: 'Jos Buttler',
      postTime: '1 hour ago',
      postDate: '30 March 2023',
      postCaption: 'Amazing day',
      postImage: 'https://cdn.pixabay.com/photo/2015/06/25/17/56/people-821624__340.jpg',
      peopleReactions: [
        {
          userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.INLOVE
        },
        {
          userAvatar: 'https://images.pexels.com/photos/716411/pexels-photo-716411.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LAUGH
        },
        {
          userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LOVE
        }
      ]
    },
    {
      postId: '4',
      isNightPost: true,
      userAvatar: 'https://images.pexels.com/photos/2253415/pexels-photo-2253415.jpeg?auto=compress&cs=tinysrgb&w=600',
      userName: 'Cristiane Happle',
      postTime: '3 hours ago',
      postDate: '30 March 2023',
      postCaption: 'Amazing day',
      postImage: "https://cdn.pixabay.com/photo/2016/10/18/13/12/landscapes-1750130__480.jpg",
      peopleReactions: [
        {
          userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LOVE
        },
        {
          userAvatar: 'https://images.pexels.com/photos/716411/pexels-photo-716411.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LAUGH
        },
        {
          userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.INLOVE
        }
      ]
    },
    {
      postId: '5',
      isNightPost: false,
      userAvatar: 'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=600',
      userName: 'Spencer Selover',
      postTime: '1 day ago',
      postDate: '30 March 2023',
      postCaption: 'Amazing day',
      postImage: 'https://cdn.pixabay.com/photo/2021/05/11/05/57/men-6245003__340.jpg',
      peopleReactions: [
        {
          userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.INLOVE
        },
        {
          userAvatar: 'https://images.pexels.com/photos/716411/pexels-photo-716411.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LIKE
        },
        {
          userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LOVE
        }
      ]
    },
    {
      postId: '6',
      isNightPost: false,
      userAvatar: 'https://images.pexels.com/photos/3790492/pexels-photo-3790492.jpeg?auto=compress&cs=tinysrgb&w=600',
      userName: 'Wildan Zainul',
      postTime: '1 day ago',
      postDate: '30 March 2023',
      postCaption: 'Amazing day',
      postImage: 'https://cdn.pixabay.com/photo/2023/03/17/05/20/magome-juku-7857919__480.jpg',
      peopleReactions: [
        {
          userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LIKE
        },
        {
          userAvatar: 'https://images.pexels.com/photos/716411/pexels-photo-716411.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LAUGH
        },
        {
          userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.INLOVE
        }
      ]
    },
    {
      postId: '7',
      isNightPost: true,
      userAvatar: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=600',
      userName: 'Danial Xevier',
      postTime: '3 days ago',
      postDate: '30 March 2023',
      postCaption: 'Amazing day',
      postImage: 'https://cdn.pixabay.com/photo/2018/07/19/11/27/milky-way-3548327__480.jpg',
      peopleReactions: [
        {
          userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LOVE
        },
        {
          userAvatar: 'https://images.pexels.com/photos/716411/pexels-photo-716411.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LAUGH
        },
        {
          userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LIKE
        }
      ]
    },
    {
      postId: '8',
      isNightPost: false,
      userAvatar: 'https://images.pexels.com/photos/12301327/pexels-photo-12301327.jpeg?auto=compress&cs=tinysrgb&w=600',
      userName: 'Alena Rubtsova',
      postTime: '4 days ago',
      postDate: '30 March 2023',
      postCaption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis odio aperiam expedita voluptatibus iste, nam animi, mollitia quae, adipisci dolor ab assumenda ut maxime repellat iusto. Debitis, veritatis officia?',
      postImage: '',
      peopleReactions: [
        {
          userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LOVE
        },
        {
          userAvatar: 'https://images.pexels.com/photos/716411/pexels-photo-716411.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LAUGH
        },
        {
          userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LIKE
        }
      ]
    },
    {
      postId: '9',
      isNightPost: false,
      userAvatar: 'https://images.pexels.com/photos/14589717/pexels-photo-14589717.jpeg?auto=compress&cs=tinysrgb&w=600',
      userName: 'Hatice Baran',
      postTime: '5 days ago',
      postDate: '30 March 2023',
      postCaption: 'Childern Splash Asia',
      postImage: 'https://cdn.pixabay.com/photo/2016/11/14/05/21/children-1822688__480.jpg',
      peopleReactions: [
        {
          userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LOVE
        },
        {
          userAvatar: 'https://images.pexels.com/photos/716411/pexels-photo-716411.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LAUGH
        },
        {
          userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LIKE
        }
      ]
    },
    {
      postId: '10',
      isNightPost: false,
      userAvatar: 'https://images.pexels.com/photos/5331154/pexels-photo-5331154.jpeg?auto=compress&cs=tinysrgb&w=600',
      userName: 'Monstera Alvin',
      postTime: '5 days ago',
      postDate: '30 March 2023',
      postCaption: 'Letter Envelop Flowers',
      postImage: 'https://cdn.pixabay.com/photo/2016/05/13/17/16/letter-1390463__480.jpg',
      peopleReactions: [
        {
          userAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LOVE
        },
        {
          userAvatar: 'https://images.pexels.com/photos/716411/pexels-photo-716411.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LAUGH
        },
        {
          userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
          reaction: ReactionType.LIKE
        }
      ]
    },
  ];

  chatList: iChat[] = [
    {
      userProfile: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Jos Buttler',
      lastMessage: 'lorem ipsum is a dummy text.',
      lastMsgTime: '12:00 am',
    },
    {
      userProfile: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Cristiane John',
      lastMessage: 'lorem ipsum is a dummy text.',
      lastMsgTime: '09:30 pm',
    },
    {
      userProfile: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'David Warner',
      lastMessage: 'lorem ipsum is a dummy text.',
      lastMsgTime: '12:00 am',
    },
    {
      userProfile: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'John Smith',
      lastMessage: 'lorem ipsum is a dummy text.',
      lastMsgTime: '02:00 pm',
    },
    {
      userProfile: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Mush Joe',
      lastMessage: 'lorem ipsum is a dummy text.',
      lastMsgTime: '12:00 pm',
    },
    {
      userProfile: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Angelina Marsh',
      lastMessage: 'lorem ipsum is a dummy text.',
      lastMsgTime: 'Today',
    },
    {
      userProfile: 'https://images.pexels.com/photos/718261/pexels-photo-718261.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Sumit Kapoor',
      lastMessage: 'lorem ipsum is a dummy text.',
      lastMsgTime: 'Yesterday',
    },
    {
      userProfile: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Jos Buttler',
      lastMessage: 'lorem ipsum is a dummy text.',
      lastMsgTime: '12:00 am',
    },
    {
      userProfile: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Cristiane John',
      lastMessage: 'lorem ipsum is a dummy text.',
      lastMsgTime: '09:30 pm',
    },
    {
      userProfile: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'David Warner',
      lastMessage: 'lorem ipsum is a dummy text.',
      lastMsgTime: '12:00 am',
    },
    {
      userProfile: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'John Smith',
      lastMessage: 'lorem ipsum is a dummy text.',
      lastMsgTime: '02:00 pm',
    },
    {
      userProfile: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Mush Joe',
      lastMessage: 'lorem ipsum is a dummy text.',
      lastMsgTime: '12:00 pm',
    },
    {
      userProfile: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Angelina Marsh',
      lastMessage: 'lorem ipsum is a dummy text.',
      lastMsgTime: 'Today',
    },
    {
      userProfile: 'https://images.pexels.com/photos/718261/pexels-photo-718261.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Sumit Kapoor',
      lastMessage: 'lorem ipsum is a dummy text.',
      lastMsgTime: 'Yesterday',
    },

  ];

  notificationList: iNotification[] = [
    {
      userProfile: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Jos Buttler',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere consectetur expedita, modi ducimus maiores temporibus asperiores aspernatur, quae tempora magnam totam unde illo eius eos? Totam temporibus repudiandae maiores eveniet.  ',
      commentTime: '12:00 am',
    },
    {
      userProfile: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Cristiane John',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere consectetur expedita, modi ducimus maiores temporibus asperiores aspernatur, quae tempora magnam totam unde illo eius eos? Totam temporibus repudiandae maiores eveniet.  ',
      commentTime: '09:30 pm',
    },
    {
      userProfile: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'David Warner',
      comment: 'lorem ipsum is a dummy text.',
      commentTime: '12:00 am',
    },
    {
      userProfile: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'John Smith',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere consectetur expedita, modi ducimus maiores temporibus asperiores aspernatur, quae tempora magnam totam unde illo eius eos? Totam temporibus repudiandae maiores eveniet.  ',
      commentTime: '02:00 pm',
    },
    {
      userProfile: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Mush Joe',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere consectetur expedita, modi ducimus maiores temporibus asperiores aspernatur, quae tempora magnam totam unde illo eius eos? Totam temporibus repudiandae maiores eveniet.  ',
      commentTime: '12:00 pm',
    },
    {
      userProfile: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Angelina Marsh',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere consectetur expedita, modi ducimus maiores temporibus asperiores aspernatur, quae tempora magnam totam unde illo eius eos? Totam temporibus repudiandae maiores eveniet.  ',
      commentTime: 'Today',
    },
    {
      userProfile: 'https://images.pexels.com/photos/718261/pexels-photo-718261.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Sumit Kapoor',
      comment: 'lorem ipsum is a dummy text.',
      commentTime: 'Yesterday',
    },
    {
      userProfile: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Jos Buttler',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere consectetur expedita, modi ducimus maiores temporibus asperiores aspernatur, quae tempora magnam totam unde illo eius eos? Totam temporibus repudiandae maiores eveniet.  ',
      commentTime: '12:00 am',
    },
    {
      userProfile: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Cristiane John',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere consectetur expedita, modi ducimus maiores temporibus asperiores aspernatur, quae tempora magnam totam unde illo eius eos? Totam temporibus repudiandae maiores eveniet.  ',
      commentTime: '09:30 pm',
    },
    {
      userProfile: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'David Warner',
      comment: 'lorem ipsum is a dummy text.',
      commentTime: '12:00 am',
    },
    {
      userProfile: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'John Smith',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere consectetur expedita, modi ducimus maiores temporibus asperiores aspernatur, quae tempora magnam totam unde illo eius eos? Totam temporibus repudiandae maiores eveniet.  ',
      commentTime: '02:00 pm',
    },
    {
      userProfile: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Mush Joe',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere consectetur expedita, modi ducimus maiores temporibus asperiores aspernatur, quae tempora magnam totam unde illo eius eos? Totam temporibus repudiandae maiores eveniet.  ',
      commentTime: '12:00 pm',
    },
    {
      userProfile: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Angelina Marsh',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere consectetur expedita, modi ducimus maiores temporibus asperiores aspernatur, quae tempora magnam totam unde illo eius eos? Totam temporibus repudiandae maiores eveniet.  ',
      commentTime: 'Today',
    },
    {
      userProfile: 'https://images.pexels.com/photos/718261/pexels-photo-718261.jpeg?auto=compress&cs=tinysrgb&w=600',
      username: 'Sumit Kapoor',
      comment: 'lorem ipsum is a dummy text.',
      commentTime: 'Yesterday',
    },
  ];

  availableFrieindsForChat: iAvailableFriendsForChat[] = [
    {
      userProfile: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Davidson',
      username: 'david_31'
    },
    {
      userProfile: 'https://images.pexels.com/photos/716411/pexels-photo-716411.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'John Smith',
      username: 'john_smith11'
    },
    {
      userProfile: 'https://images.pexels.com/photos/3790492/pexels-photo-3790492.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Wildan Zainul',
      username: 'wildan_88'
    },
    {
      userProfile: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Jos Buttler',
      username: 'Buttler_21'
    },
    {
      userProfile: 'https://images.pexels.com/photos/4063856/pexels-photo-4063856.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Marcus Aurelius',
      username: 'Aurelius_91'
    },
    {
      userProfile: 'https://images.pexels.com/photos/5206279/pexels-photo-5206279.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Polina Koveleva',
      username: 'Polina_983'
    },
    {
      userProfile: 'https://images.pexels.com/photos/718261/pexels-photo-718261.jpeg?auto=compress&cs=tinysrgb&w=600',
      name: 'Sumit Kapoor',
      username: 'Sumit_31'
    },

  ];

  nightPosts: string[] = [
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736881__480.jpg",
    "https://cdn.pixabay.com/photo/2018/09/09/13/32/fantasy-3664586__480.jpg",
    "https://cdn.pixabay.com/photo/2018/10/06/15/25/trees-3728045__480.jpg",
    "https://cdn.pixabay.com/photo/2016/10/18/13/12/landscapes-1750128__480.jpg",
    "https://cdn.pixabay.com/photo/2016/10/18/13/12/landscapes-1750130__480.jpg",
    "https://cdn.pixabay.com/photo/2012/10/04/15/52/chicago-59371__480.jpg",
    "https://cdn.pixabay.com/photo/2017/07/29/00/27/composing-2550334__480.jpg",
    "https://cdn.pixabay.com/photo/2013/03/11/02/14/united-states-92367__480.jpg",
    "https://cdn.pixabay.com/photo/2018/07/19/11/27/milky-way-3548327__480.jpg"
  ];

  constructor() { }
}
