import { useEffect, useRef } from 'react';
import { JSONEditor, JSONEditorPropsOptional } from 'vanilla-jsoneditor';

export default function JSONEditorComponent(props: JSONEditorPropsOptional) {
    const refContainer = useRef<HTMLDivElement | null>(null);
    const refEditor = useRef<JSONEditor | null>(null);

    useEffect(() => {
        // create editor
        if (!refContainer.current) return;
        refEditor.current = new JSONEditor({
            target: refContainer.current,
            props: {},
        });

        // eslint-disable-next-line consistent-return
        return () => {
            // destroy editor
            if (refEditor.current) {
                refEditor.current.destroy();
                refEditor.current = null;
            }
        };
    }, []);

    // update props
    useEffect(() => {
        if (refEditor.current) {
            refEditor.current.updateProps(props);
        }
    }, [props]);

    return <div className="vanilla-jsoneditor-react" ref={refContainer} />;
}
