import {EMOJIIS} from "../const.js";

const createCommentMarkup = (comment) => {
  const {text, autor, data, emoji} = comment;

  return (`
  <li class="film-details__comment">
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
</li>
  `);
};

const createEmojeMarkup = (emoji) => {
  return (`
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
        <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
        </label>
  `);
};


const cteateCommentTemplate = (comments) => {
  const commentsMarkup = comments.map(createCommentMarkup).join(`\n`);
  const emojesMarkup = EMOJIIS.map(createEmojeMarkup).join(`\n`);
  const count = comments.length;

  return (`

  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${count}</span></h3>
    <ul class="film-details__comments-list">
    ${commentsMarkup}
    </ul>
    <div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label"></div>
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>
      <div class="film-details__emoji-list">
      ${emojesMarkup}
      </div>
    </div>
  </section>

`);
};
export {cteateCommentTemplate};
