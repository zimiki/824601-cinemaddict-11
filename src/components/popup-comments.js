import {EMOJIIS} from "../const.js";
import AbstractSmartComponent from "./abstract-smart-component.js";

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

const createEmojeMarkup = (emoji, film) => {
  let isChecked = false;
  if (emoji === film.userComment.emoji) {
    isChecked = true;
  }
  const checkEmojiRadioButton = isChecked ? `checked` : ``;

  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${checkEmojiRadioButton}>
        <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji-${emoji}">
        </label>`
  );
};

const cteateCommentTemplate = (film) => {
  const filmComments = film.comments;
  const commentsMarkup = filmComments.map(createCommentMarkup).join(`\n`);
  const emojesMarkup = EMOJIIS.map((emoji)=>{
    return createEmojeMarkup(emoji, film);
  }).join(`\n`);
  const count = film.comments.length;

  const userCommentEmoji = film.userComment.emoji;
  const showingUserCommentEmoji = userCommentEmoji ? `<img src="./images/emoji/${userCommentEmoji}.png" width="55" height="55" alt="emoji-${userCommentEmoji}">` : ``;

  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${count}</span></h3>
      <ul class="film-details__comments-list">
      ${commentsMarkup}
      </ul>
      <div class="film-details__new-comment">

        <div for="add-emoji" class="film-details__add-emoji-label">${showingUserCommentEmoji}</div>

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
    this._emojiClickHandler = null;
  }
  getTemplate() {
    return cteateCommentTemplate(this._film);
  }

  setEmojiClickHandler(handler) {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }
      const userCommentEmoji = evt.target.value;
      handler(userCommentEmoji);
      // Незнаю что тут делать  this._emojiClickHandler
      // this.rerender();
    });
  }

  recoveryListeners() {
    this.setEmojiClickHandler(this._emojiClickHandler);
  }
}
