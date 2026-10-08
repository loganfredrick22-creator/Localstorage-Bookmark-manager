function getBookmarks() {
  const storedData = localStorage.getItem("bookmarks");
  if (!storedData) {
    return [];
  }
  try {
    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) {
      return [];
    }
    const isValid = parsedData.every(
      (item) =>
        item &&
        typeof item === "object" &&
        "name" in item &&
        "category" in item &&
        "url" in item
    );
    return isValid ? parsedData : [];
  } catch (error) {
    return [];
  }
}

function displayOrCloseForm() {
  document.querySelector("#main-section").classList.toggle("hidden");
  document.querySelector("#form-section").classList.toggle("hidden");
}

function displayOrHideCategory() {
  document.querySelector("#main-section").classList.toggle("hidden");
  document.querySelector("#bookmark-list-section").classList.toggle("hidden");
}

function renderCategoryList(selectedCategory) {
  const allBookmarks = getBookmarks();
  const filteredBookmarks = allBookmarks.filter(
    (bookmark) => bookmark.category === selectedCategory
  );

  const container = document.querySelector("#category-list");
  container.innerHTML = "";

  if (filteredBookmarks.length === 0) {
    container.innerHTML = "<p>No Bookmarks Found</p>";
  } else {
    filteredBookmarks.forEach((bookmark) => {
      const radioButton = document.createElement("input");
      radioButton.type = "radio";
      radioButton.id = bookmark.name;
      radioButton.value = bookmark.name;
      radioButton.name = "bookmark-item";

      const label = document.createElement("label");
      label.setAttribute("for", bookmark.name);

      const link = document.createElement("a");
      link.href = bookmark.url;
      link.textContent = bookmark.name;

      label.appendChild(link);
      container.appendChild(radioButton);
      container.appendChild(label);
    });
  }
}

// Event Listeners

document.querySelector("#add-bookmark-button").onclick = function () {
  const selectedCategory = document.querySelector("#category-dropdown").value;
  document.querySelectorAll(".category-name").forEach((element) => {
    element.textContent = selectedCategory;
  });
  displayOrCloseForm();
};

document.querySelector("#close-form-button").onclick = function () {
  displayOrCloseForm();
};

document.querySelector("#add-bookmark-button-form").onclick = function () {
  const nameInput = document.querySelector("#name");
  const urlInput = document.querySelector("#url");
  const categoryValue = document.querySelector("#category-dropdown").value;

  const newBookmark = {
    name: nameInput.value,
    category: categoryValue,
    url: urlInput.value,
  };

  const currentBookmarks = getBookmarks();
  currentBookmarks.push(newBookmark);

  localStorage.setItem("bookmarks", JSON.stringify(currentBookmarks));

  nameInput.value = "";
  urlInput.value = "";

  displayOrCloseForm();
};

document.querySelector("#view-category-button").onclick = function () {
  const selectedCategory = document.querySelector("#category-dropdown").value;
  document.querySelectorAll(".category-name").forEach((element) => {
    element.textContent = selectedCategory;
  });
  renderCategoryList(selectedCategory);
  displayOrHideCategory();
};

document.querySelector("#close-list-button").onclick = function () {
  displayOrHideCategory();
};

document.querySelector("#delete-bookmark-button").onclick = function () {
  const checkedRadio = document.querySelector('#category-list input[type="radio"]:checked');

  if (checkedRadio) {
    const selectedName = checkedRadio.value;
    const selectedCategory = document.querySelector("#category-dropdown").value;
    const currentBookmarks = getBookmarks();

    const updatedBookmarks = currentBookmarks.filter(
      (item) => !(item.name === selectedName && item.category === selectedCategory)
    );

    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    renderCategoryList(selectedCategory);
  }
};
