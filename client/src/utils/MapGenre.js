export const MapGenre = (emotion) => {
    let maxIndex = 0, maxEmotionValue = 0;

    for (let i = 0; i < emotion.length; i++) {
        if (emotion[i] > maxEmotionValue) {
            maxEmotionValue = emotion[i];
            maxIndex = i;
        }
    }
    //Happy, Sad, Angry, Surprise, Fear
    const SelectedGenres = [
        ['Action', 'Fantasy', 'Crime', 'Western'],
        ['Comedy', 'Drama', 'Music', 'TV Movie'],
        ['Animation', 'Family', 'Romance', 'Thriller'],
        ['Adventure', 'Horror', 'Mystery', 'War'],
        ['Documentary', 'History', 'Science Fiction']
    ]
    
    return SelectedGenres[maxIndex];
}