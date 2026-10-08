# Bookmark Manager

A lightweight, dependency-free bookmark manager built with vanilla JavaScript. Save links under categories, browse them by category, and delete the ones you no longer need. All data is stored in the browser with `localStorage`, so no backend is required.

## Features

- **Add bookmarks** with a name, URL, and category
- **Browse by category** using a dropdown selector
- **Delete bookmarks** from the category view
- **Persistent storage** that survives page reloads and browser restarts
- **Defensive data loading**: corrupted or malformed stored data is ignored instead of crashing the app
- **Zero dependencies**: plain HTML, CSS, and JavaScript

## Getting Started

1. Clone the repository:
```bash
   git clone [your-repo-url]
   cd [your-project-folder]
```
2. Open `index.html` in your browser. No build step or server is needed.

## How It Works

### Data model

Bookmarks are stored as a JSON array under the `bookmarks` key in `localStorage`:

```json
[
  {
    "name": "MDN Web Docs",
    "category": "[category-value]",
    "url": "https://developer.mozilla.org"
  }
]
```

### Usage

| Action | Steps |
| --- | --- |
| **Add a bookmark** | Choose a category, click **Add Bookmark**, fill in the name and URL, then submit the form |
| **View bookmarks** | Choose a category and click **View Category** |
| **Delete a bookmark** | In the category view, select a bookmark with its radio button and click **Delete** |

## Code Overview

| Function | Purpose |
| --- | --- |
| `getBookmarks()` | Reads and validates bookmarks from `localStorage`. Returns `[]` if the data is missing, unparseable, not an array, or if any item lacks `name`, `category`, or `url`. |
| `displayOrCloseForm()` | Toggles between the main view and the add-bookmark form. |
| `displayOrHideCategory()` | Toggles between the main view and the category list view. |
| `renderCategoryList(category)` | Filters bookmarks by category and renders them as radio inputs with linked labels. Shows "No Bookmarks Found" when empty. |

## Required HTML Structure

The script expects these element IDs and classes to exist in your markup:

| Selector | Description |
| --- | --- |
| `#main-section` | Main view container |
| `#form-section` | Add-bookmark form container |
| `#bookmark-list-section` | Category list container |
| `#category-list` | Where bookmarks are rendered |
| `#category-dropdown` | `<select>` of categories |
| `#name`, `#url` | Form inputs for the bookmark name and URL |
| `#add-bookmark-button` | Opens the form |
| `#add-bookmark-button-form` | Submits the new bookmark |
| `#close-form-button` | Closes the form |
| `#view-category-button` | Opens the category view |
| `#close-list-button` | Closes the category view |
| `#delete-bookmark-button` | Deletes the selected bookmark |
| `.category-name` | Elements that display the selected category name |
| `.hidden` (CSS class) | Should apply `display: none` |

## Known Limitations

- **Duplicate names:** the bookmark `name` is used as the radio input `id` and as the delete key, so two bookmarks with the same name in one category can conflict.
- **No input validation:** empty names or malformed URLs are currently saved as entered.
- **Per-browser storage:** data is tied to one browser and device and is lost if site data is cleared.
- **Radio buttons only allow one deletion at a time.**

## Roadmap

- [ ] Validate and normalize URLs before saving
- [ ] Prevent duplicate bookmarks
- [ ] Generate unique IDs for each bookmark
- [ ] Add edit functionality
- [ ] Import/export bookmarks as JSON

## Contributing

Contributions are welcome. Please open an issue to discuss major changes before submitting a pull request.

## License

[MIT](LICENSE) or [your chosen license]
