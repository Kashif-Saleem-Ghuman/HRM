import Vue from "vue";

export default ({ app }) => {
  Vue.filter("truncate", function (text, length, suffix) {
    if (!text) return '';
    if (text.length <= length) return text;

    let truncated = '';
    let charCount = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      charCount += (encodeURIComponent(char).length > 1) ? 2 : 1; // Considering multi-byte characters
      if (charCount > length) break;
      truncated += char;
    }

    return truncated + suffix;
  });
};
