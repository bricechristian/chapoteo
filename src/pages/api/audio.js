export default async (req, res) => {
    const { word } = req.query;
    const response = await fetch(`https://dictionaryapi.com/api/v3/references/spanish/json/${word}?key=${process.env.NEXT_MERRIAM_WEBSTER_API}`);
    // const response = await fetch(`https://apifree.forvo.com/action/word-pronunciations/format/json/word/${word}/id_lang_speak/41/sex/m/key/${process.env.NEXT_FORVO_API}/`);
    const data = await response.json();
    // const result = data.items.filter(({country}) => country === "Mexico") !== undefined ? data.items.filter(({country}) => country === "Mexico")[0] : data.items[0]
    const audioKey = await data[0].hwi.prs[0].sound.audio;
    res.status(200).json({ audioKey });
}