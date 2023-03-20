const MostCommonWords = require('thousand-most-common-words')

export default function handler(req, res) {
    const words = MostCommonWords.getWordsByLanguageCode('es');
    res.status(200).json({ words })
}