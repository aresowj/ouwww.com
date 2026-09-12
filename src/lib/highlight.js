import hljs from 'highlight.js/lib/common';

const decode = (value) => value.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'");

export function highlightArticle(html) {
  return html.replace(/<pre([^>]*)><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g, (_, preAttrs, codeAttrs, source) => {
    const highlighted = hljs.highlightAuto(decode(source)).value;
    return `<pre${preAttrs}><code${codeAttrs} class="hljs">${highlighted}</code></pre>`;
  });
}
