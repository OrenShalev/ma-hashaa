# ma-hashaa (מָה הַשָּׁעָה?)

Returns the current time or a given time in Hebrew words.

Mostly vibe-coded and only lightly scrutinized.

## Quick Start

```bash
# Get current time (with Nikud by default)
npx ma-hashaa // רקֶוֹבּבַּ יצִחֵוְ רשֶׂעֶ

# Get specific time
npx ma-hashaa 10:10 // רקֶוֹבּבַּ הרָשָׂעֲוַ רשֶׂעֶ

# Without Nikud
npx ma-hashaa --no-nikud // עשר וחצי בבוקר
```

Or install the package and use it as a library:

```javascript
import maHashaa from 'ma-hashaa';

maHashaa()
maHashaa("10:30")
maHashaa("10:30", false) // no Nikud
```

## Motivation

[שעון המלים](https://x.com/mmariansky/status/2023456756601417814) (Words Clock) by Matty Mariansky.

It's pretty interesting how we convert a time to words. Just an example: why do use masculine for "וחמישה" but feminine for "ושש דקות"? And why does only the latter use "דקות"?

I wanted to try to convert these "decisions" we make offhand to code, learn how to publish an npm package (finally...), and maybe use it in some place but we'll see about that.

## RTL

This is a real pain when looking at output, code, Markdown files like this one, agent output, and more. I haven't gotten around to properly investigating, but wrote a utility for reversing text with Nikud, which is good enough for now.

## License

MIT
