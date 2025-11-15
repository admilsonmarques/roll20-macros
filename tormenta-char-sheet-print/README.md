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

The original sheet:
<img width="889" height="1887" alt="image" src="https://github.com/user-attachments/assets/8e728a17-9a3f-42ad-ad1c-4a04d30aeb4c" />

The printout:
<img width="608" height="838" alt="image" src="https://github.com/user-attachments/assets/fd7e5914-878f-4fac-b7a3-b4605023a5d4" />

### Ability Card

On the sheet:
<img width="645" height="546" alt="image" src="https://github.com/user-attachments/assets/3e970aec-595f-40c6-9e69-81d53b8b9db6" />

The Card:
<img width="709" height="500" alt="image" src="https://github.com/user-attachments/assets/80221996-9ed7-4168-8778-21f3ba3dbec0" />

### Magic Card

On the sheet:
<img width="644" height="565" alt="image" src="https://github.com/user-attachments/assets/b612c3ad-3a8c-4f88-9fd3-9be7a8b8bd4d" />

The Card:
<img width="1084" height="498" alt="image" src="https://github.com/user-attachments/assets/8628a9ba-fec0-42c3-85cb-e21635c0fe46" />

### Equipment Card

On the sheet:
<img width="405" height="322" alt="image" src="https://github.com/user-attachments/assets/78b9e081-5a48-4627-9711-811416cdad9b" />

The Cards (with a magic for size comparison):
<img width="261" height="830" alt="image" src="https://github.com/user-attachments/assets/fedde269-c031-439c-88e7-2550de73394b" />

## How to use

On your browser open the Sheet in a new page , open the development tools, go to console and paste the whole javascript code and execute, after that just print.
PS: The page will show the cards behind the character sheet because the code is adding a whole html div in the end of the body tag. But the print out works fine.
PS: The CSS files can be ignored, the javascript file already have the same CSS inline it.

<img width="1903" height="1053" alt="image" src="https://github.com/user-attachments/assets/444a2bfe-01b9-40fe-b92b-5019133473f8" />
