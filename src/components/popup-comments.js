import AbstractSmartComponent from "./abstract-smart-component.js";

const EMOJIIS = [`smile`, `sleeping`, `puke`, `angry`];
const createCommentMarkup = (comments) => {
  const {text, autor, data, emoji} = comments;

  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${autor}</span>
        <span class="film-details__comment-day">${data.getFullYear()}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
  );
};

const createEmojeMarkup = (emoji, isChecked) => {
  const checked = isChecked ? `checked` : ``;

  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${checked}>
        <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji-${emoji}">
        </label>`
  );
};

const cteateCommentTemplate = (film, userEmoji = ``) => {
  const selectedEmoji = userEmoji;
  const filmComments = film.comments;
  const commentsMarkup = filmComments.map(createCommentMarkup).join(`\n`);

  const emojesMarkup = EMOJIIS.map((emoji)=>{
    let isChecked = false;
    if (emoji === selectedEmoji) {
      isChecked = true;
    }
    return createEmojeMarkup(emoji, isChecked);
  }).join(`\n`);
  const count = film.comments.length;

  const UserEmojiImage = selectedEmoji ? `<img src="images/emoji/${selectedEmoji}.png" width="55" height="55" alt="emoji-${selectedEmoji}"></img>` : ``;

  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${count}</span></h3>
      <ul class="film-details__comments-list">
      ${commentsMarkup}
      </ul>
      <div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">
          ${UserEmojiImage}
        </div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>
        <div class="film-details__emoji-list">
        ${emojesMarkup}
        </div>
      </div>
    </section>`
  );
};

export default class Comments extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._selectedEmoji = ``;
    this.recoveryListeners();


  }
  getTemplate() {
    return cteateCommentTemplate(this._film, this._selectedEmoji);
  }

  setEmojiClickHandler() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, (evt)=>{
      if (evt.target.tagName !== `INPUT`) {
        return;
      }
      this._selectedEmoji = evt.target.value;
      this.rerender();
    });
  }

  recoveryListeners() {
    this.setEmojiClickHandler();
  }
}
