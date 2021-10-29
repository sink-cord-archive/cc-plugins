export default ({ persist }) => (
    <div>
        <div>keycode: {persist.store.keyBind.code}</div>
        <div>
            <input
                type="checkbox"
                onClick={() => false}
                checked={persist.store.keyBind.shift}
            />

            <span>shift</span>
        </div>
        <div>
            <input
                type="checkbox"
                onClick={() => false}
                checked={persist.store.keyBind.ctrlMeta}
            />

            <span>ctrl / meta / ⌘</span>
        </div>
    </div>
);
