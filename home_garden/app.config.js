import 'dotenv/config';

export default {
    expo: {
        name: 'home_garden',
        version: '1.0.0',
        extra: {
            API_URL: process.env.API_URL,
        },
    },
};