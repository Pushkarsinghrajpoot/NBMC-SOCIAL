// Dummy data for NBMC Analytics demo

export const dummyTrackedPages = [
  {
    id: '1',
    user_id: 'demo-user',
    page_id: 'coca-cola',
    page_name: 'Coca-Cola',
    page_category: 'Food & Beverage',
    fan_count: 108000000,
    followers_count: 108500000,
    about: 'The Coca-Cola page is your source for all the latest news, updates, and happenings from Coca-Cola.',
    profile_picture: 'https://picsum.photos/seed/coca-cola/200/200.jpg',
    added_at: '2024-01-01T00:00:00Z',
    last_synced: '2024-03-12T00:00:00Z'
  },
  {
    id: '2',
    user_id: 'demo-user',
    page_id: 'pepsi',
    page_name: 'Pepsi',
    page_category: 'Food & Beverage',
    fan_count: 37000000,
    followers_count: 37200000,
    about: 'For the love of Pepsi. Official Pepsi page.',
    profile_picture: 'https://picsum.photos/seed/pepsi/200/200.jpg',
    added_at: '2024-01-02T00:00:00Z',
    last_synced: '2024-03-12T00:00:00Z'
  },
  {
    id: '3',
    user_id: 'demo-user',
    page_id: 'nike',
    page_name: 'Nike',
    page_category: 'Sports & Recreation',
    fan_count: 38000000,
    followers_count: 38200000,
    about: 'If you have a body, you are an athlete.',
    profile_picture: 'https://picsum.photos/seed/nike/200/200.jpg',
    added_at: '2024-01-03T00:00:00Z',
    last_synced: '2024-03-12T00:00:00Z'
  },
  {
    id: '4',
    user_id: 'demo-user',
    page_id: 'apple',
    page_name: 'Apple',
    page_category: 'Technology',
    fan_count: 25000000,
    followers_count: 25100000,
    about: 'Apple designs and creates iPhone, iPad, Mac, Apple Watch, and Apple TV.',
    profile_picture: 'https://picsum.photos/seed/apple/200/200.jpg',
    added_at: '2024-01-04T00:00:00Z',
    last_synced: '2024-03-12T00:00:00Z'
  },
  {
    id: '5',
    user_id: 'demo-user',
    page_id: 'mcdonalds',
    page_name: 'McDonald\'s',
    page_category: 'Food & Restaurant',
    fan_count: 82000000,
    followers_count: 82500000,
    about: 'I\'m lovin\' it',
    profile_picture: 'https://picsum.photos/seed/mcdonalds/200/200.jpg',
    added_at: '2024-01-05T00:00:00Z',
    last_synced: '2024-03-12T00:00:00Z'
  }
];

export const dummyPosts = [
  // Coca-Cola posts
  {
    id: '1',
    page_id: 'coca-cola',
    post_id: 'post-1',
    message: 'Taste the feeling! 🥤 What\'s your favorite Coca-Cola moment? Share with us! #CocaCola #TasteTheFeeling',
    created_time: '2024-03-11T15:30:00Z',
    likes_count: 15420,
    comments_count: 892,
    shares_count: 234,
    reactions_count: 16234,
    post_type: 'photo',
    full_picture: 'https://picsum.photos/seed/coke1/600/400.jpg',
    permalink_url: 'https://facebook.com/coca-cola/posts/123'
  },
  {
    id: '2',
    page_id: 'coca-cola',
    post_id: 'post-2',
    message: 'Summer is coming! ☀️ Time to cool down with an ice-cold Coca-Cola. Who\'s ready for beach season? #Summer vibes',
    created_time: '2024-03-10T12:00:00Z',
    likes_count: 12350,
    comments_count: 567,
    shares_count: 189,
    reactions_count: 13106,
    post_type: 'video',
    full_picture: 'https://picsum.photos/seed/coke2/600/400.jpg',
    permalink_url: 'https://facebook.com/coca-cola/posts/124'
  },
  
  // Pepsi posts
  {
    id: '3',
    page_id: 'pepsi',
    post_id: 'post-3',
    message: 'Pepsi or Coke? The ultimate debate! 🥤 Cast your vote below! #PepsiChallenge',
    created_time: '2024-03-11T18:00:00Z',
    likes_count: 8920,
    comments_count: 1234,
    shares_count: 156,
    reactions_count: 10310,
    post_type: 'photo',
    full_picture: 'https://picsum.photos/seed/pepsi1/600/400.jpg',
    permalink_url: 'https://facebook.com/pepsi/posts/123'
  },
  {
    id: '4',
    page_id: 'pepsi',
    post_id: 'post-4',
    message: 'New flavor alert! 🚨 Try our new Pepsi Mango. Limited time only! #NewFlavor #Pepsi',
    created_time: '2024-03-09T14:30:00Z',
    likes_count: 6780,
    comments_count: 432,
    shares_count: 98,
    reactions_count: 7310,
    post_type: 'photo',
    full_picture: 'https://picsum.photos/seed/pepsi2/600/400.jpg',
    permalink_url: 'https://facebook.com/pepsi/posts/124'
  },

  // Nike posts
  {
    id: '5',
    page_id: 'nike',
    post_id: 'post-5',
    message: 'Just Do It. 💪 What\'s your fitness goal this week? #Nike #JustDoIt #Fitness',
    created_time: '2024-03-11T06:00:00Z',
    likes_count: 18920,
    comments_count: 1567,
    shares_count: 456,
    reactions_count: 20943,
    post_type: 'video',
    full_picture: 'https://picsum.photos/seed/nike1/600/400.jpg',
    permalink_url: 'https://facebook.com/nike/posts/123'
  },
  {
    id: '6',
    page_id: 'nike',
    post_id: 'post-6',
    message: 'New Air Max drop! 🔥 Available now in stores and online. Who\'s copping? #Nike #AirMax',
    created_time: '2024-03-10T10:00:00Z',
    likes_count: 25670,
    comments_count: 2341,
    shares_count: 789,
    reactions_count: 28800,
    post_type: 'photo',
    full_picture: 'https://picsum.photos/seed/nike2/600/400.jpg',
    permalink_url: 'https://facebook.com/nike/posts/124'
  },

  // Apple posts
  {
    id: '7',
    page_id: 'apple',
    post_id: 'post-7',
    message: 'iPhone 15 Pro. Titanium. So strong. So light. So Pro. 📱 #Apple #iPhone15Pro',
    created_time: '2024-03-11T09:00:00Z',
    likes_count: 34520,
    comments_count: 2890,
    shares_count: 1234,
    reactions_count: 38644,
    post_type: 'video',
    full_picture: 'https://picsum.photos/seed/apple1/600/400.jpg',
    permalink_url: 'https://facebook.com/apple/posts/123'
  },
  {
    id: '8',
    page_id: 'apple',
    post_id: 'post-8',
    message: 'The future of health is on your wrist. ❤️ Apple Watch Series 9 #AppleWatch #Health',
    created_time: '2024-03-09T16:30:00Z',
    likes_count: 28930,
    comments_count: 1876,
    shares_count: 987,
    reactions_count: 31793,
    post_type: 'photo',
    full_picture: 'https://picsum.photos/seed/apple2/600/400.jpg',
    permalink_url: 'https://facebook.com/apple/posts/124'
  },

  // McDonald's posts
  {
    id: '9',
    page_id: 'mcdonalds',
    post_id: 'post-9',
    message: 'I\'m lovin\' it! 🍔🍟 Who\'s hungry for McDonald\'s? #McDonalds #ILoveIt',
    created_time: '2024-03-11T12:30:00Z',
    likes_count: 19870,
    comments_count: 1234,
    shares_count: 567,
    reactions_count: 21671,
    post_type: 'photo',
    full_picture: 'https://picsum.photos/seed/mcd1/600/400.jpg',
    permalink_url: 'https://facebook.com/mcdonalds/posts/123'
  },
  {
    id: '10',
    page_id: 'mcdonalds',
    post_id: 'post-10',
    message: 'Happy Meal time! 🎉 Kids eat free this weekend with any adult meal purchase. #HappyMeal #FamilyFun',
    created_time: '2024-03-10T11:00:00Z',
    likes_count: 15430,
    comments_count: 987,
    shares_count: 345,
    reactions_count: 16762,
    post_type: 'photo',
    full_picture: 'https://picsum.photos/seed/mcd2/600/400.jpg',
    permalink_url: 'https://facebook.com/mcdonalds/posts/124'
  }
];

export const dummyComments = [
  {
    id: '1',
    post_id: 'post-1',
    comment_id: 'comment-1',
    message: 'Love Coca-Cola! Best drink ever! 🥤',
    like_count: 23,
    commenter_name: 'Sarah Johnson',
    created_time: '2024-03-11T16:00:00Z',
    sentiment: 'positive',
    fetched_at: '2024-03-12T00:00:00Z'
  },
  {
    id: '2',
    post_id: 'post-1',
    comment_id: 'comment-2',
    message: 'My favorite moment is sharing with friends at parties!',
    like_count: 15,
    commenter_name: 'Mike Chen',
    created_time: '2024-03-11T16:15:00Z',
    sentiment: 'positive',
    fetched_at: '2024-03-12T00:00:00Z'
  },
  {
    id: '3',
    post_id: 'post-1',
    comment_id: 'comment-3',
    message: 'Too much sugar in these drinks',
    like_count: 5,
    commenter_name: 'Health Conscious',
    created_time: '2024-03-11T16:30:00Z',
    sentiment: 'negative',
    fetched_at: '2024-03-12T00:00:00Z'
  },
  {
    id: '4',
    post_id: 'post-1',
    comment_id: 'comment-4',
    message: 'The classic taste never gets old',
    like_count: 18,
    commenter_name: 'Tom Wilson',
    created_time: '2024-03-11T17:00:00Z',
    sentiment: 'positive',
    fetched_at: '2024-03-12T00:00:00Z'
  },
  {
    id: '5',
    post_id: 'post-1',
    comment_id: 'comment-5',
    message: 'I prefer the zero sugar version',
    like_count: 8,
    commenter_name: 'Lisa Park',
    created_time: '2024-03-11T17:15:00Z',
    sentiment: 'neutral',
    fetched_at: '2024-03-12T00:00:00Z'
  },
  {
    id: '6',
    post_id: 'post-5',
    comment_id: 'comment-6',
    message: 'Nike inspires me to push harder every day! 💪',
    like_count: 45,
    commenter_name: 'Athlete Life',
    created_time: '2024-03-11T07:00:00Z',
    sentiment: 'positive',
    fetched_at: '2024-03-12T00:00:00Z'
  },
  {
    id: '7',
    post_id: 'post-5',
    comment_id: 'comment-7',
    message: 'My goal is to run 5K this week!',
    like_count: 23,
    commenter_name: 'Runner Girl',
    created_time: '2024-03-11T07:30:00Z',
    sentiment: 'positive',
    fetched_at: '2024-03-12T00:00:00Z'
  },
  {
    id: '8',
    post_id: 'post-5',
    comment_id: 'comment-8',
    message: 'Just Do It has been my motto for years',
    like_count: 34,
    commenter_name: 'John Smith',
    created_time: '2024-03-11T08:00:00Z',
    sentiment: 'positive',
    fetched_at: '2024-03-12T00:00:00Z'
  },
  {
    id: '9',
    post_id: 'post-7',
    comment_id: 'comment-9',
    message: 'The titanium finish looks amazing! 🤩',
    like_count: 67,
    commenter_name: 'Tech Enthusiast',
    created_time: '2024-03-11T10:00:00Z',
    sentiment: 'positive',
    fetched_at: '2024-03-12T00:00:00Z'
  },
  {
    id: '10',
    post_id: 'post-7',
    comment_id: 'comment-10',
    message: 'Way too expensive for what it offers',
    like_count: 12,
    commenter_name: 'Budget Shopper',
    created_time: '2024-03-11T10:30:00Z',
    sentiment: 'negative',
    fetched_at: '2024-03-12T00:00:00Z'
  }
];

export const dummyInsights = [
  // Coca-Cola insights
  {
    id: '1',
    page_id: 'coca-cola',
    recorded_date: '2024-03-01',
    fan_count: 107500000,
    followers_count: 108000000
  },
  {
    id: '2',
    page_id: 'coca-cola',
    recorded_date: '2024-03-05',
    fan_count: 107800000,
    followers_count: 108200000
  },
  {
    id: '3',
    page_id: 'coca-cola',
    recorded_date: '2024-03-10',
    fan_count: 108000000,
    followers_count: 108500000
  },

  // Pepsi insights
  {
    id: '4',
    page_id: 'pepsi',
    recorded_date: '2024-03-01',
    fan_count: 36800000,
    followers_count: 36900000
  },
  {
    id: '5',
    page_id: 'pepsi',
    recorded_date: '2024-03-05',
    fan_count: 36900000,
    followers_count: 37000000
  },
  {
    id: '6',
    page_id: 'pepsi',
    recorded_date: '2024-03-10',
    fan_count: 37000000,
    followers_count: 37200000
  },

  // Nike insights
  {
    id: '7',
    page_id: 'nike',
    recorded_date: '2024-03-01',
    fan_count: 37800000,
    followers_count: 37900000
  },
  {
    id: '8',
    page_id: 'nike',
    recorded_date: '2024-03-05',
    fan_count: 37900000,
    followers_count: 38000000
  },
  {
    id: '9',
    page_id: 'nike',
    recorded_date: '2024-03-10',
    fan_count: 38000000,
    followers_count: 38200000
  },

  // Apple insights
  {
    id: '10',
    page_id: 'apple',
    recorded_date: '2024-03-01',
    fan_count: 24800000,
    followers_count: 24900000
  },
  {
    id: '11',
    page_id: 'apple',
    recorded_date: '2024-03-05',
    fan_count: 24900000,
    followers_count: 25000000
  },
  {
    id: '12',
    page_id: 'apple',
    recorded_date: '2024-03-10',
    fan_count: 25000000,
    followers_count: 25100000
  },

  // McDonald's insights
  {
    id: '13',
    page_id: 'mcdonalds',
    recorded_date: '2024-03-01',
    fan_count: 81800000,
    followers_count: 82000000
  },
  {
    id: '14',
    page_id: 'mcdonalds',
    recorded_date: '2024-03-05',
    fan_count: 82000000,
    followers_count: 82200000
  },
  {
    id: '15',
    page_id: 'mcdonalds',
    recorded_date: '2024-03-10',
    fan_count: 82000000,
    followers_count: 82500000
  }
];


export const brands = [
  { name: "Coca-Cola", code: "cocacolaindia", category: "Beverages" },
  { name: "Pepsi", code: "pepsiindia", category: "Beverages" },
  { name: "Nike", code: "nike", category: "Sports" },
  { name: "Apple", code: "apple", category: "Technology" },
  { name: "McDonald's", code: "mcdonalds", category: "Food" },
];