import 'dotenv/config';

export default {
    expo: {
        name: 'HomeGarden',
        version: '1.0.0',
        scheme: 'HomeGarden',
        extra: {
            API_URL: process.env.API_URL,
        },
    },
};