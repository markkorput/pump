import { useCallback, useMemo, useState, FormEvent } from "react";
import { formatTime } from "@lib/format";
import { RepsTimer, type Rep } from "./useRepsTimer";

interface UseNameModalProps {
    shown?: boolean;
    onSubmit?: (name: string) => void
}

function useNameModal({ shown: initialShown = false, onSubmit }: UseNameModalProps = {}) {
    const [name, setName] = useState<string>("");
    const [shown, setShown] = useState<boolean>(initialShown);

    const show = useCallback((initialName?: string) => {
        if(initialName) setName(initialName);
        setShown(true);
    }, []);

    const hide = useCallback(() => setShown(false), []);

    const submit = useCallback(() => {
        onSubmit?.(name);
        hide();
    }, [name, onSubmit, hide]);

    const modal = useMemo(() => {
        if (!shown) return null;
        return (<div style={{position:"fixed", top:0, left:0, width:"100vw", height:"100vh", background:"#000000CC"}} onClick={() => setShown(false)}>
            <div style={{position:"absolute", left:"15%", bottom:"40%", width:"70%", margin:"auto", minWidth:400, fontSize:"30pt"}}>
                <input defaultValue={name} style={{color:"black", textAlign:"right", fontSize:"30pt", padding:20}} onClick={(e) => e.stopPropagation()} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
                <button onClick={submit} style={{marginLeft:20, padding:20}}>Save</button>
            </div>
        </div>);
    }, [shown, name, submit]);

    return {
        show,
        hide,
        shown,
        modal,
    }
}

export type RepsProps = Pick<RepsTimer, "reps" | "remove" | "updateRep">;


export function Reps({ reps, remove, updateRep }: RepsProps) {
    const [formRep, setFormRep] = useState<Rep>();
    const updateName = useCallback((name: string) => formRep && updateRep(formRep, { name }), [updateRep, formRep]);
    const { show, modal } = useNameModal({
        onSubmit: updateName
    });

    const editRep = useCallback((rep: Rep) => {
        setFormRep(rep);
        show(rep.name);
    }, [show]);

    const removeRep = useCallback((rep: Rep) => remove(rep), [remove]);
    

    const lines = useMemo(() => [...reps].reverse().map((rep, idx) => {
        const no = reps.length - idx;
        return (
            <div key={`rep-${no}`}>
                <a onClick={() => editRep(rep)}>{rep.name} - {formatTime(rep.time)}s</a>
                <a onClick={() => removeRep(rep)} style={{marginLeft:10}}> [remove]</a>
            </div>);
    }), [reps, editRep, removeRep]);

    return (<div style={{width:"75%", minWidth:200, textAlign:"right"}}>
        {lines}
        {modal}
    </div>);
}
