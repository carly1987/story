import * as React from 'react';
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export default function App() {
  React.useEffect(() => {
    monaco.languages.register({ id: "storyLanguage" });

monaco.languages.registerHoverProvider("storyLanguage", {
	provideHover: function (model, position) {
    console.log(position)
		return {
				range: new monaco.Range(
					1,
					1,
					model.getLineCount(),
					model.getLineMaxColumn(model.getLineCount())
				),
				contents: [
					{ value: "**SOURCE**" },
					{
						value:
							"```html\n" +
							"aaa"+
							"\n```",
					},
				],
			};
	},
});

const editor = monaco.editor.create(document.getElementById("container"), {
	value: "\n\nHover over this text",
	language: "storyLanguage",
});
const languages = monaco.languages.getLanguages();
      console.log('languages', languages)
console.log('model', editor.getModel()?.getLanguageId())
  }, [])
  return (
    <div>
      <div id="container" style={{height: '1000px'}}></div>
    </div>
  )
}