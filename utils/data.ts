import { EventItem } from "./event-types";
import { AnnouncementType } from "./announcement-type";
import { StudyType } from "./study-types";

export type weekProp = {
    
    introduction: string;
    title: string;
    points:  string [];
} 
export type studyDataProp = {
    id: string;
    bibleText:string;
    content: string;
    month: string;
    title: string;
    weeks: weekProp[],
    year: "2025"
}
// export const studyData:studyDataProp[] = [
//     {
//         id: '1',
//         bibleText:"2 Cor. 5:7: For we walk by faith, not by sight.(NKJV) ",
//         content:"Welcome into September, the ninth month of our year of “This Same Jesus!” This month carries deep Biblical significance, often symbolizing the period of birthing, completion, and fulfillment of God's promises. We know that the World today is filled with uncertainties and challenges. These come in many forms—economic instability, health crises, personal loss, social and political unrest, or even the unpredictability of natural disasters. It is essential to recognize that while we cannot control everything that happens around us, we can choose how we respond; and certainly, that must be by faith! Friend, through faith and personal resilience, we can navigate through these difficult times. Just as a child is born in the ninth month, this is a time for us to see the fruits and manifestations of our faith as we trust in God's timing and purpose. Halleluja!",
//         month:"September",
//         title:"Believe System",
//         weeks: [
//             {
//                 introduction: 'sample 1',
//                 title: 'this is a title',
//                 points: [
//                     'point 1', 'point 2', 'point 3'
//                 ]
//             }
//         ],
//         year: "2025"
//     },
//     {
//         id: '2',
//         bibleText:"2 Cor. 5:7: For we walk by faith, not by sight.(NKJV) ",
//         content:"Welcome into September, the ninth month of our year of “This Same Jesus!” This month carries deep Biblical significance, often symbolizing the period of birthing, completion, and fulfillment of God's promises. We know that the World today is filled with uncertainties and challenges. These come in many forms—economic instability, health crises, personal loss, social and political unrest, or even the unpredictability of natural disasters. It is essential to recognize that while we cannot control everything that happens around us, we can choose how we respond; and certainly, that must be by faith! Friend, through faith and personal resilience, we can navigate through these difficult times. Just as a child is born in the ninth month, this is a time for us to see the fruits and manifestations of our faith as we trust in God's timing and purpose. Halleluja!",
//         month:"August",
//         title:"WALKING BY FAITH",
//         weeks: [
//             {
//                 introduction: 'sample 1',
//                 title: 'this is a title',
//                 points: [
//                     'point 1', 'point 2', 'point 3'
//                 ]
//             },
//             {
//                 introduction: 'this is a little introduction just to get some place holders and to make the view look populated',
//                 title: 'this is a title',
//                 points: [
//                     'point 1', 'point 2', 'point 3'
//                 ]
//             },
//         ],
//         year: "2025"
//     }
// ]


export const eventsDataTest:EventItem [] = [
    {
        id: '1',
        title: 'Sunday Worship Service',
        date: 'Mar 3, 2025',
        time: '10:00 AM - 12:00 PM',
        location: 'Main Sanctuary',
        description: 'Join us for our weekly worship service with Pastor Michael Johnson. This week\'s sermon is "Finding Peace in Troubled Times".',
        category: 'worship',
        image: 'https://cdn.pixabay.com/photo/2017/01/03/07/32/bible-1948778_1280.jpg',
        isFeatured: true,
      },
      {
        id: '2',
        title: 'Youth Group Meeting',
        date: 'Mar 5, 2025',
        time: '6:30 PM - 8:00 PM',
        location: 'Youth Center',
        description: 'All teens are welcome to join our midweek youth group for games, worship, and Bible discussion.',
        category: 'youth',
        image: 'https://cdn.pixabay.com/photo/2020/07/11/23/36/meeting-5395615_1280.jpg',
      },
      {
        id: '3',
        title: 'Bible Study: Book of Romans',
        date: 'Mar 7, 2025',
        time: '7:00 PM - 8:30 PM',
        location: 'Fellowship Hall',
        description: 'An in-depth study of the Book of Romans led by Elder Sarah Williams. Open to all knowledge levels.',
        category: 'bible',
        image: `https://cdn.pixabay.com/photo/2022/03/25/23/47/bible-7092020_1280.jpg`,
      },
      {
        id: '4',
        title: 'Community Outreach: Food Drive',
        date: 'Mar 8, 2025',
        time: '9:00 AM - 1:00 PM',
        location: 'Church Parking Lot',
        description: 'Help us collect non-perishable food items for the local food bank. Volunteers needed!',
        category: 'community',
        image: `https://cdn.pixabay.com/photo/2016/02/05/15/34/pasta-1181189_1280.jpg`,
        isFeatured: true,
      },
      {
        id: '5',
        title: 'Prayer Breakfast',
        date: 'Mar 10, 2025',
        time: '7:30 AM - 9:00 AM',
        location: 'Church Cafeteria',
        description: 'Start your week with fellowship and prayer. Breakfast will be served. All are welcome.',
        category: 'worship',
        image: `https://cdn.pixabay.com/photo/2012/02/29/12/17/bread-18987_1280.jpg`,
      },
      {
        id: '6',
        title: 'Children\'s Ministry Volunteer Meeting',
        date: 'Mar 11, 2025',
        time: '6:00 PM - 7:00 PM',
        location: 'Children\'s Wing',
        description: 'Training session for all current and new children\'s ministry volunteers.',
        category: 'community',
        image: `https://cdn.pixabay.com/photo/2017/06/16/10/29/kids-2408614_1280.jpg`,
      },
      {
        id: '7',
        title: 'Young Adults Bible Study',
        date: 'Mar 12, 2025',
        time: '7:00 PM - 9:00 PM',
        location: 'Coffee Shop Area',
        description: 'Bible study and discussion focused on applying faith in everyday life for adults 18-30.',
        category: 'bible',
        image: `https://cdn.pixabay.com/photo/2022/07/13/17/02/girls-7319675_1280.jpg`,
      },
      {
        id: '8',
        title: 'Wednesday Night Worship',
        date: 'Mar 12, 2025',
        time: '7:00 PM - 8:30 PM',
        location: 'Main Sanctuary',
        description: 'Midweek worship service with contemporary music and a message from Pastor David.',
        category: 'worship',
        image: `https://cdn.pixabay.com/photo/2020/03/29/08/07/prayer-4979713_1280.jpg`,
      },
];


// Mock data for church announcements
export const announcementDataFAke:AnnouncementType[] = [
  {
    id: '1',
    title: 'Sunday Worship Service',
    content: 'Join us this Sunday for our worship service at 10:00 AM. Pastor Johnson will be continuing our sermon series on "Living with Purpose" with a message from Philippians 2. The worship team will be led by Sarah Miller. Children\'s ministry will be available for ages 0-12.',
    date: '2025-03-05T10:00:00Z',
    category: 'Worship',
    eventDate: '2025-03-09T10:00:00Z',
    time: '10:00 AM',
    location: '123 Faith Street, Graceville',
    imageUrl: 'https://media.istockphoto.com/id/1754468293/photo/trinity-church-wall-street-new-york-city.jpg?s=1024x1024&w=is&k=20&c=tIjVSlff3hh3hw52g_VUpcvtEm4yyKZvUmVrMjse_Ks=',
  },
  {
    id: '2',
    title: 'Youth Group Retreat Registration',
    content: 'Registration is now open for our annual Youth Group Summer Retreat at Camp Evergreen. This year\'s theme is "Rooted in Faith". The retreat is open to all youth in grades 7-12. Cost is $175 which includes transportation, lodging, meals, and activities. Scholarships are available - please contact the youth pastor for details.',
    date: '2025-03-04T15:30:00Z',
    category: 'Youth',
    eventDate: '2025-06-15T09:00:00Z',
    time: 'June 15-19',
    contactPerson: 'Pastor Mike Williams',
    contactEmail: 'youth@gracechurch.org',
    contactPhone: '(555) 123-4567',
    imageUrl: 'https://media.istockphoto.com/id/2161532635/photo/group-of-friends-enjoying-time-together-outdoors-smiling-and-laughing.jpg?s=1024x1024&w=is&k=20&c=mXlJNeFS3kHgfZdbOmOfqFJ42PLfdeb_JApilFjQJ5I=',
  },
  {
    id: '3',
    title: 'Community Food Drive',
    content: 'Our monthly food drive for the local food bank is this Saturday morning. We are collecting non-perishable food items, hygiene products, and household supplies. Volunteers are also needed to help sort and deliver donations. This is a great opportunity to serve our community and make a real difference for families in need.',
    date: '2025-03-02T09:45:00Z',
    category: 'Service',
    eventDate: '2025-03-08T09:00:00Z',
    time: '9:00 AM - 12:00 PM',
    location: 'Church Parking Lot',
    contactPerson: 'Deacon Robert Davis',
    contactEmail: 'outreach@gracechurch.org',
  },
  {
    id: '4',
    title: 'Women\'s Bible Study',
    content: 'The Women\'s Bible Study group will begin a new 8-week study on the Book of Ruth titled "Redeeming Love" starting next Wednesday. All women are welcome to join us for this time of fellowship and spiritual growth. Study guides will be available for purchase ($15) at the welcome desk, or you can order online through the church website.',
    date: '2025-02-28T16:20:00Z',
    category: 'Prayer',
    eventDate: '2025-03-12T18:30:00Z',
    time: '6:30 PM - 8:00 PM',
    location: 'Fellowship Hall',
    contactPerson: 'Jennifer Anderson',
    contactEmail: 'women@gracechurch.org',
  },
  {
    id: '5',
    title: 'Mission Trip Fundraiser Dinner',
    content: 'Please join us for a special fundraiser dinner to support our summer mission trip to Guatemala. Enjoy an authentic Guatemalan dinner prepared by our mission team, hear testimonies from previous trips, and learn how you can support this important outreach. Suggested donation is $25 per person, but all are welcome regardless of ability to donate.',
    date: '2025-02-25T11:15:00Z',
    category: 'Mission',
    eventDate: '2025-03-22T17:00:00Z',
    time: '5:00 PM',
    location: 'Church Fellowship Hall',
    contactPerson: 'Pastor David Thompson',
    contactEmail: 'missions@gracechurch.org',
    imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/11/18/table-setting-791148_1280.jpg',
  },
//   {
//     id: '6',
//     title: 'Church Picnic & Baptism Service',
//     content: 'Our annual church picnic and baptism service will be held at Lake Serenity next month. If you are interested in being baptized, please contact Pastor Johnson to schedule a meeting. The church will provide hamburgers, hot dogs, and drinks. Please bring a side dish or dessert to share. There will be games and activities for all ages!',
//     date: '2025-02-22T14:00:00Z',
//     category: 'Community',
//     eventDate: '2025-04-19T12:00:00Z',
//   }
]

interface study  {
  title: string,
  text: [
    {
      scripture: string;
      content: string;
    }
  ],
  introduction: string;
  weeks: [
    {
      title: string;
      task?: string;
      main_points: [
        {
          title: string;
          text?: string;
          points?: [
            {
              title?: string;
              text?: string;
              sub_points?: string []
            }
          ] 
        }
      ]

    }
  ]

}

export const studyData2: StudyType[] = [
  {
    id: "1",
    title: "Faith in Action: The Book of James",
    month: 'january',
    text: [
      {
        scripture: "James 1:2-4",
        content: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete, not lacking anything."
      },
      {
        scripture: "James 1:22",
        content: "Do not merely listen to the word, and so deceive yourselves. Do what it says."
      }
    ],
    introduction: "James, a servant of God and of the Lord Jesus Christ, writes to the twelve tribes scattered among the nations. This practical book focuses on living out our faith through actions and addresses how authentic faith behaves in daily life.",
    weeks: [
      {
        id: "1",
        title: "Week 1: Faith and Trials",
        task: "Read James chapter 1 and reflect on how trials shape our faith.",
        main_points: [
          {
            title: "Finding Joy in Trials",
            text: "James calls us to consider trials as opportunities for joy and growth.",
            points: [
              {
                title: "The Purpose of Trials",
                text: "Trials test our faith and develop perseverance.",
                sub_points: [
                  "Trials reveal what we truly believe",
                  "Trials strengthen our character",
                  "Trials prepare us for greater service"
                ]
              },
              {
                title: "The Outcome of Perseverance",
                text: "Maturity and completeness come through enduring challenges.",
                sub_points: [
                  "Spiritual maturity",
                  "Emotional stability",
                  "Deeper relationship with God"
                ]
              }
            ]
          },
          {
            title: "Wisdom for the Journey",
            text: "God generously gives wisdom to those who ask in faith.",
            points: [
              {
                title: "How to Ask for Wisdom",
                text: "Ask with confidence and without doubting.",
                sub_points: [
                  "Believe that God wants to give wisdom",
                  "Trust God's timing and methods",
                  "Apply the wisdom you receive"
                ]
              }
            ]
          },
          {
            title: "Being Doers of the Word",
            text: "James emphasizes the importance of not just hearing but doing.",
            points: [
              {
                title: "The Danger of Self-Deception",
                text: "Merely listening without acting is spiritual self-deception.",
                sub_points: [
                  "Knowledge without application is fruitless",
                  "True blessing comes through action",
                  "Our actions demonstrate what we truly believe"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "2",
        title: "Week 2: Faith and Partiality",
        task: "Read James chapter 2 and examine how favoritism contradicts the gospel.",
        main_points: [
          {
            title: "Favoritism Forbidden",
            text: "Showing partiality contradicts faith in Christ."
          },
          {
            title: "The Royal Law of Love",
            text: "Loving your neighbor fulfills God's law."
          }
        ]
      }
    ]
  }
]