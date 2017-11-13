export class Week {

    days: Array<Day> = [];

    constructor() {

        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        days.forEach((dayName: string, index: number) => {
            this.days.push({ name: dayName, day: index, times: { date: '', entries: [] } });
        });
    }
}

export interface Day {
    name: string; // S-M-T-W-T-F-S
    date?: number; //1-31
    day: number; //0-6,
    times: TimesList;
}

export interface TimesList {
    date: string;
    entries: Array<any>;
}

export interface Time{
    title: string;
    duration: number;
    date?: number;
    activity: {
        id: number,
        name: string
    };
    isNew?: boolean;
}