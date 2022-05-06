import path from 'path-browserify';


export const getUrl = (...url: string[]) => {
    if (process.env.NODE_ENV === 'production') {
        return path.resolve('/saihate', ...url);
    }
    return path.resolve('/', ...url);
};
