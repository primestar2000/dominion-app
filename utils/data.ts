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
export const studyData:studyDataProp[] = [
    {
        id: '1',
        bibleText:"2 Cor. 5:7: For we walk by faith, not by sight.(NKJV) ",
        content:"Welcome into September, the ninth month of our year of “This Same Jesus!” This month carries deep Biblical significance, often symbolizing the period of birthing, completion, and fulfillment of God's promises. We know that the World today is filled with uncertainties and challenges. These come in many forms—economic instability, health crises, personal loss, social and political unrest, or even the unpredictability of natural disasters. It is essential to recognize that while we cannot control everything that happens around us, we can choose how we respond; and certainly, that must be by faith! Friend, through faith and personal resilience, we can navigate through these difficult times. Just as a child is born in the ninth month, this is a time for us to see the fruits and manifestations of our faith as we trust in God's timing and purpose. Halleluja!",
        month:"September",
        title:"Believe System",
        weeks: [
            {
                introduction: 'sample 1',
                title: 'this is a title',
                points: [
                    'point 1', 'point 2', 'point 3'
                ]
            }
        ],
        year: "2025"
    },
    {
        id: '2',
        bibleText:"2 Cor. 5:7: For we walk by faith, not by sight.(NKJV) ",
        content:"Welcome into September, the ninth month of our year of “This Same Jesus!” This month carries deep Biblical significance, often symbolizing the period of birthing, completion, and fulfillment of God's promises. We know that the World today is filled with uncertainties and challenges. These come in many forms—economic instability, health crises, personal loss, social and political unrest, or even the unpredictability of natural disasters. It is essential to recognize that while we cannot control everything that happens around us, we can choose how we respond; and certainly, that must be by faith! Friend, through faith and personal resilience, we can navigate through these difficult times. Just as a child is born in the ninth month, this is a time for us to see the fruits and manifestations of our faith as we trust in God's timing and purpose. Halleluja!",
        month:"August",
        title:"WALKING BY FAITH",
        weeks: [
            {
                introduction: 'sample 1',
                title: 'this is a title',
                points: [
                    'point 1', 'point 2', 'point 3'
                ]
            },
            {
                introduction: 'this is a little introduction just to get some place holders and to make the view look populated',
                title: 'this is a title',
                points: [
                    'point 1', 'point 2', 'point 3'
                ]
            },
        ],
        year: "2025"
    }
]

