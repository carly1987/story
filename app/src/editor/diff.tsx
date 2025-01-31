import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useEffect, useMemo, useRef } from "react";
import { MonacoDiffEditorProps } from "./types";
import { noop, processSize } from "./utils";

function MonacoDiffEditor({
  width = '200%',
  height = '200%',
  value,
  defaultValue,
  language,
  theme,
  options,
  overrideServices,
  editorWillMount,
  editorDidMount,
  editorWillUnmount,
  onChange,
  className,
  original,
  originalUri,
  modifiedUri,
}: MonacoDiffEditorProps) {
  const containerElement = useRef<HTMLDivElement | null>(null);

  const editor = useRef<monaco.editor.IStandaloneDiffEditor | null>(null);

  const _subscription = useRef<monaco.IDisposable | null>(null);

  const __prevent_trigger_change_event = useRef<boolean | null>(null);

  const fixedWidth = processSize(width);

  const fixedHeight = processSize(height);

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
// @ts-ignore
    const { modified } = editor.current?.getModel();
    _subscription.current = modified.onDidChangeContent((event: any) => {
      if (!__prevent_trigger_change_event.current) {
        onChange?.(modified.getValue(), event);
      }
    });
  };

  const handleEditorWillUnmount = () => {
    // @ts-ignore
    editorWillUnmount(editor.current, monaco);
  };

  const initModels = () => {
    const finalValue = value != null ? value : defaultValue;
    const originalModelUri = originalUri?.(monaco);
    const modifiedModelUri = modifiedUri?.(monaco);
    let originalModel =
      originalModelUri && monaco.editor.getModel(originalModelUri);
    let modifiedModel =
      modifiedModelUri && monaco.editor.getModel(modifiedModelUri);

    // Cannot create two models with the same URI,
    // if model with the given URI is already created, just update it.
    if (originalModel) {
      // @ts-ignore
      originalModel.setValue(original);
      // @ts-ignore
      monaco.editor.setModelLanguage(originalModel, language);
    } else {
      // @ts-ignore
      originalModel = monaco.editor.createModel(
        // @ts-ignore
        finalValue,
        language,
        originalModelUri,
      );
    }
    if (modifiedModel) {
      // @ts-ignore
      originalModel.setValue(finalValue);
      // @ts-ignore
      monaco.editor.setModelLanguage(modifiedModel, language);
    } else {
      modifiedModel = monaco.editor.createModel(
        // @ts-ignore
        finalValue,
        language,
        modifiedModelUri,
      );
    }
// @ts-ignore
    editor.current.setModel({
      original: originalModel,
      modified: modifiedModel,
    });
  };

  useEffect(
    () => {
      if (containerElement.current) {
        // Before initializing monaco editor
        handleEditorWillMount();
        editor.current = monaco.editor.createDiffEditor(
          containerElement.current,
          {
            ...(className ? { extraEditorClassName: className } : {}),
            ...options,
            ...(theme ? { theme } : {}),
          },
          overrideServices,
        );
        // After initializing monaco editor
        initModels();
        handleEditorDidMount();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (editor.current) {
      editor.current.updateOptions({
        ...(className ? { extraEditorClassName: className } : {}),
        ...options,
      });
    }
  }, [className, options]);

  useEffect(() => {
    if (editor.current) {
      editor.current.layout();
    }
  }, [width, height]);

  useEffect(() => {
    if (editor.current) {
      // @ts-ignore
      const { original: originalEditor, modified } = editor.current.getModel();
      // @ts-ignore
      monaco.editor.setModelLanguage(originalEditor, language);
      // @ts-ignore
      monaco.editor.setModelLanguage(modified, language);
    }
  }, [language]);

  useEffect(() => {
    if (editor.current) {
      // @ts-ignore
      const { modified } = editor.current.getModel();
      __prevent_trigger_change_event.current = true;
      // modifiedEditor is not in the public API for diff editors
      editor.current.getModifiedEditor().pushUndoStop();
      // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
      
      modified.pushEditOperations(
        [],
        [
          {
            range: modified.getFullModelRange(),
            text: value,
          },
        ],
      );
      // modifiedEditor is not in the public API for diff editors
      editor.current.getModifiedEditor().pushUndoStop();
      __prevent_trigger_change_event.current = false;
    }
  }, [value]);

  useEffect(() => {
    // @ts-ignore
    monaco.editor.setTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (editor.current) {
      // @ts-ignore
      const { original: originalEditor } = editor.current.getModel();
      if (original !== originalEditor.getValue()) {
        originalEditor.setValue(original);
      }
    }
  }, [original]);

  useEffect(
    () => () => {
      if (editor.current) {
        handleEditorWillUnmount();
        editor.current.dispose();
        // @ts-ignore
        const { original: originalEditor, modified } =
          editor.current.getModel();
        if (originalEditor) {
          originalEditor.dispose();
        }
        if (modified) {
          modified.dispose();
        }
      }
      if (_subscription.current) {
        _subscription.current.dispose();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div
      ref={containerElement}
      style={style}
      className="react-monaco-editor-container"
    />
  );
}

MonacoDiffEditor.defaultProps = {
  width: "100%",
  height: "100%",
  original: null,
  value: null,
  defaultValue: "",
  language: "javascript",
  theme: null,
  options: {},
  overrideServices: {},
  editorWillMount: noop,
  editorDidMount: noop,
  editorWillUnmount: noop,
  onChange: noop,
  className: null,
};

MonacoDiffEditor.displayName = "MonacoDiffEditor";

export default MonacoDiffEditor;
