(function generateAllCharacterCards() {
  console.clear();
  console.log("--- Starting FINAL Card Generation (Text Isolation Fix) ---");

  // 1. Setup the container (using window to ensure global scope in console)
  const oldContainer = document.getElementById("card-output-container-unified");
  if (oldContainer) {
    oldContainer.remove();
  }
  window.newCardsContainer = document.createElement("div");
  window.newCardsContainer.id = "card-output-container-unified";
  window.newCardsContainer.style.cssText =
    "display: flex; flex-wrap: wrap; gap: 1px;";
  // window.newCardsContainer.innerHTML = '<h3>Generated Character Cards (MTG Size):</h3>';
  document.body.appendChild(window.newCardsContainer);

  let totalCards = 0;
  const MAX_CHARS_PER_CARD = 550;

  // --- CHARACTER NAME EXTRACTION ---
  const characterNameInput = document.querySelector(
    'input[name="attr_character_name"]',
  );
  const characterName = characterNameInput
    ? characterNameInput.value.trim()
    : "Unnamed Character";

  // --- CSS Color Definitions ---
  const TYPE_COLORS = {
    ability: "#DA0F20",
    menace: "#AB893A",
    magic: "#007bff",
    equipment: "#535353",
  };

  // Function 1: Splits clean text based on character count and period (DOT) breaks
  function splitDescriptionIntoChunks(fullText, maxLength) {
    // Normalize spaces and newlines
    const sanitizedText = fullText
      .replace(/\s*\n\s*/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const chunks = [];
    let remainingText = sanitizedText;

    while (remainingText.length > 0) {
      if (remainingText.length <= maxLength) {
        chunks.push(remainingText);
        remainingText = "";
      } else {
        let slicePoint = maxLength;
        let tempSlice = remainingText.substring(0, slicePoint);

        // Look for a period in the latter half of the slice
        let breakIndex = tempSlice.lastIndexOf(".", slicePoint);

        if (breakIndex !== -1 && breakIndex > maxLength * 0.5) {
          slicePoint = breakIndex + 1; // Include the period in the current chunk
        } else {
          // Fallback: Find a space near the end to break cleanly between words.
          let lastSpace = tempSlice.lastIndexOf(" ");
          if (lastSpace !== -1) {
            slicePoint = lastSpace;
          } else {
            slicePoint = maxLength;
          }
        }

        chunks.push(remainingText.substring(0, slicePoint).trim());
        remainingText = remainingText.substring(slicePoint).trim();
      }
    }
    return chunks;
  }

  // Function 2: Highlights PM enhancements within a CLEAN chunk
  function highlightEnhancements(text, typeClass) {
    // Regex for PM pattern: (\+\w*?\s*PM\s*(?:\([^)]+\))?:)
    const regex = /(\+\w*?\s*PM\s*(?:\([^)]+\))?:)/gi;

    const color = TYPE_COLORS[typeClass] || "#0e0e0e";
    const styledSpanStart = `<br><span style="color: ${color}; font-weight: bold; font-family: 'Alegreya Sans SC', sans-serif; white-space: nowrap;">`;
    const styledSpanEnd = `</span>`;

    // Inject the styled span using the regex, ensuring a <br> precedes it.
    // We use a simple replace here and handle the leading break/spacing in the HTML output.
    let highlighted = text.replace(regex, (match, offset, string) => {
      // We inject <br> and the span
      return `${styledSpanStart}${match.trim()}${styledSpanEnd} `;
    });

    // Remove any leading <br> tags if the first sentence contained an enhancement
    if (highlighted.startsWith("<br>")) {
      highlighted = highlighted.substring(4).trim();
    }

    return highlighted;
  }

  // 4. Define all repeating sections
  const sections = [
    {
      groups: ["repeating_abilities", "repeating_powers"],
      nameAttr: "attr_nameability",
      descAttr: "attr_abilitydescription",
      typeClass: "ability",
    },
    {
      groups: ["repeating_menaceabilities", "repeating_menacespells"],
      nameAttr: 'span[name^="attr_menacename"]',
      descAttr:
        'span[name^="attr_menaceabilitydescription"], span[name^="attr_menaceaspellsdescription"]',
      typeClass: "menace",
      customTitle: "ABILITIES",
    },
    {
      groups: [
        "repeating_spells1",
        "repeating_spells2",
        "repeating_spells3",
        "repeating_spells4",
        "repeating_spells5",
      ],
      nameAttr: 'input[name^="attr_namespell"]',
      descAttr: 'textarea[name^="attr_spelldescription"]',
      typeClass: "magic",
    },
    {
      groups: ["repeating_equipment"],
      nameAttr: 'input[name^="attr_equipname"]',
      descAttr: 'input[name^="attr_equipslot"]',
      typeClass: "equipment",
    },
  ];

  // 5. Execution Loop
  sections.forEach((section) => {
    section.groups.forEach((groupName) => {
      const selector = `.repcontainer[data-groupname="${groupName}"] .repitem, .repcontainer[data-groupname="${groupName}"] .repiteitem`;
      const abilityFields = document.querySelectorAll(selector);

      abilityFields.forEach((item) => {
        let name,
          description,
          baseCardFooter,
          cardTitle,
          typeClass = section.typeClass;

        const nameElement = item.querySelector(section.nameAttr);
        const descElement = item.querySelector(section.descAttr);
        if (nameElement) {
          name = (nameElement.value || nameElement.textContent).trim();
        } else {
          name = "Unnamed Item";
        }
        if (descElement) {
          description = descElement.value
            ? descElement.value.trim()
            : descElement.textContent.trim();
        } else {
          description = "No description provided.";
        }

        baseCardFooter = "";
        cardTitle = section.customTitle
          ? section.customTitle
          : typeClass.toUpperCase();

        if (groupName === "repeating_equipment") {
          const quantityElement = item.querySelector(
            'input[name^="attr_equipquantity"]',
          );
          const slotElement = item.querySelector(
            'input[name^="attr_equipslot"]',
          );
          const quantity = quantityElement ? quantityElement.value.trim() : "1";
          const slots = slotElement ? slotElement.value.trim() : "0";
          description = `Quantity: ${quantity}.`;
          baseCardFooter = `Slots: ${slots}`;
          cardTitle = "EQUIPMENT";
          if (name === "" && slots === "0") return;
        } else if (groupName.startsWith("repeating_spells")) {
          const circle = groupName.match(/\d/)[0];
          cardTitle = `${circle}º CIRCLE MAGIC`;
        }

        if (
          name === "" ||
          name === "Unnamed Ability" ||
          name === "Unnamed Menace Ability" ||
          name === "Unnamed Item"
        ) {
          if (description === "" || description === "No description provided.")
            return;
        }

        // --- Split Execution (1. Split first) ---
        const descriptionChunks = splitDescriptionIntoChunks(
          description,
          MAX_CHARS_PER_CARD,
        );
        const totalChunks = descriptionChunks.length;

        descriptionChunks.forEach((chunk, index) => {
          // --- Highlight Execution (2. Highlight each chunk independently) ---
          const chunkHtml = highlightEnhancements(chunk, typeClass);

          const pageNumbering =
            totalChunks > 1 ? `${index + 1} of ${totalChunks}` : "";
          const namePart = characterName;
          const pagePart = pageNumbering ? ` (${pageNumbering})` : "";
          const infoPart = baseCardFooter ? ` | ${baseCardFooter}` : "";

          const finalCardFooter = `<span class="footer-left">${namePart}</span><span class="footer-right">${infoPart}${pagePart}</span>`;

          // --- HTML Generation ---
          const cardHTML = `
                        <div class="ability-card ${typeClass}">
                            <h4 class="card-name">${name}</h4>
                            <div class="card-type-bar">${cardTitle}</div>
                            <p class="card-text">${chunkHtml}</p>
                            <div class="card-footer">${finalCardFooter}</div>
                        </div>
                    `;

          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = cardHTML.trim();
          window.newCardsContainer.appendChild(tempDiv.firstChild);
          totalCards++;
        });
      });
    });
  });

  if (totalCards === 0) {
    window.newCardsContainer.innerHTML =
      '<h3>Generated Character Cards (MTG Size):</h3><p style="color:red; font-weight:bold;">No ability cards were generated. Check the sheet for data.</p>';
  } else {
    console.log(`SUCCESS! Generated ${totalCards} total cards.`);
  }
})();

// --- CSS and PRINT CSS (Ensuring they are present and correct) ---
// This is critical to ensure layout and color work.

if (document.getElementById("mtg-card-styles")) {
  document.getElementById("mtg-card-styles").remove();
}
const style = document.createElement("style");
style.id = "mtg-card-styles";
style.textContent = `
.ability-card {
  width: 290px;
  height: 406px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 8px solid #333;
  border-radius: 16px;
  padding: 10px;
  margin: 0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
  background-color: #fcfcfc;
  font-family: Arial, sans-serif;
  overflow: hidden;
}
/* --- ITEM CARD HALF SIZE OVERRIDE (Mini-USA Standard) --- */
.ability-card.equipment {
  width: 202px;
  height: 282px;
  border-width: 8px;
  border-radius: 16px;
  padding: 5px;
  /* Keep original font sizes */
}

/* --- Text Styling --- */
.card-name {
  display: -webkit-box !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  max-height: 3em !important;
  line-height: 1.5em !important;
  font-family: "Contrail One", sans-serif;
  font-size: 1.5em;
  margin: 0 0 5px 0;
  text-align: center;
  color: #0e0e0e;
}
.ability-card.equipment .card-name {
  font-size: 0.95em;
  margin-bottom: 2px;
  max-height: 1.8em;
  line-height: 0.9em;
}

.card-type-bar {
  color: white;
  font-weight: bold;
  padding: 4px 5px;
  margin-bottom: 8px;
  border-radius: 5px;
  text-align: center;
  font-size: 0.85em;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-text {
  font-size: 0.9em;
  line-height: 1.25;
  text-align: left;
  flex-grow: 1;
  white-space: pre-wrap !important;
  font-weight: normal;
}

/* --- DUAL-SIDE FOOTER STYLE --- */
.card-footer {
  margin-top: 5px;
  padding-top: 5px;
  border-top: 1px solid #ccc;
  font-size: 0.8em;
  font-style: italic;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-footer .footer-left {
  font-weight: bold;
  text-align: left;
  white-space: nowrap;
}
.card-footer .footer-right {
  text-align: right;
  white-space: nowrap;
}

/* --- Type-Based Colors --- */
.ability .card-type-bar {
  background-color: #da0f20;
}
.menace .card-type-bar {
  background-color: #ab893a;
}
.magic .card-type-bar {
  background-color: #007bff;
}
.equipment .card-type-bar {
  background-color: #535353;
}`;
document.head.appendChild(style);

// --- PRINT CSS (Ensuring it's present and correct) ---
if (document.getElementById("print-styles-final")) {
  document.getElementById("print-styles-final").remove();
}
const printStyle = document.createElement("style");
printStyle.id = "print-styles-final";
printStyle.textContent = `@media print {
  /* 1. Global Reset: Hide UNWANTED UI elements (same as before) */
  .nav-tabs,
  #edit-button,
  #background,
  #macrobar,
  .draggableresult,
  lottie-player,
  .repcontrol,
  .sheet-navegacao,
  .sheet-equipment-container,
  .sheet-content-grid,
  .sheet-powers-and-abilities {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
  }

  /* 2. CORE Structural Containers: Enforce full flow visibility */
  #dialog-window,
  .dialog,
  #tab-content,
  .charactersheet {
    position: static !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    box-shadow: none !important;
    visibility: visible !important;
    display: block !important;
    overflow: visible !important;
  }

  .sheetform,
  .sheetform * {
    visibility: inherit !important;
    overflow: visible !important;
    background-color: transparent !important;
    box-shadow: none !important;
  }

  #card-output-container-unified {
    visibility: visible !important;
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: flex-start !important;
    align-content: flex-start !important;

    width: 100% !important;
    margin: 0 auto !important;
    padding: 10px !important;

    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    background-color: white !important;
    position: static !important;
    gap: 0px !important;
    page-break-after: auto !important;
  }

  /* 3. Card Styling & Page Break Avoidance */
  .ability-card {
    width: 290px !important;
    height: 406px !important;
    page-break-inside: avoid !important;
    box-shadow: none !important;
    background-color: white !important;
    color: black !important;
    margin: 0px !important;
    display: flex !important;
    flex-direction: column !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .ability-card.equipment {
  width: 202px !important;
  height: 282px !important;
    padding: 5px !important;
    margin: 0 !important;
  }

  /* Global card-name print settings */
  .card-name {
    display: -webkit-box !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
    max-height: 3em !important;
    line-height: 1.5em !important;
  }

  /* Item card specific print font size settings */
  .ability-card.equipment .card-name {
    font-size: 0.9em !important;
    margin-bottom: 2px !important;
    max-height: 1.8em !important;
    line-height: 0.9em !important;
  }
  .card-type-bar {
    color: white !important;
    border: none !important;
    box-shadow: none !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .ability .card-type-bar {
    background-color: #da0f20 !important;
  }
  .menace .card-type-bar {
    background-color: #ab893a !important;
  }
  .magic .card-type-bar {
    background-color: #007bff !important;
  }
  .equipment .card-type-bar {
    background-color: #535353 !important;
  }

  /* PM Highlight Colors */
  .ability-card .card-text span {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .ability .card-text span.pm-highlight,
  .ability .card-text span {
    color: #da0f20 !important;
  }
  .menace .card-text span.pm-highlight,
  .menace .card-text span {
    color: #ab893a !important;
  }
  .magic .card-text span.pm-highlight,
  .magic .card-text span {
    color: #007bff !important;
  }
  .equipment .card-text span.pm-highlight,
  .equipment .card-text span {
    color: #535353 !important;
  }

  .card-text {
    overflow: visible !important;
    max-height: none !important;
    white-space: pre-wrap !important;
  }

  .card-footer .footer-left,
  .card-footer .footer-right {
    white-space: nowrap !important;
  }

  .sheet-main,
  .sheet-left-container,
  .sheet-right-container {
    page-break-inside: avoid;
  }
}`;
document.head.appendChild(printStyle);
