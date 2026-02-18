import { mockThreats, mockEntities, mockLinks, mockSectors, mockTimelineData, type Threat, type Entity, type Link, type Sector, type TimelineData } from '../data/mockData';


// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const threatService = {
    getThreats: async (): Promise<Threat[]> => {
        await delay(500); // Simulate network latency
        return [...mockThreats];
    },

    getThreatById: async (id: string): Promise<Threat | undefined> => {
        await delay(300);
        return mockThreats.find(t => t.id === id);
    },

    // In a real app, this would query the backend with filters
    searchThreats: async (query: string): Promise<Threat[]> => {
        await delay(400);
        const lowerQuery = query.toLowerCase();
        return mockThreats.filter(t =>
            t.title.toLowerCase().includes(lowerQuery) ||
            t.id.toLowerCase().includes(lowerQuery)
        );
    },

    getEntities: async (): Promise<Entity[]> => {
        await delay(600);
        return [...mockEntities];
    },

    getLinks: async (): Promise<Link[]> => {
        await delay(600);
        return [...mockLinks];
    },

    getSectors: async (): Promise<Sector[]> => {
        await delay(500);
        return [...mockSectors];
    },

    getThreatTimeline: async (): Promise<TimelineData[]> => {
        await delay(700);
        return [...mockTimelineData];
    }
};
