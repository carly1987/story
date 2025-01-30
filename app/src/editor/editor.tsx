import * as monaco from "monaco-editor";
import { forwardRef, useState } from "react";
import { useEffect, useMemo, useRef, useImperativeHandle } from "react";
import { MonacoEditorProps } from "./types";
import { noop, processSize } from "./utils";

const MonacoEditor = forwardRef(({
  width = '100%',
  height = '100vh',
  value,
  defaultValue,
  options,
  overrideServices,
  editorWillMount = noop,
  editorDidMount = noop,
  editorWillUnmount = noop,
  onChange = noop,
  onCompositionStart = noop,
  onCompositionEnd = noop,
  onFocus = noop,
  onBlur = noop,
  onAction = null,
  className,
  uri,
}: MonacoEditorProps, ref) => {
  // @ts-ignore
  const [decorationIds, setDecorationIds] = useState([]);
  const containerElement = useRef<HTMLDivElement | null>(null);

  const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const _subscription_onChange = useRef<monaco.IDisposable | null>(null);
  const _subscription_onCompositionStart = useRef<monaco.IDisposable | null>(null);
  const _subscription_onCompositionEnd = useRef<monaco.IDisposable | null>(null);
  const _subscription_onFocus = useRef<monaco.IDisposable | null>(null);
  const _subscription_onBlur = useRef<monaco.IDisposable | null>(null);

  const __prevent_trigger_change_event = useRef<boolean | null>(null);

  const fixedWidth = processSize(width);

  const fixedHeight = processSize(height);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const onCompositionStartRef = useRef(onCompositionStart);
  onCompositionStartRef.current = onCompositionStart;

  const onCompositionEndRef = useRef(onCompositionEnd);
  onCompositionEndRef.current = onCompositionEnd;

  const onFocusRef = useRef(onFocus);
  onFocusRef.current = onFocus;

  const onBlurRef = useRef(onBlur);
  onBlurRef.current = onBlur;

  const style = useMemo(
    () => ({
      width: fixedWidth,
      height: fixedHeight,
    }),
    [fixedWidth, fixedHeight],
  );

  const handleEditorWillMount = () => {
    const finalOptions = editorWillMount?.(monaco);
    return finalOptions || {};
  };

  const handleEditorDidMount = () => {
    // @ts-ignore
    editorDidMount?.(editor.current, monaco);
    // editor.current?.focus();
    // editor.current?.trigger('','actions.find');
    // @ts-ignore
    _subscription_onChange.current = editor.current?.onDidChangeModelContent((event) => {
      if (!__prevent_trigger_change_event.current) {
        // @ts-ignore
        onChangeRef.current?.(editor.current?.getValue(), event);
      }
    });
    // @ts-ignore
    _subscription_onCompositionStart.current = editor.current?.onDidCompositionStart(() => {
      onCompositionStartRef.current?.();
    });
    // @ts-ignore
    _subscription_onCompositionEnd.current = editor.current?.onDidCompositionEnd(() => {
      onCompositionEndRef.current?.();
    });
    // @ts-ignore
    _subscription_onFocus.current = editor.current?.onDidFocusEditorText(() => {
      onFocusRef.current?.();
    });
    // @ts-ignore
    _subscription_onBlur.current = editor.current?.onDidBlurEditorText(() => {
      onBlurRef.current?.();
    });

    editor.current?.addAction({
      id: "edit-role",
      label: "编辑角色",
      contextMenuGroupId: "navigation",
      contextMenuOrder: 1.5,
      run: function () {
        const text = editor.current?.getModel()?.getValueInRange(editor.current?.getSelection() as any);
        onAction?.editRole(text);
      },
    });

  };

  const handleEditorWillUnmount = () => {
    // @ts-ignore
    editorWillUnmount?.(editor.current, monaco);
  };

  const initMonaco = () => {
    const finalValue = value !== null ? value : defaultValue;

    if (containerElement.current) {
      // Before initializing monaco editor
      const finalOptions = { ...options, ...handleEditorWillMount() };
      const modelUri = uri?.(monaco);
      let model = modelUri && monaco.editor.getModel(modelUri);
      monaco.languages.register({ id: 'story' });
      if (model) {
        // @ts-ignore
        model.setValue(finalValue);
        // @ts-ignore
      } else {
        // @ts-ignore
        model = monaco.editor.createModel(finalValue, 'story', modelUri);
      }

      monaco.languages.registerHoverProvider("story", {
        provideHover: function (model, position) {
          const range:any  = monaco.editor.getEditors()[0].getSelection();
          const word = model.getValueInRange(range);
          if (word && position.lineNumber === range.positionLineNumber && position.column >= range.startColumn && position.column <= range.endColumn) {
            return {
              range: range,
              contents: [
                { value: "**SOURCE**" },
                {
                  value:
                    "```html\n" +
                    word +
                    "\n```",
                },
              ],
            };
          }

        },
      });
      // monaco.languages.setMonarchTokensProvider('story', {
      //   tokenizer: {
      //     root: [
      //       ['万家佛', 'keyword'],
      //     ],
      //   }
      // });

      // monaco.languages.registerCompletionItemProvider('storyLanguage', {        
      //   provideCompletionItems: () => {          return { suggestions: vCompletion } }
      // });


      // monaco.editor.defineTheme("myCoolTheme", {
      //   base: "vs",
      //   inherit: true,
      //   rules: [
      //     { token: "keyword", foreground: "ff0000" },
      //   ],
      //   colors: {
      //     "editor.foreground": "#000000",
      //   },
      // });



      editor.current = monaco.editor.create(
        containerElement.current,
        {
          model,
          contextmenu: true,
          ...(className ? { extraEditorClassName: className } : {}),
          ...finalOptions,
          language: "story",
          // theme: "myCoolTheme",
        },
        overrideServices,
      );

      handleEditorDidMount();
    }
  };

  function findString(keyword: string) {
    // 代码编辑器锁定到第几行
    const model = editor.current?.getModel();
    const matches = model?.findMatches(keyword, true, false, false, null, true) || [];
    // 创建装饰器数组
    const decorations = matches.map(match => ({
      range: match.range,
      options: {
        className: 'findMatch', // 你需要在 CSS 中定义这个类来设置高亮样式
        inlineClassName: 'findMatch' // 也可以使用 inlineClassName 来设置内联样式
      }
    }));
    // @ts-ignore
    setDecorationIds((decorationIds) => editor.current?.deltaDecorations(decorationIds, decorations));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(initMonaco, []);

  useEffect(() => {
    if (editor.current) {
      if (value === editor.current.getValue()) {
        return;
      }

      const model = editor.current.getModel();
      __prevent_trigger_change_event.current = true;
      editor.current.pushUndoStop();
      // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
      // @ts-ignore
      model.pushEditOperations(
        [],
        [
          {
            // @ts-ignore
            range: model.getFullModelRange(),
            // @ts-ignore
            text: value,
          },
        ],
        undefined,
      );
      editor.current.pushUndoStop();
      __prevent_trigger_change_event.current = false;
    }
  }, [value]);

  useEffect(() => {
    if (editor.current) {
      // Don't pass in the model on update because monaco crashes if we pass the model
      // a second time. See https://github.com/microsoft/monaco-editor/issues/2027
      // @ts-ignore
      const { model: _model, ...optionsWithoutModel } = options;
      editor.current.updateOptions({
        ...(className ? { extraEditorClassName: className } : {}),
        ...optionsWithoutModel,
      });
    }
  }, [className, options]);

  useEffect(() => {
    if (editor.current) {
      editor.current.layout();
    }
  }, [width, height]);

  useEffect(
    () => () => {
      if (editor.current) {
        handleEditorWillUnmount();
        editor.current.dispose();
      }
      if (_subscription_onChange.current) {
        _subscription_onChange.current.dispose();
      }
      if (_subscription_onCompositionStart.current) {
        _subscription_onCompositionStart.current.dispose();
      }
      if (_subscription_onCompositionEnd.current) {
        _subscription_onCompositionEnd.current.dispose();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return editor.current?.getValue()
      },
      findString
    };
  }, []);

  return (
    <div
      ref={containerElement}
      style={style}
      className="react-monaco-editor-container"
    />
  );
});

MonacoEditor.displayName = "MonacoEditor";

export default MonacoEditor;
