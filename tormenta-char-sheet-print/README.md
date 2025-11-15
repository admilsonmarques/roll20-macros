# Character Sheet Print With Magic Items and Abilities Cards (Tormenta T20 template)

So, I needed to printout my Sheet to have a face to face session, and I decided to vibe code a javascript code to format the Character Sheet in a way I could print it in one page. While doing that I decided to also create cards for Abilities, Magic and Items within the same script.

The cards are sized to Standard and Mini USA, you need to print it in a borderless configuration, otherwise the card can be resized

The Sheet was quite easy to do, I hide a few fields as they became cards :) .

Now the cards were something else. So the code does a feel things:

- Fix formatting and remove break lines
- Add a new line before the pattern `+ Digit PM (Text):` e.g. `+1 PM:` or `+1 PM (Arcanist only):`
  - This is for making the card more readable
- Splits the cards into extra cards if it passes a character threshold, otherwise the card would break
  - On extra cards we add the amount of cards in the cards footer
- Add Character name in the footer

## Examples

### Sheet

### Ability Card

### Magic Card

### Equipment Card

## How to use

On your browser open the Sheet in a new page, open the development tools, go to console and paste the whole code and execute, after that just print.
PS: The page will show the cards behind the character sheet because the code is adding a whole html div in the end of the body tag. But the print out works fine.
