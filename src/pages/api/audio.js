
export default async (req, res) => {
    const { word } = req.query;
    const response = await fetch(`https://dictionaryapi.com/api/v3/references/spanish/json/${word}?key=${process.env.NEXT_MERRIAM_WEBSTER_API}`);
    const data = await response.json();
    const audioKey = await data[0].hwi.prs[0].sound.audio;
    res.status(200).json({ audioKey });
}