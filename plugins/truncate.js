import Vue from "vue";

export default ({ app }) => {
  Vue.filter("truncate", function (text, baseLength, suffix) {
    if (!text) return '';
    
    // Get the window scale (zoom level) from device pixel ratio
    const scale = window.devicePixelRatio || 1;

    // Adjust the length based on the scale
    const adjustedLength = Math.floor(baseLength / scale);
    
    if (text.length <= adjustedLength) return text;

    let truncated = '';
    let charCount = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      charCount += (encodeURIComponent(char).length > 1) ? 2 : 1; // Considering multi-byte characters
      if (charCount > adjustedLength) break;
      truncated += char;
    }

    return truncated + suffix;
  });
};
